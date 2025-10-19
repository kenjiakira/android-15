"use client"

import Image from "next/image"

interface WifiIndicatorProps {
  variant?: "light" | "dark"
}

export default function WifiIndicator({ variant = "dark" }: WifiIndicatorProps) {
  return (
    <Image 
      src="/svg/wifi.svg" 
      alt="Wifi" 
      width={18} 
      height={18} 
      className="opacity-90 brightness-0 invert" 
    />
  )
}
