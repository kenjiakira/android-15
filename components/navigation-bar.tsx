"use client"

interface NavigationBarProps {
  variant?: "light" | "dark"
  className?: string
}

export default function NavigationBar({ 
  variant = "dark",
  className = ""
}: NavigationBarProps) {
  const isLight = variant === "light"
  const barColor = isLight ? "bg-gray-400" : "bg-white/60"

  return (
    <div className={`absolute bottom-0 left-0 right-0 flex justify-center items-end pb-2 ${className}`}>
      {/* Horizontal Bar Indicator */}
      <div className={`w-32 h-1 ${barColor} rounded-full`}></div>
    </div>
  )
}
