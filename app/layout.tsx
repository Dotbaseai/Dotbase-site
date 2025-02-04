import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { Providers } from '@/providers/privy-provider';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "dotbase",
  description:
    "The Visual Model Forge. Craft, Combine, and Deploy AI Models with Drag-and-Drop Simplicity.",
  openGraph: {
    type: "website",
    url: "https://dotbase.ai/",
    title: "dotbase",
    description:
      "The Visual Model Forge. Craft, Combine, and Deploy AI Models with Drag-and-Drop Simplicity.",
    images: `https://i.imgur.com/UgGWBt5.png`,
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/icon.png',
        type: 'image/png',
        sizes: '32x32',
      },
    ],
    apple: {
      url: '/apple-icon.png',
      sizes: '180x180',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );}
