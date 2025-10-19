"use client"

import type React from "react"
import { useEffect } from "react"
import DepthEffectWallpaper from "@/components/depth-effect-wallpaper"
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
    isFingerprintPressed,
    showWaveAnimation,
    waveProgress,
    handleFingerprintPress,
    handleFingerprintRelease,
  } = useGestureManager({ onUnlock, isLockScreen: true, enableFingerprint: true })

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
      {/* Depth Effect Wallpaper */}
      <DepthEffectWallpaper 
        className="absolute inset-0" 
        isFingerprintPressed={isFingerprintPressed}
        showWaveAnimation={showWaveAnimation}
        waveProgress={waveProgress}
        handleFingerprintPress={handleFingerprintPress}
        handleFingerprintRelease={handleFingerprintRelease}
      />

      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 z-5"></div>

      {/* Drag indicator overlay */}
      {isDragging && dragY > 0 && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div 
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/20 to-transparent transition-all duration-100"
            style={{ height: `${Math.min(dragY * 2, 200)}px` }}
          ></div>
        </div>
      )}
    </div>
  )
}
