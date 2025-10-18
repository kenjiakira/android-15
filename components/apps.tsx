"use client"

import { useState } from "react"
import AppsGrid from "@/components/apps-grid"
import { useAppManager } from "@/hooks/use-app-manager"

interface AppsProps {
  onAppSelect: (appId: string) => void
}

export default function Apps({ onAppSelect }: AppsProps) {
  const [selectedApp, setSelectedApp] = useState<string | null>(null)
  const { getAllApps } = useAppManager()

  const apps = getAllApps()

  const handleAppSelect = (appId: string) => {
    setSelectedApp(appId)
    onAppSelect(appId)
  }

  return (
    <AppsGrid 
      apps={apps} 
      onAppSelect={handleAppSelect}
    />
  )
}