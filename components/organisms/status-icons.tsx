"use client"

import SignalIndicator from "@/components/atoms/signal-indicator"
import WifiIndicator from "@/components/atoms/wifi-indicator"
import BatteryIndicator from "@/components/atoms/battery-indicator"

interface StatusIconsProps {
  variant?: "light" | "dark"
}

export default function StatusIcons({ variant = "dark" }: StatusIconsProps) {
  return (
    <div className="flex gap-1.5 text-sm pointer-events-none select-none">
      <SignalIndicator variant={variant} />
      <WifiIndicator variant={variant} />
      <BatteryIndicator variant={variant} />
    </div>
  )
}
