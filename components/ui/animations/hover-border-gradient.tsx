"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT"

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 2,
  clockwise = true,
  ...props
}: React.PropsWithChildren<{
    as?: React.ElementType
    containerClassName?: string
    className?: string
    duration?: number
    clockwise?: boolean
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false)
  const [direction, setDirection] = useState<Direction>("TOP")

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ["TOP", "RIGHT", "BOTTOM", "LEFT"]
    const currentIndex = directions.indexOf(currentDirection)
    const nextIndex = clockwise
      ? (currentIndex + 1) % directions.length
      : (currentIndex - 1 + directions.length) % directions.length
    return directions[nextIndex]
  }

  // Enhanced gradient maps matching the nav gradient
  const movingMap: Record<Direction, string> = {
    TOP: "radial-gradient(60% 150% at 50% 0%, rgba(37, 99, 235, 0.5) 0%, rgba(147, 51, 234, 0.3) 50%, rgba(239, 68, 68, 0.4) 100%)",
    RIGHT: "radial-gradient(150% 60% at 100% 50%, rgba(37, 99, 235, 0.5) 0%, rgba(147, 51, 234, 0.3) 50%, rgba(239, 68, 68, 0.4) 100%)",
    BOTTOM: "radial-gradient(60% 150% at 50% 100%, rgba(37, 99, 235, 0.5) 0%, rgba(147, 51, 234, 0.3) 50%, rgba(239, 68, 68, 0.4) 100%)",
    LEFT: "radial-gradient(150% 60% at 0% 50%, rgba(37, 99, 235, 0.5) 0%, rgba(147, 51, 234, 0.3) 50%, rgba(239, 68, 68, 0.4) 100%)"
  }

  // Hover highlight gradient 
  const highlight = "radial-gradient(100% 200% at 50% 50%, rgba(37, 99, 235, 0.7) 0%, rgba(147, 51, 234, 0.5) 50%, rgba(239, 68, 68, 0.6) 100%)"

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState))
      }, duration * 250) // Faster rotation for smoother animation
      return () => clearInterval(interval)
    }
  }, [hovered, duration])

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full content-center transition duration-500 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-[2px] decoration-clone w-fit hover:scale-[1.02]",
        containerClassName
      )}
      {...props}
    >
      <div 
        className={cn(
          "w-auto text-white z-10 bg-black px-8 py-4 rounded-[inherit] font-medium text-[15px]",
          "transition-all duration-300 hover:bg-black/90",
          className
        )}
      >
        {children}
      </div>
      
      {/* Primary glow layer */}
      <motion.div
        className="absolute inset-0 z-0 rounded-[inherit] overflow-hidden"
        style={{
          filter: "blur(12px)",
        }}
        initial={{ background: movingMap[direction], opacity: 0.6 }}
        animate={{
          background: hovered ? highlight : movingMap[direction],
          opacity: hovered ? 0.8 : 0.6,
          scale: hovered ? 1.05 : 1,
        }}
        transition={{ 
          ease: "linear", 
          duration: duration * 0.25,
        }}
      />
      
      {/* Secondary glow layer for depth */}
      <motion.div 
        className="absolute inset-0 z-0 rounded-[inherit] overflow-hidden"
        style={{
          filter: "blur(8px)",
        }}
        animate={{
          background: hovered ? highlight : movingMap[direction],
          scale: hovered ? 1.1 : 1,
          opacity: hovered ? 1 : 0.7,
        }}
        transition={{ 
          ease: "linear",
          duration: duration * 0.25,
        }}
      />

      {/* Inner blur layer */}
      <div className="bg-black/5 absolute z-[1] inset-[1px] rounded-[inherit] backdrop-blur-sm" />
    </Tag>
  )
}