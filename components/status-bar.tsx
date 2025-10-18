"use client"

import { useTime } from "@/components/time-provider"
import Image from "next/image"

interface StatusBarProps {
  variant?: "light" | "dark"
}

export default function StatusBar({ variant = "dark" }: StatusBarProps) {
  const { time } = useTime()
  
  return (
    <div
      className={`w-full flex justify-between items-center px-5 py-1.5 ${
        variant === "light" ? "text-slate-900" : "text-white"
      }`}
    >
      <div className="text-sm font-bold tracking-tight text-white">{time}</div>
      <div className="flex gap-1.5 text-sm">
        <Image 
          src="/Signal.png" 
          alt="Signal" 
          width={16} 
          height={16} 
          className="opacity-90 brightness-0 invert" 
        />
        <Image 
          src="/svg/wifi.svg" 
          alt="Wifi" 
          width={18} 
          height={18} 
          className="opacity-90 brightness-0 invert" 
        />
        <Image 
          src="/svg/Battery.svg" 
          alt="Battery" 
          width={20} 
          height={20} 
          className="opacity-90 brightness-0 invert" 
        />
      </div>
    </div>
  )
}
