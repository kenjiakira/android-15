"use client"

import { useTime } from "@/components/time-provider"

interface DateTimeHeaderProps {
  variant?: "dark" | "light"
}

export default function DateTimeHeader({ variant = "dark" }: DateTimeHeaderProps) {
  const { time, date } = useTime()

  const textColor = variant === "dark" ? "text-white" : "text-black"
  const dateColor = variant === "dark" ? "text-white/80" : "text-black/80"

  return (
    <div className="flex flex-col items-center mt-12">
      <div className={`text-sm font-medium tracking-wide font-mi-sans ${dateColor}`}>
        {date}
      </div>
      <div
        className={`text-9xl font-black tracking-tighter leading-none font-mi-sans ${textColor}`}
      >
        {time}
      </div>
    </div>
  )
}
