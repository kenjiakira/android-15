"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Camera, Flashlight } from "lucide-react"
// import { FontManager, FONTS } from "@/lib/font-manager"

interface DepthEffectWallpaperProps {
  className?: string
}

export default function DepthEffectWallpaper({ className = "" }: DepthEffectWallpaperProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // useEffect(() => {
  //   const fontManager = FontManager.getInstance()
  //   fontManager.loadFonts([
  //     FONTS.STRETCH_PRO_THIN,
  //     FONTS.STRETCH_PRO
  //   ])
  // }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false
    })
  }

  const renderTimeWithImages = (timeString: string) => {
    const digits = timeString.split('')
    return (
      <div className="flex items-center justify-center gap-2">
        {digits.map((digit, index) => {
          if (digit === ':') {
            return (
              <img
                key={index}
                src="/wallpaper/number/colon.png"
                alt=":"
                className="h-auto"
                style={{
                  height: 'clamp(1.5rem, 3vh, 4rem)',
                  width: 'auto'
                }}
              />
            )
          }
          return (
            <img
              key={index}
              src={`/wallpaper/number/number${digit}.png`}
              alt={digit}
              className="h-auto"
              style={{
                height: 'clamp(5rem, 20vh, 10rem)',
                width: 'auto'
              }}
            />
          )
        })}
      </div>
    )
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className={`relative w-full h-full overflow-hidden pointer-events-none ${className}`}>
      {/* Background layer - layout 1 (plain background) */}
      <div className="absolute inset-0">
        <img
          src="/wallpaper/layout1.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 -translate-y-30">
        <div className="text-center">
       
          <div className="text-white/90 text-sm font-medium tracking-wide mb-10">
            {formatDate(currentTime)}
          </div>
          
            <div 
              className="select-none"
              style={{
                transform: 'scaleY(1.5) scaleX(0.85)',
                textAlign: 'center',
                filter: 'brightness(1.5) contrast(1.2) drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))'
              }}
            >
              {renderTimeWithImages(formatTime(currentTime))}
            </div>
        </div>
      </div>

      {/* Foreground layer - layout 3 (mountains) - NO MASK, just overlay */}
      <div className="absolute inset-0 z-20">
        <img
          src="/wallpaper/layout3.png"
          alt="Foreground mountains"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Flash and Camera buttons */}
      <div className="absolute bottom-8 left-6 z-30">
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-all border border-white/30 cursor-pointer">
          <Flashlight size={20} strokeWidth={2} className="text-white/80" />
        </div>
      </div>

      <div className="absolute bottom-8 right-6 z-30">
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-all border border-white/30 cursor-pointer">
          <Camera size={20} strokeWidth={2} className="text-white/80" />
        </div>
      </div>

      {/* Fingerprint scanner simulation - center bottom */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30">
        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all">
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/20"></div>
        </div>
      </div>
    </div>
  )
}
