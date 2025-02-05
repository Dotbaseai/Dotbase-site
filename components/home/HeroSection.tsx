"use client";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import img1 from "@/public/assets/images/Dashboard.png";
import { FlipWords } from "@/components/ui/animations/flip-words";
import { ContainerScroll } from "@/components/ui/animations/container-scroll-animation";
import { HoverBorderGradient } from "@/components/ui/animations/hover-border-gradient";
// import axios from "axios";
// import { cn } from "@/lib/utils";
// import { TypingAnimation } from "@/components/ui/animations/typing-animation";
// import { InteractiveGridPattern } from "@/components/ui/animations/interactive-grid-pattern";
// import bgImg from "@/assets/images/hero-section-bg.png";

export default function HeroSection() {
  const privy = usePrivy();
  const router = useRouter();
  const handleLogin = useCallback(() => privy.login(), [privy]);
  const words = ["Smarter Workflows", "Seamless Processes", "Optimized Systems"];


  // const [CA, setCA] = useState("");
  // const [isCopied, setIsCopied] = useState<boolean>(false);
  // useEffect(() => {
  //   axios.get("https://catools.dev3vds1.link/get/almaze-labs")
  //     .then(response => {
  //       const data = response.data
  //       if (data) {
  //         // console.log(`this is the data addr : ${data.address}`)
  //         setCA(data.address);

  //       }
  //     })
  //     .catch(error => {
  //       console.error("Error fetching CA:", error);
  //     });
  // }, []);
  // useEffect(() => {
  //   if (isCopied) {
  //     setTimeout(() => {
  //       setIsCopied(false);
  //     }, 3000);
  //   }
  // });
  

  useEffect(() => {
    if (privy?.ready) {
      if (privy.authenticated) {
        localStorage.setItem('useremail', privy.user?.email?.address ?? "Guest");
        Cookies.set('privy-authenticated', 'true', { path: '/', expires: 1 });
        router.push('/dashboard');
      }
    }
  }, [privy.ready, privy.authenticated, router]);

  return (
    <section className="relative pt-56">
      <div className="min-h-screen bg-black p-8 flex items-center justify-center fixed left-4">
        <div className="relative w-8 h-48 blur-md">
          <div className="absolute inset-0 bg-gradient-to-b from-red-500/50 via-purple-600/50 to-cyan-500/50 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-red-500/20 via-purple-600/20 to-cyan-500/20 blur-2xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-red-500/30 via-purple-600/30 to-cyan-500/30" />
        </div>
      </div>

      <div className="min-h-screen bg-black p-8 flex items-center justify-center fixed right-4 max-2xl:right-16 max-2xl:top-2 top-4">
        <div className="relative w-8 h-48 blur-md">
          <div className="absolute inset-0 bg-gradient-to-b from-red-500/50 via-purple-600/50 to-cyan-500/50 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-red-500/20 via-purple-600/20 to-cyan-500/20 blur-2xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-red-500/30 via-purple-600/30 to-cyan-500/30" />
        </div>
      </div>

      <div className="relative z-10 mx-auto container max-w-[1128px] px-8 flex flex-col items-center">
        {/* <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          viewport={{ once: true }}
          className="mb-6 max-2xl:mb-24 h-[42px] px-1.5 rounded-md flex items-center"
        >
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="bg-black text-white flex items-center space-x-2 py-1.5 text-[13px] font-normal "
          >
            <button
              onClick={() => {
                navigator.clipboard.writeText(CA);
                setIsCopied(true);
              }}
              className="py-1.5"
            >
              CA :{" "}
              {isCopied
                ? "Copied!"
                : CA}
            </button>
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1_771)">
                  <path
                    d="M5.68437 5.91912V4.13412C5.68437 3.42005 5.68437 3.06301 5.82334 2.79028C5.94558 2.55037 6.14063 2.35532 6.38054 2.23308C6.65327 2.09412 7.01031 2.09412 7.72437 2.09412H12.5694C13.2834 2.09412 13.6405 2.09412 13.9132 2.23308C14.1531 2.35532 14.3482 2.55037 14.4704 2.79028C14.6094 3.06301 14.6094 3.42005 14.6094 4.13412V8.97912C14.6094 9.69318 14.6094 10.0502 14.4704 10.323C14.3482 10.5629 14.1531 10.7579 13.9132 10.8801C13.6405 11.0191 13.2834 11.0191 12.5694 11.0191H10.7844M3.89937 14.8441H8.74437C9.45844 14.8441 9.8155 14.8441 10.0882 14.7051C10.3281 14.5829 10.5232 14.3879 10.6454 14.148C10.7844 13.8752 10.7844 13.5182 10.7844 12.8041V7.95912C10.7844 7.24505 10.7844 6.88801 10.6454 6.61528C10.5232 6.37537 10.3281 6.18032 10.0882 6.05808C9.8155 5.91912 9.45844 5.91912 8.74437 5.91912H3.89937C3.18531 5.91912 2.82827 5.91912 2.55554 6.05808C2.31563 6.18032 2.12058 6.37537 1.99834 6.61528C1.85937 6.88801 1.85938 7.24505 1.85938 7.95912V12.8041C1.85938 13.5182 1.85937 13.8752 1.99834 14.148C2.12058 14.3879 2.31563 14.5829 2.55554 14.7051C2.82827 14.8441 3.1853 14.8441 3.89937 14.8441Z"
                    stroke="white"
                    strokeWidth="1.275"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1_771">
                    <rect
                      width="15"
                      height="15"
                      fill="white"
                      transform="translate(0.584351 0.81897)"
                    />
                  </clipPath>
                </defs>
              </svg>
          </HoverBorderGradient>
        </motion.div> */}
        
        <ContainerScroll
          titleComponent={
            <>
            <div className="flex items-center flex-col justify-center max-2xl:max-h-[150px] max-2xl:mt-24">
              <motion.h2
                initial={{ y: -50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className=" max-w-[1050px] text-5xl text-center text-[#FFF] mb-4"
              >
                
                {/* <TypingAnimation startOnView = {false}> */}
                  Build <b><FlipWords words={words} /></b>with AI Agents
                {/* </TypingAnimation> */}
              </motion.h2>

              <motion.p
                initial={{ y: -50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.75 }}
                viewport={{ once: true }}
                className="mb-6 text-lg font-medium text-center text-[#b5b5b5]"
              >
                Dotbase: The Visual Model Forge. Craft, Combine, and Deploy AI Models with Drag-and-Drop Simplicity.
              </motion.p>

              <motion.div
                initial={{ y: -50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                viewport={{ once: true }}
                className="mb-20 mt-2 flex items-center gap-4 max-xl:mb-2"
              >
                <div>
                  <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="button"
                    className="bg-black text-white flex items-center space-x-2"
                    onClick={handleLogin}
                  >
                    <span>Try Dotbase</span>
                  </HoverBorderGradient>
                </div>
              </motion.div>
              </div>
            </>
          }
        >
        <div className=" flex items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.25 }}
            viewport={{ once: true }}
             className="absolute -inset-1 bg-gradient-to-r from-gray-600 to-gray-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.25 }}
            viewport={{ once: true }}
            className="relative w-full"
          >
            <Image 
              src={img1} 
              alt="" 
              className="w-full rounded-lg relative"
            />
          </motion.div>
        </div>
        </div>
        </ContainerScroll>
      </div>
    </section>
  );
}
