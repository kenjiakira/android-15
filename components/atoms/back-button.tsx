"use client"

import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface BackButtonProps {
  onClick: () => void
  className?: string
  variant?: "default" | "floating"
}

export default function BackButton({ 
  onClick, 
  className,
  variant = "default" 
}: BackButtonProps) {
  const baseClasses = "p-2 hover:bg-white/10 rounded-full transition-colors"
  const positionClasses = variant === "floating" 
    ? "absolute top-0 left-0 z-20" 
    : ""

  return (
    <button 
      onClick={onClick}
      className={cn(baseClasses, positionClasses, className)}
    >
      <ArrowLeft className="w-6 h-6 text-white" />
    </button>
  )
}