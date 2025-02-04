"use client";
import { useState } from "react";
import { TypingAnimation } from "@/components/ui/animations/typing-animation";
import { motion, AnimatePresence } from "framer-motion";

export default function TokenomicsSection() {
  const [activeState, setActiveState] = useState<number>(1);

  const handleStateChange = (state: number) => {
    setActiveState(state);
  };

  const tabs = [
    {
      id: 1,
      color: "#1DA2FF",
      title: "Circulating Supply",
      percentage: "95%",
      content: {
        title: "Circulating Supply 95%",
        text: "The circulating supply represents the total amount of tokens that are currently available in the market. This ensures liquidity and accessibility for all participants. Our commitment to transparency and fairness is reflected in the high percentage of tokens allocated for circulation.",
        bullets: [
          "Ensures liquidity and accessibility for all participants.",
          "Reflects our commitment to transparency and fairness.",
          "Supports the growth and sustainability of our community."
        ]
      }
    },
    {
      id: 2,
      color: "#FBBC05",
      title: "Team Allocations",
      percentage: "2%",
      content: {
        title: "Team Allocations 2%",
        background: "tokenomics-section-bg-2.png",
        text: "The team allocation represents a small portion of the total supply, dedicated to rewarding the team for their hard work and commitment. This ensures that the team remains motivated and aligned with the project's long-term goals.",
        bullets: [
          "Rewards the team for their dedication and hard work.",
          "Aligns the team's interests with the project's success.",
          "Supports the ongoing development and growth of the project."
        ]
      }
    },
    {
      id: 3,
      color: "#EA4335",
      title: "Marketing Operations",
      percentage: "1%",
      content: {
        title: "Marketing Operations 1%",
        background: "tokenomics-section-bg-3.png",
        text: "The marketing operations allocation is dedicated to promoting our project and expanding our reach. This ensures that we can effectively communicate our vision and attract new participants.",
        bullets: [
          "Supports promotional activities and campaigns.",
          "Helps in expanding our community and user base.",
          "Ensures effective communication of our project's vision and goals."
        ]
      }
    },
    {
      id: 4,
      color: "#2AD458",
      title: "Treasury",
      percentage: "2%",
      content: {
        title: "Treasury 2%",
        background: "tokenomics-section-bg-4.png",
        text: "The treasury allocation is reserved for the long-term sustainability and growth of the project. This fund will be used for future development, partnerships, and unforeseen expenses.",
        bullets: [
          "Ensures the project's long-term sustainability and growth.",
          "Provides funds for future development and partnerships.",
          "Covers unforeseen expenses and emergencies."
        ]
      }
    }
  ];

  return (
    <section id="tokenomics" className="pt-36">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        viewport={{ once: true }}
        className="mx-auto container max-w-[1128px] px-8 flex flex-col items-center"
      >
        <p className="font-seven-seg text-lg uppercase text-center text-yellow-600">
          Tokenomics
        </p>

        <h2 className="mb-2 mt-1 max-w-[900px] text-3xl text-center uppercase text-[#FFF]">
          <TypingAnimation startOnView = {false}>GREAT TOKENS SIMPLE TOKENOMICS</TypingAnimation>
        </h2>

        <p className="mb-12 font-medium text-center text-[#b5b5b5]">
          Discover the transparent and fair distribution of our tokens, designed to ensure <br /> sustainability and growth for our community.
        </p>

        <div className="w-full  bg-black rounded-xl">
          <div className="px-28 grid grid-cols-4">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => handleStateChange(tab.id)}
                className={`border-r border-[#eee] last:border-r-0 text-white py-2 px-1 cursor-pointer transition-all duration-300
                ${activeState === tab.id ? 'text-yellow-600' : 'hover:text-yellow-600'}`}
              >
                <div className="mb-1 flex items-center justify-center gap-1">
                  {/* <span
                    className="w-[15px] h-[15px] rounded block"
                    style={{ backgroundColor: tab.color }}
                  /> */}
                  <p className="text-sm font-medium">
                    {tab.title}
                  </p>
                </div>
                {/* <h3
                  className="font-offbit text-5xl uppercase transition-all duration-300 "
                  style={{ color: tab.color }}
                >
                  {tab.percentage}
                </h3> */}
              </div>
            ))}
          </div>

          <div className="p-5 flex justify-center mt-2">
            <div className="relative h-[280px] w-[800px] overflow-hidden rounded-2xl border border-yellow-600">
              <AnimatePresence mode="wait">
                {tabs.map((tab) => (
                  activeState === tab.id && (
                    <motion.div
                      key={tab.id}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        duration: 0.3
                      }}
                      className="absolute inset-0 p-8 rounded-xl"
                      style={{
                        background: `url('/images/${tab.content.background}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundColor: "#000",
                      }}
                    >
                      <h4 className="mb-1.5 text-2xl text-yellow-600 font-semibold">
                        {tab.content.title}
                      </h4>
                      <div className="text-sm leading-[24px] text-white space-y-4">
                        <p>{tab.content.text}</p>
                        <ul className="space-y-1">
                          {tab.content.bullets.map((bullet, index) => (
                            <li key={index}>• {bullet}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}