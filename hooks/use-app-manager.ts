"use client"

import { useState, useEffect, useCallback } from 'react'
import { AppHandler, App, AppScreenProps } from '@/lib/app-manager'

export interface UseAppManagerReturn {
  currentApp: string | null
  appHistory: string[]
  navigateToApp: (appId: string) => void
  goBack: () => string | null
  getAllApps: () => App[]
  getAppsByCategory: (category: App['category']) => App[]
  getApp: (appId: string) => App | undefined
  hasApp: (appId: string) => boolean
  clearHistory: () => void
  searchApps: (query: string) => App[]
}

export function useAppManager(): UseAppManagerReturn {
  const [currentApp, setCurrentApp] = useState<string | null>(null)
  const [appHistory, setAppHistory] = useState<string[]>([])
  
  const appHandler = AppHandler.getInstance()

  useEffect(() => {
    const unsubscribe = appHandler.addListener((appId) => {
      setCurrentApp(appId)
    })
    
    return unsubscribe
  }, [appHandler])

  const navigateToApp = useCallback((appId: string) => {
    appHandler.navigateToApp(appId)
    setAppHistory(appHandler.getHistory())
  }, [appHandler])

  const goBack = useCallback((): string | null => {
    const previousApp = appHandler.goBack()
    setAppHistory(appHandler.getHistory())
    return previousApp
  }, [appHandler])

  const getAllApps = useCallback(() => {
    return appHandler.getAllApps()
  }, [appHandler])

  const getAppsByCategory = useCallback((category: App['category']) => {
    return appHandler.getAppsByCategory(category)
  }, [appHandler])

  const getApp = useCallback((appId: string) => {
    return appHandler.getApp(appId)
  }, [appHandler])

  const hasApp = useCallback((appId: string) => {
    return appHandler.hasApp(appId)
  }, [appHandler])

  const clearHistory = useCallback(() => {
    appHandler.clearHistory()
    setAppHistory([])
  }, [appHandler])

  const searchApps = useCallback((query: string) => {
    const lowercaseQuery = query.toLowerCase()
    return appHandler.getAllApps().filter(app => 
      app.name.toLowerCase().includes(lowercaseQuery) ||
      app.id.toLowerCase().includes(lowercaseQuery)
    )
  }, [appHandler])

  return {
    currentApp,
    appHistory,
    navigateToApp,
    goBack,
    getAllApps,
    getAppsByCategory,
    getApp,
    hasApp,
    clearHistory,
    searchApps
  }
}
