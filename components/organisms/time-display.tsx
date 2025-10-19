"use client"

interface TimeDisplayProps {
  time: string
  variant?: "light" | "dark"
}

export default function TimeDisplay({ time, variant = "dark" }: TimeDisplayProps) {
  return (
    <div className="text-sm font-bold tracking-tight text-white">
      {time}
    </div>
  )
}
