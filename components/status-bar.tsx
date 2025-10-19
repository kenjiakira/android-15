"use client"

import { useTime } from "@/components/time-provider"
import { TimeDisplay, StatusIcons } from "@/components/organisms"

interface StatusBarProps {
  variant?: "light" | "dark"
  hideTime?: boolean
}

export default function StatusBar({ variant = "dark", hideTime = false }: StatusBarProps) {
  const { time } = useTime()
  
  return (
    <div
      className={`w-full flex justify-between items-center px-5 py-1.5 ${
        variant === "light" ? "text-slate-900" : "text-white"
      }`}
      style={{
        touchAction: 'manipulation',
        overscrollBehavior: 'none',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      {!hideTime ? (
        <TimeDisplay time={time} variant={variant} />
      ) : (
        <div></div>
      )}
      <StatusIcons variant={variant} />
    </div>
  )
}
