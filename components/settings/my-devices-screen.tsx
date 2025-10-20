"use client"

import DeviceSpecsScreen from "@/components/settings/device-specs-screen"
import AppScreen from "@/components/"
import BackButton from "@/components/atoms/back-button"
import { useState } from "react"
interface MyDevicesScreenProps {
  onBack: () => void
}

export default function MyDevicesScreen({ onBack }: MyDevicesScreenProps) {
  const [showSpecs, setShowSpecs] = useState(false)

  if (showSpecs) {
    return <DeviceSpecsScreen onBack={() => setShowSpecs(false)} />
  }

  const handleItemClick = (itemId: string) => {
    if (itemId === "detailed-info") {
      setShowSpecs(true)
    }
  }

  return (
    <AppScreen variant="dark" onBack={onBack}>
      <div className="relative h-full flex flex-col">
        <BackButton onClick={onBack} variant="floating" />
        
        <div className="flex flex-col justify-center items-center px-6 pt-32 pb-8 flex-shrink-0">
          <h1 className="text-3xl font-bold text-white mb-2">Xiaomi HyperOS</h1>
          <p className="text-white text-lg">3.0.17.0</p>
        </div>

        <div className="pb-8 flex-1 flex flex-col justify-end">
          
        <div className="bg-gray-500/60 backdrop-blur-sm rounded-2xl p-6 mb-6 w-full">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">Device name</span>
              <div className="flex items-center space-x-2">
                <span className="text-gray-300 font-medium">Xiaomi 17 Pro Max</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">Storage</span>
              <div className="flex items-center space-x-2">
                <span className="text-gray-300 font-medium">42.9GB/512GB</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <span className="text-white font-medium">OS version</span>
            <span className="text-gray-300 font-medium">3.0.17.0</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-white font-medium">Android version</span>
            <span className="text-gray-300 font-medium">15 UP1A.241005.011</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-white font-medium">Android security update</span>
            <span className="text-gray-300 font-medium">2025-10-17</span>
          </div>
        </div>

        <div
          onClick={() => handleItemClick("detailed-info")}
          className="flex items-center justify-between py-4 mt-6 cursor-pointer hover:bg-white/5 rounded-lg transition-colors"
        >
          <span className="text-white font-medium">Detailed info and specs</span>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        </div>
      </div>
    </AppScreen>
  )
}
