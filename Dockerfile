FROM node:18-alpine AS builder
RUN apk add --no-cache python3 py3-pip make g++
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN python3 -m venv /opt/venv && \
    . /opt/venv/bin/activate && \
    pip3 install --no-cache-dir autogen python-dotenv openai
COPY . .
RUN npm run build
RUN ls -la .next/standalone

FROM node:18-alpine AS runner
WORKDIR /app

# Install Python and set up venv
RUN apk add --no-cache python3 py3-pip make g++ && \
    python3 -m venv /opt/venv && \
    . /opt/venv/bin/activate && \
    pip3 install --no-cache-dir autogen python-dotenv openai

# Copy all Next.js build output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/app/api ./app/api
COPY --from=builder /opt/venv /opt/venv

RUN mkdir -p /app/temp && chmod 777 /app/temp

USER node

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV PATH="/opt/venv/bin:/usr/local/bin:${PATH}"
ENV VIRTUAL_ENV=/opt/venv

EXPOSE 3000

CMD ["node", "server.js"]
