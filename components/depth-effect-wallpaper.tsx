"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Camera, Flashlight } from "lucide-react"
// import { FontManager, FONTS } from "@/lib/font-manager"

interface DepthEffectWallpaperProps {
  className?: string
  isFingerprintPressed?: boolean
  showWaveAnimation?: boolean
  waveProgress?: number
  handleFingerprintPress?: () => void
  handleFingerprintRelease?: () => void
}

export default function DepthEffectWallpaper({ 
  className = "", 
  isFingerprintPressed = false,
  showWaveAnimation = false,
  waveProgress = 0,
  handleFingerprintPress,
  handleFingerprintRelease
}: DepthEffectWallpaperProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

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
    <>
      <style jsx>{`
        @keyframes wave {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }
      `}</style>
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Background layer - layout 1 (plain background) */}
      <div className="absolute inset-0">
        <img
          src="/wallpaper/layout1.png"
          alt="Background"
          className={`w-full h-full object-cover transition-all duration-300 select-none pointer-events-none ${
            isFingerprintPressed ? 'brightness-50' : 'brightness-100'
          }`}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
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
          className={`w-full h-full object-cover transition-all duration-300 select-none pointer-events-none ${
            isFingerprintPressed ? 'brightness-50' : 'brightness-100'
          }`}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
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
        <div 
          className={`w-14 h-14 rounded-full backdrop-blur-md border-4 flex items-center justify-center cursor-pointer transition-all ${
            isFingerprintPressed 
              ? 'bg-white/20 border-white/50 scale-105' 
              : 'bg-white/10 border-white/30 hover:bg-white/20'
          }`}
          onMouseDown={(e) => {
            e.preventDefault()
            handleFingerprintPress?.()
          }}
          onMouseUp={(e) => {
            e.preventDefault()
            handleFingerprintRelease?.()
          }}
          onMouseLeave={(e) => {
            e.preventDefault()
            handleFingerprintRelease?.()
          }}
          onTouchStart={(e) => {
            e.preventDefault()
            handleFingerprintPress?.()
          }}
          onTouchEnd={(e) => {
            e.preventDefault()
            handleFingerprintRelease?.()
          }}
          onTouchCancel={(e) => {
            e.preventDefault()
            handleFingerprintRelease?.()
          }}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
        </div>
        
        {/* Wave animation */}
        {showWaveAnimation && (
          <div className="absolute inset-0 pointer-events-none">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-white/30"
                style={{
                  animation: `wave ${1.5}s ease-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                  transform: `scale(${1 + waveProgress * 2})`,
                  opacity: 1 - waveProgress
                }}
              />
            ))}
          </div>
        )}
      </div>
      </div>
    </>
  )
}
