"use client"

import { useState } from "react"
import AppsGrid from "@/components/apps-grid"
import { useAppManager } from "@/hooks/use-app-manager"
import { SYSTEM_WIDGET_APP_IDS } from "@/components/widgets/system-tools-widget"

interface AppsProps {
  onAppSelect: (appId: string) => void
}

export default function Apps({ onAppSelect }: AppsProps) {
  const [selectedApp, setSelectedApp] = useState<string | null>(null)
  const { getAllApps } = useAppManager()

 
  const allApps = getAllApps()
  const apps = allApps.filter(app => !SYSTEM_WIDGET_APP_IDS.includes(app.id))

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