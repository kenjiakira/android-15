"use client"
import { Cpu, Info, Smartphone } from "lucide-react"
import AppScreen from "@/components/"
import BackButton from "@/components/atoms/back-button"

interface DeviceSpecsScreenProps {
  onBack: () => void
}

export default function DeviceSpecsScreen({ onBack }: DeviceSpecsScreenProps) {

  return (
    <AppScreen  onBack={onBack} variant="dark">
      <div className="relative">
        <BackButton onClick={onBack} variant="floating" />
        
        <div className="space-y-4 pt-16">
          <h1 className="text-white font-bold text-xl">Detailed info and specs</h1>
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-4 h-4 text-gray-300" />
                  <span className="text-white font-medium text-sm">RAM</span>
                </div>
                <span className="text-gray-300 font-medium text-sm">16.0GB</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-gray-300" />
                  <span className="text-white font-medium text-sm">CPU</span>
                </div>
                <span className="text-gray-300 font-medium text-sm">Snapdragon 8 Elite Gen 5 4,6GHz</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Info className="w-4 h-4 text-gray-300" />
              <span className="text-white font-medium text-sm">Model</span>
            </div>
            <span className="text-gray-300 font-medium text-sm">2511DRK481</span>
          </div>

          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Info className="w-4 h-4 text-gray-300" />
                  <span className="text-white font-medium text-sm">OS version</span>
                </div>
                <span className="text-gray-300 font-medium text-sm">3.0.17.0</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Info className="w-4 h-4 text-gray-300" />
                  <span className="text-white font-medium text-sm">Android version</span>
                </div>
                <span className="text-gray-300 font-medium text-sm">15 UP1A.241005.011 | Android security update: 2025-10-17</span>
              </div>
            </div>
          </div>

          {/* Kernel */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Info className="w-4 h-4 text-gray-300" />
              <span className="text-white font-medium text-sm">Kernel version</span>
            </div>
            <span className="text-gray-300 font-medium text-sm">6.1.57-android15-11-gcf2c2dc91b9e-ab11782407</span>
          </div>

          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Info className="w-4 h-4 text-gray-300" />
              <span className="text-white font-medium text-sm">Baseband version</span>
            </div>
            <span className="text-gray-300 font-medium text-sm">MOLY.NR15.R1.TC8.PR1.SP.V2.P17</span>
          </div>

          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4">
            <h3 className="text-white font-semibold text-sm mb-3">Important security info</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Info className="w-4 h-4 text-gray-300" />
                  <span className="text-white font-medium text-sm">Security Level</span>
                </div>
                <span className="text-gray-300 font-medium text-sm">High</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Info className="w-4 h-4 text-gray-300" />
                  <span className="text-white font-medium text-sm">Encryption</span>
                </div>
                <span className="text-gray-300 font-medium text-sm">AES-256</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4">
            <h3 className="text-white font-semibold text-sm mb-3">Legal info and status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Info className="w-4 h-4 text-gray-300" />
                  <span className="text-white font-medium text-sm">Warranty Status</span>
                </div>
                <span className="text-gray-300 font-medium text-sm">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Info className="w-4 h-4 text-gray-300" />
                  <span className="text-white font-medium text-sm">Legal Compliance</span>
                </div>
                <span className="text-gray-300 font-medium text-sm">Certified</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Info className="w-4 h-4 text-gray-300" />
                  <span className="text-white font-medium text-sm">Device Status</span>
                </div>
                <span className="text-gray-300 font-medium text-sm">Normal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppScreen>
  )
}
