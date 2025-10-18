"use client"

import { useState, useCallback } from "react"
import AppRouter from "@/lib/app-router"
import { useAppManager } from "./use-app-manager"

export interface UseAppRouterReturn {
  currentApp: string | null
  navigateToApp: (appId: string) => void
  goBack: () => void
  renderCurrentApp: () => React.ReactNode
  isAppOpen: (appId: string) => boolean
  closeAllApps: () => void
}

export function useAppRouter(): UseAppRouterReturn {
  const [currentApp, setCurrentApp] = useState<string | null>(null)
  const { navigateToApp: appManagerNavigate, goBack: appManagerGoBack, currentApp: appManagerCurrentApp } = useAppManager()
  const appRouter = AppRouter.getInstance()

  const navigateToApp = useCallback((appId: string) => {
    setCurrentApp(appId)
    appManagerNavigate(appId)
  }, [appManagerNavigate])

  const goBack = useCallback((): string | null => {
    const previousApp = appManagerGoBack()
    setCurrentApp(previousApp)
    return previousApp
  }, [appManagerGoBack])

  const renderCurrentApp = useCallback(() => {
    if (!currentApp) return null
    
    return appRouter.renderApp(
      currentApp,
      () => goBack(),
      (appId: string) => navigateToApp(appId)
    )
  }, [currentApp, appRouter, goBack, navigateToApp])

  const isAppOpen = useCallback((appId: string) => {
    return currentApp === appId
  }, [currentApp])

  const closeAllApps = useCallback(() => {
    setCurrentApp(null)
  }, [])

  return {
    currentApp,
    navigateToApp,
    goBack,
    renderCurrentApp,
    isAppOpen,
    closeAllApps
  }
}
