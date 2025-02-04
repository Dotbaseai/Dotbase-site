"use client";
import { useRef } from "react";
import { JSX } from "react/jsx-runtime";
import Image from "next/image";
import img1 from "@/public/assets/logo/logo.png"
import { TypingAnimation } from "@/components/ui/animations/typing-animation";
import { AnimatedBeam } from "@/components/ui/animations/animated-beam";
import { motion } from "framer-motion";

interface IAgent {
  icon: JSX.Element;
  color: string;
  title: string;
}

export default function AgentsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);

  const agents: IAgent[] = [
    {
      icon: (
        <svg width="36" height="36" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
        <circle cx="12" cy="18" r="5" fill="none" stroke="#FFFFFF" stroke-width="1.5"/>
        <circle cx="28" cy="10" r="3" fill="none" stroke="#FFFFFF" stroke-width="1.5"/>
        <circle cx="28" cy="26" r="3" fill="none" stroke="#FFFFFF" stroke-width="1.5"/>
        <line x1="16.5" y1="16" x2="25.5" y2="11" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="16.5" y1="20" x2="25.5" y2="25" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="12" cy="18" r="2" fill="#FFFFFF"/>
        </svg>
      ),
      color: "#30A5FF",
      title: "Nexus",
    },
    {
      icon: (
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
          <path d="M11 10c-2 0-3.5 1.5-3.5 3.5 0 1 .5 2 1.2 2.5-1 .5-1.7 1.5-1.7 2.7 0 1.3.8 2.4 2 2.8-.5.4-.8 1-.8 1.7 0 1.2 1 2.3 2.3 2.3.3 0 .6-.1.9-.2.1 1.4 1.2 2.4 2.6 2.4" 
            fill="none" 
            stroke="#FFFFFF" 
            stroke-width="1.5" 
            stroke-linecap="round"
          />
          <path d="M14 28c1.4 0 2.5-1 2.6-2.4.3.1.6.2.9.2 1.3 0 2.3-1 2.3-2.3" 
            fill="none" 
            stroke="#FFFFFF" 
            stroke-width="1.5" 
            stroke-linecap="round"
          />
          
          <path d="M25 10c2 0 3.5 1.5 3.5 3.5 0 1-.5 2-1.2 2.5 1 .5 1.7 1.5 1.7 2.7 0 1.3-.8 2.4-2 2.8.5.4.8 1 .8 1.7 0 1.2-1 2.3-2.3 2.3-.3 0-.6-.1-.9-.2-.1 1.4-1.2 2.4-2.6 2.4" 
            fill="none" 
            stroke="#FFFFFF" 
            stroke-width="1.5" 
            stroke-linecap="round"
          />
          <path d="M22 28c-1.4 0-2.5-1-2.6-2.4-.3.1-.6.2-.9.2-1.3 0-2.3-1-2.3-2.3" 
            fill="none" 
            stroke="#FFFFFF" 
            stroke-width="1.5" 
            stroke-linecap="round"
          />
          
          <path d="M18 8c-1.5 0-2.7 1-3.2 2.3M18 8c1.5 0 2.7 1 3.2 2.3" 
            fill="none" 
            stroke="#FFFFFF" 
            stroke-width="1.5" 
            stroke-linecap="round"
          />
          
          <path d="M13 14c-.5.5-.8 1.2-.8 2M23 14c.5.5.8 1.2.8 2M14 19c-.3.4-.5.9-.5 1.5M22 19c.3.4.5.9.5 1.5" 
            fill="none" 
            stroke="#FFFFFF" 
            stroke-width="1.5" 
            stroke-linecap="round"
          />
        </svg>
      ),
      color: "#30A5FF",
      title: "Lumina",
    },
    {
      icon: (
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
        <circle cx="7" cy="18" r="3" fill="none" stroke="#FFFFFF" stroke-width="1.5"/>
        <circle cx="29" cy="18" r="3" fill="none" stroke="#FFFFFF" stroke-width="1.5"/>
        <path d="M10 18 C 15 18, 15 12, 18 12 C 21 12, 21 18, 26 18" stroke="#FFFFFF" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <path d="M10 18 C 15 18, 15 24, 18 24 C 21 24, 21 18, 26 18" stroke="#FFFFFF" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        </svg>
      ),
      color: "#30A5FF",
      title: "Bridge",
    },
    {
      icon: (
        <svg width="36" height="36" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
          <circle cx="18" cy="12" r="4.5" fill="none" stroke="#FFFFFF" stroke-width="1.5"/>
          <path d="M10.5 25v-1c0-2.5 3-5 7.5-5s7.5 2.5 7.5 5v1" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/>
          
          <circle cx="8" cy="14" r="3.5" fill="none" stroke="#FFFFFF" stroke-width="1.5"/>
          <path d="M2 28v-1c0-2 2.5-4 6-4 1 0 2 .2 2.8.6" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/>
          
          <circle cx="28" cy="14" r="3.5" fill="none" stroke="#FFFFFF" stroke-width="1.5"/>
          <path d="M34 28v-1c0-2-2.5-4-6-4-1 0-2 .2-2.8.6" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      ),
      color: "#FFFFFF",
      title: "Hub",
    },
    {
      icon: (
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19.5 16.5L27 9" stroke="#FFF" strokeWidth="1.5" />
          <path
            d="M28.5 10.5L25.5 7.5L29.25 5.25L30.75 6.75L28.5 10.5Z"
            stroke="#FFF"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M6.03769 13.4623C4.52124 11.9459 4.12642 9.73254 4.85322 7.85322L6.98622 9.98622H9.98622V6.98622L7.85322 4.85322C9.73254 4.12642 11.9459 4.52124 13.4623 6.03769C14.9793 7.5547 15.3739 9.76911 14.646 11.6489L24.3511 21.354C26.2309 20.626 28.4452 21.0207 29.9623 22.5376C31.4787 24.0541 31.8736 26.2674 31.1467 28.1467L29.0137 26.0137H26.0137V29.0137L28.1467 31.1467C26.2674 31.8736 24.0541 31.4787 22.5376 29.9623C21.0217 28.4464 20.6266 26.2342 21.3523 24.3553L11.6447 14.6476C9.76579 15.3733 7.55356 14.9782 6.03769 13.4623Z"
            stroke="#FFF"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M18.3045 21.75L9.89845 30.1561C9.10672 30.9478 7.8231 30.9478 7.03137 30.1561L5.84379 28.9686C5.05207 28.1769 5.05207 26.8932 5.84379 26.1015L14.2499 17.6953"
            stroke="#FFF"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#FF5C3D",
      title: "Spark",
    },
    
  ];

  return (
    <section className="pt-36">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        viewport={{ once: true }}
        className="mx-auto container max-w-[1128px] px-8 flex flex-col items-center"
      >
        <p className="font-seven-seg text-lg uppercase text-center text-yellow-600">
          Agents
        </p>
        <h2 className="mb-8 mt-2 text-4xl text-center uppercase text-[#FFF]">
          <TypingAnimation startOnView={false}> 5 AGENTS POWERING DOTBASE</TypingAnimation>
        </h2>

        {/* <p className="mb-12 font-medium text-center text-[#001A2C]">
            <span className="text-base">Meet the core agents driving ALMAZE</span>
            <br />
        </p> */}

        <div ref={containerRef} className="relative flex flex-col items-center">
          <div ref={logoRef} className="relative z-10 mb-56 flex bg-gradient-to-br from-[#1c1a3e] to-[#34181d] rounded-full px-1 py-1">
            <Image src={img1} alt="" className="w-[56px]" />
          </div>

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div1Ref}
            toRef={logoRef}
            duration={3}
            curvature={100}
            reverse
            pathColor="#1c1a3e"
            gradientStartColor="#410e66"
            gradientStopColor="#410e66"
          />

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div2Ref}
            toRef={logoRef}
            duration={3}
            reverse
            curvature={100}
            pathColor="#1c1a3e"
            gradientStartColor="#410e66"
            gradientStopColor="#410e66"
          />

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div3Ref}
            toRef={logoRef}
            duration={3}
            reverse
            curvature={100}
            pathColor="#1c1a3e"
            gradientStartColor="#410e66"
            gradientStopColor="#410e66"
          />

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div4Ref}
            toRef={logoRef}
            duration={3}
            curvature={100}
            pathColor="#1c1a3e"
            gradientStartColor="#410e66"
            gradientStopColor="#410e66"
          />

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div5Ref}
            toRef={logoRef}
            duration={3}
            curvature={100}
            pathColor="#1c1a3e"
            gradientStartColor="#410e66"
            gradientStopColor="#410e66"
          />


          <div className="relative z-10 grid grid-cols-5 gap-4">
            {agents.map((agent, index) => {
              return (
                <div
                  key={index}
                  ref={
                    index === 0
                      ? div1Ref
                      : index === 1
                      ? div2Ref
                      : index === 2
                      ? div3Ref
                      : index === 3
                      ? div4Ref
                      : div5Ref
                  }
                  className="p-6 rounded-xl flex flex-col items-center gap-2.5"
                >
                  <div className=" bg-gradient-to-br from-[#1c1a3e] to-[#34181d] rounded-full px-4 py-4">
                    {agent.icon}
                  </div>

                  <h3
                    className="text-lg font-semibold text-white text-center"
                  >
                    {agent.title}
                  </h3>
{/* 
                  <p className="text-sm text-center text-[#001A2C]/75">
                    {agent.description}
                  </p> */}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
