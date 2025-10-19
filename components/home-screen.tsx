"use client"

import { useState, useRef } from "react"
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
  const [showQuickSettings, setShowQuickSettings] = useState(false)
  
  useAppRegistration()
  
  const { currentApp, navigateToApp, renderCurrentApp, isAppOpen, goBack } = useAppRouter()
  
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
        setIsTransitioning(true)
        setTimeout(() => {
          goBack()
          setIsTransitioning(false)
        }, 300)
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
      className="w-full h-full overflow-hidden font-system flex flex-col select-none relative cursor-grab active:cursor-grabbing"
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
        src="/home-screen.png"
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

      <AppExitAnimation isTransitioning={isTransitioning}>
        <div className="h-full px-4 pt-12 pb-32">
          {/* Apps Component */}
          <Apps onAppSelect={handleAppSelect} />
        </div>
      </AppExitAnimation>

      {/* Dock Bar */}
      <div className={`absolute bottom-6 left-0 right-0 z-30 px-4 transition-all duration-300 ${
        isTransitioning ? 'translate-y-1 scale-95 opacity-90' : 'translate-y-0 scale-100 opacity-100'
      }`}>
        <Dock onAppSelect={handleAppSelect} />
      </div>

      {/* Dynamic App Rendering */}
      <AppEnterAnimation currentApp={currentApp} isEntering={isEntering}>
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
