"use client"

import { useState, useEffect } from "react"

interface SignalIndicatorProps {
  variant?: "light" | "dark"
  animated?: boolean
}

export default function SignalIndicator({ variant = "dark", animated = true }: SignalIndicatorProps) {
  const [signalStrength, setSignalStrength] = useState(3)

  useEffect(() => {
    if (!animated) return

    const interval = setInterval(() => {
      setSignalStrength(prev => {
        const change = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0
        const newStrength = prev + change
        return Math.max(2, Math.min(4, newStrength))
      })
    }, 2000 + Math.random() * 3000)

    return () => clearInterval(interval)
  }, [animated])

  const getSignalBars = () => {
    const bars = []
    for (let i = 1; i <= 4; i++) {
      bars.push(
        <rect
          key={i}
          x={1 + (i - 1) * 3.5}
          y={15 - i * 2.5}
          width="2.5"
          height={i * 2.5}
          fill="#ffffff"
          opacity={i <= signalStrength ? 1 : 0.2}
        />
      )
    }
    return bars
  }

  return (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 18 18"
      className="opacity-100"
    >
      {getSignalBars()}
    </svg>
  )
}
