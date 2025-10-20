"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Apps from "@/components/apps"
import Dock from "@/components/dock"
import QuickSettingsPanel from "@/components/quick-settings-panel"
import { useAppRouter } from "@/hooks/use-app-router"
import { useAppRegistration } from "@/lib/app-factory"
import { useGestureManager } from "@/hooks/use-gesture-manager"
import { DragFeedbackAnimation, AppExitAnimation, AppEnterAnimation } from "@/components/home-animations"

interface HomeScreenProps {
  onLock: () => void
  onOpenCamera: () => void
}

export default function HomeScreen({ onLock, onOpenCamera }: HomeScreenProps) {
  const [selectedApp, setSelectedApp] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isEntering, setIsEntering] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [showQuickSettings, setShowQuickSettings] = useState(false)
  const [currentWallpaper, setCurrentWallpaper] = useState<string>('/home-screen.png')
  
  useAppRegistration()
  
  const { currentApp, navigateToApp, renderCurrentApp, isAppOpen, goBack } = useAppRouter()
  
  useEffect(() => {
    const savedWallpaper = localStorage.getItem('homeWallpaper')
    if (savedWallpaper) {
      try {
        const wallpaper = JSON.parse(savedWallpaper)
        setCurrentWallpaper(wallpaper.fullImage)
      } catch (error) {
        console.error('Error loading saved wallpaper:', error)
      }
    }
  }, [])
  
  useEffect(() => {
    const handleWallpaperChange = () => {
      const savedWallpaper = localStorage.getItem('homeWallpaper')
      if (savedWallpaper) {
        try {
          const wallpaper = JSON.parse(savedWallpaper)
          setCurrentWallpaper(wallpaper.fullImage)
        } catch (error) {
          console.error('Error loading saved wallpaper:', error)
        }
      }
    }
    
    window.addEventListener('wallpaperChanged', handleWallpaperChange)
    return () => window.removeEventListener('wallpaperChanged', handleWallpaperChange)
  }, [])
  
  const {
    dragY,
    isDragging,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useGestureManager({ 
    onUnlock: () => {
      if (currentApp) {
        // Start both background shrink and foreground exit
        setIsTransitioning(true)
        setIsExiting(true)
      }
    }, 
    threshold: 30 
  })

  const handleAppSelect = (appId: string) => {
    if (appId === 'camera') {
      onOpenCamera()
    } else {
      setSelectedApp(appId)
      setIsEntering(true)
        navigateToApp(appId)
      setTimeout(() => {
        setIsEntering(false)
      }, 300)
    }
  }

  return (
    <div 
      className="w-full h-full overflow-hidden font-system flex flex-col select-none relative cursor-default"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Click area to open quick settings - top right corner from punch hole */}
      <div 
        className="absolute top-0 left-1/2 right-0 h-16 z-40 cursor-pointer"
        onClick={() => setShowQuickSettings(true)}
      />
      {/* Background Image */}
      <Image
        src={currentWallpaper}
        alt="Home Screen Background"
        fill
        className={`object-cover z-0 transition-all duration-300 ${
          isTransitioning ? 'scale-105 brightness-110' : 'scale-100 brightness-100'
        }`}
        priority
      />
      
      <div className="absolute inset-0 bg-black/20 z-10"></div>
      
      <DragFeedbackAnimation 
        currentApp={currentApp}
        isDragging={isDragging}
        dragY={dragY}
      />

      {/* Bottom gesture capture overlay to ensure exit works over clickable elements */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20"
        style={{ height: '200px' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      <AppExitAnimation 
        isTransitioning={isTransitioning}
        onExited={() => {
          if (currentApp) {
            goBack()
            setIsTransitioning(false)
          }
        }}
      >
        <div className="h-full px-4 pt-12 pb-32">
          {/* Apps Component */}
          <Apps onAppSelect={handleAppSelect} />
        </div>
      </AppExitAnimation>

      {/* Dock Bar */}
      <div className={`absolute bottom-6 left-0 right-0 z-40 px-4 transition-all duration-300 pointer-events-auto ${
        isTransitioning ? 'translate-y-1 scale-95 opacity-90' : 'translate-y-0 scale-100 opacity-100'
      }`}>
        <Dock onAppSelect={handleAppSelect} />
      </div>

      {/* Dynamic App Rendering */}
      <AppEnterAnimation 
        currentApp={currentApp} 
        isEntering={isEntering}
        isExiting={isExiting}
        onExited={() => {
          if (!isExiting) return
          setIsExiting(false)
          goBack()
          setIsTransitioning(false)
        }}
      >
        {renderCurrentApp()}
      </AppEnterAnimation>

      {/* Quick Settings Panel */}
      <QuickSettingsPanel 
        isVisible={showQuickSettings}
        onClose={() => setShowQuickSettings(false)}
      />
    </div>
  )
}
