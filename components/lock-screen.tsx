"use client"

import type React from "react"
import { useEffect } from "react"
import { Camera, Flashlight } from "lucide-react"
import DateTimeHeader from "@/components/datetime-header"
import { useGestureManager } from "@/hooks/use-gesture-manager"

interface LockScreenProps {
  onUnlock: () => void
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const {
    dragY,
    isDragging,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useGestureManager({ onUnlock, isLockScreen: true })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault()
        onUnlock()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onUnlock])

  return (
    <div
      className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing font-system select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-600 via-red-500 to-red-700">
        <img
          src="/beautiful-woman-portrait-red-aesthetic-modern-styl.jpg"
          alt="Lock screen background"
          className="w-full h-full object-cover opacity-90"
        />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>

      {/* Drag indicator overlay */}
      {isDragging && dragY > 0 && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div 
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/20 to-transparent transition-all duration-100"
            style={{ height: `${Math.min(dragY * 2, 200)}px` }}
          ></div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-between py-6 px-6 pt-20">

        {/* Time and date header */}
        <DateTimeHeader variant="dark" />

        {/* Unlock hint and camera */}
        <div className="flex flex-col items-center gap-8 pb-8 w-full">
          <div className="flex flex-col items-center gap-3">
            <div className="text-white/70 text-sm font-medium tracking-wide font-mi-sans">
              {dragY > 0 ? "Keep dragging up..." : "Swiper up to open!"}
            </div>

          </div>

          {/* Flash button - left side */}
          <div className="absolute bottom-8 left-6">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-all border border-white/30">
              <Flashlight size={20} strokeWidth={2} className="text-white/80" />
            </div>
          </div>

          {/* Camera button - right side */}
          <div className="absolute bottom-8 right-6">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-all border border-white/30">
              <Camera size={20} strokeWidth={2} className="text-white/80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
