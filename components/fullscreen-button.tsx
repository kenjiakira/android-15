"use client"

import { useFullscreen } from "./fullscreen-context"

interface FullscreenButtonProps {
  className?: string
}

export default function FullscreenButton({ className = "" }: FullscreenButtonProps) {
  const { isFullscreen, toggleFullscreen } = useFullscreen()

  if (isFullscreen) {
    return null
  }

  return (
    <button
      onClick={toggleFullscreen}
      className={`fixed top-0 right-2 z-50 w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-all duration-200 ${className}`}
      title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
    >
      {isFullscreen ? (
        // Exit fullscreen icon
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
        </svg>
      ) : (
        // Enter fullscreen icon
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
        </svg>
      )}
    </button>
  )
}
