"use client"

import { createContext, useContext, useState, useEffect } from "react"

interface FullscreenContextType {
  isFullscreen: boolean
  toggleFullscreen: () => void
}

const FullscreenContext = createContext<FullscreenContextType | undefined>(undefined)

export function FullscreenProvider({ children }: { children: React.ReactNode }) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (error) {
      console.error('Fullscreen error:', error)
    }
  }

  return (
    <FullscreenContext.Provider value={{ isFullscreen, toggleFullscreen }}>
      {children}
    </FullscreenContext.Provider>
  )
}

export function useFullscreen() {
  const context = useContext(FullscreenContext)
  if (context === undefined) {
    throw new Error('useFullscreen must be used within a FullscreenProvider')
  }
  return context
}
