"use client"

import Image from "next/image"

interface BatteryIndicatorProps {
  variant?: "light" | "dark"
}

export default function BatteryIndicator({ variant = "dark" }: BatteryIndicatorProps) {
  return (
    <Image 
      src="/svg/Battery.svg" 
      alt="Battery" 
      width={20} 
      height={20} 
      className="opacity-90 brightness-0 invert" 
    />
  )
}
