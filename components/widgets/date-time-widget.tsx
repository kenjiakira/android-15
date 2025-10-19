"use client"

import { useTime } from "@/components/time-provider"

interface DateTimeWidgetProps {
  className?: string
}

export default function DateTimeWidget({ className = "" }: DateTimeWidgetProps) {
  const { time, date } = useTime()

  return (
    <div className={`animate-slide-up ${className}`}>
      <h1 className="text-6xl font-black text-white font-mi-sans leading-tight">
        {time}
      </h1>
    </div>
  )
}
