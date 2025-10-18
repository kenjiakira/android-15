"use client"

import { useState, useCallback } from "react"

export type SettingsScreen = 
  | "main" 
  | "my-devices" 
  | "device-specs" 
  | "wlan" 
  | "bluetooth" 
  | "mobile-network" 
  | "wallpaper" 
  | "lock-screen" 
  | "notifications" 
  | "home-screen" 
  | "display" 
  | "sound" 
  | "fingerprint" 
  | "privacy" 
  | "app-settings" 
  | "battery"

export interface UseSettingsNavigationReturn {
  currentScreen: SettingsScreen
  navigateToScreen: (screen: SettingsScreen) => void
  goBack: () => void
  canGoBack: boolean
}

export function useSettingsNavigation(): UseSettingsNavigationReturn {
  const [currentScreen, setCurrentScreen] = useState<SettingsScreen>("main")
  const [screenHistory, setScreenHistory] = useState<SettingsScreen[]>([])

  const navigateToScreen = useCallback((screen: SettingsScreen) => {
    setScreenHistory(prev => [...prev, currentScreen])
    setCurrentScreen(screen)
  }, [currentScreen])

  const goBack = useCallback(() => {
    if (screenHistory.length > 0) {
      const previousScreen = screenHistory[screenHistory.length - 1]
      setScreenHistory(prev => prev.slice(0, -1))
      setCurrentScreen(previousScreen)
    }
  }, [screenHistory])

  const canGoBack = screenHistory.length > 0

  return {
    currentScreen,
    navigateToScreen,
    goBack,
    canGoBack
  }
}
