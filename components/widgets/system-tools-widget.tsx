"use client"

import { useTime } from "@/components/time-provider"
import { useAppManager } from "@/hooks/use-app-manager"
import Image from "next/image"

interface SystemToolsWidgetProps {
  onAppSelect: (appId: string) => void
}

export const SYSTEM_WIDGET_APP_IDS = ['file-explore', 'mi-get-apps', 'calculator']

export default function SystemToolsWidget({
  onAppSelect
}: SystemToolsWidgetProps) {
  const { date } = useTime()
  const { getAppsByCategory } = useAppManager()
  
  const dayOfWeek = date.split(' ')[1] || '周六'
  const dayNumber = date.split(' ')[0].split('月')[1]?.split('日')[0] || '16'

  const systemApps = getAppsByCategory('system')
  
  const selectedApps = SYSTEM_WIDGET_APP_IDS
    .map(appId => systemApps.find(app => app.id === appId))
    .filter(Boolean)

  return (
    <div className="w-full h-full bg-white/10 backdrop-blur-md rounded-3xl p-4 flex flex-col">
      {/* Top row */}
      <div className="flex-1 grid grid-cols-2 gap-3">
        {/* Calendar */}
        <button
          onClick={() => onAppSelect('calendar')}
          className="bg-white/20 rounded-2xl flex flex-col items-center justify-center space-y-1 active:scale-95 transition-transform"
        >
          <div className="text-white/90 text-xs font-mi-sans">{dayOfWeek}</div>
          <div className="text-white text-lg font-bold font-mi-sans">{dayNumber}</div>
        </button>
        
        {/* First System App */}
        {selectedApps[0] && (
          <button
            onClick={() => onAppSelect(selectedApps[0]!.id)}
            className={`bg-gradient-to-br ${selectedApps[0]!.color} rounded-2xl flex items-center justify-center active:scale-95 transition-transform relative overflow-hidden`}
          >
            <Image
              src={selectedApps[0]!.image}
              alt={selectedApps[0]!.name}
              fill
              className="object-cover rounded-2xl"
            />
          </button>
        )}
      </div>
      
      {/* Bottom row */}
      <div className="flex-1 grid grid-cols-2 gap-3 mt-3">
        {/* Second System App */}
        {selectedApps[1] && (
          <button
            onClick={() => onAppSelect(selectedApps[1]!.id)}
            className={`bg-gradient-to-br ${selectedApps[1]!.color} rounded-2xl flex items-center justify-center active:scale-95 transition-transform relative overflow-hidden`}
          >
            <Image
              src={selectedApps[1]!.image}
              alt={selectedApps[1]!.name}
              fill
              className="object-cover rounded-2xl"
            />
          </button>
        )}
        
        {/* Third System App */}
        {selectedApps[2] && (
          <button
            onClick={() => onAppSelect(selectedApps[2]!.id)}
            className={`bg-gradient-to-br ${selectedApps[2]!.color} rounded-2xl flex items-center justify-center active:scale-95 transition-transform relative overflow-hidden`}
          >
            <Image
              src={selectedApps[2]!.image}
              alt={selectedApps[2]!.name}
              fill
              className="object-cover rounded-2xl"
            />
          </button>
        )}
      </div>
    </div>
  )
}
