"use client"

import Image from "next/image"

interface SignalIndicatorProps {
  variant?: "light" | "dark"
}

export default function SignalIndicator({ variant = "dark" }: SignalIndicatorProps) {
  return (
    <Image 
      src="/Signal.png" 
      alt="Signal" 
      width={16} 
      height={16} 
      className="opacity-90 brightness-0 invert" 
    />
  )
}
