"use client"

import React, { useState } from "react"
import Image from "next/image"
import { useTime } from "@/components/time-provider"
import { Sun, Volume2 } from 'lucide-react'
interface QuickSettingsPanelProps {
  isVisible: boolean
  onClose: () => void
}

interface ToggleState {
  wifi: boolean
  mobileData: boolean
  bluetooth: boolean
  airplane: boolean
  autoBrightness: boolean
  doNotDisturb: boolean
  flashlight: boolean
  screenLock: boolean
  link: boolean
  location: boolean
  rotationLock: boolean
  screenRecording: boolean
  screenshot: boolean
  screenMirroring: boolean
  eyeComfort: boolean
  darkMode: boolean
  batterySaver: boolean
  powerOff: boolean
  ultraBatterySaver: boolean
  cast: boolean
  screenRecorder: boolean
  soundMode: boolean
}

export default function QuickSettingsPanel({ isVisible, onClose }: QuickSettingsPanelProps) {
  const { time, date } = useTime()
  const [toggles, setToggles] = useState<ToggleState>({
    wifi: true,
    mobileData: true,
    bluetooth: true,
    airplane: false,
    autoBrightness: true,
    doNotDisturb: false,
    flashlight: false,
    screenLock: true,
    link: false,
    location: true,
    rotationLock: false,
    screenRecording: false,
    screenshot: false,
    screenMirroring: false,
    eyeComfort: false,
    darkMode: true,
    batterySaver: false,
    powerOff: false,
    ultraBatterySaver: false,
    cast: false,
    screenRecorder: false,
    soundMode: true
  })

  const [brightness, setBrightness] = useState(75)
  const [volume, setVolume] = useState(50)
  const [isPlaying, setIsPlaying] = useState(true)

  const toggleSetting = (key: keyof ToggleState) => {
    setToggles(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const ToggleButton = ({ 
    iconPath, 
    label, 
    isActive, 
    onClick, 
    isLarge = false,
    isRounded = false
  }: {
    iconPath: string
    label: string
    isActive: boolean
    onClick: () => void
    isLarge?: boolean
    isRounded?: boolean
  }) => (
    <button
      onClick={onClick}
      className={`${isLarge ? 'w-32 h-20' : 'w-14 h-14'} ${isRounded ? 'rounded-full' : 'rounded-2xl'} flex items-center justify-center transition-all ${
        isActive 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-800/80 text-white/70'
      } ${isLarge ? 'flex-row gap-3 px-4' : ''}`}
      title={label}
    >
      <Image
        src={iconPath}
        alt={label}
        width={isLarge ? 24 : 22}
        height={isLarge ? 24 : 22}
        className={`${isActive ? 'brightness-0 invert' : 'brightness-0 invert opacity-70'}`}
      />
      {isLarge && <span className="text-sm font-medium font-mi-sans">{label}</span>}
    </button>
  )

  return (
    <div className={`absolute inset-0 z-50 bg-black/80 backdrop-blur-sm transition-all duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <div className="absolute top-0 left-0 right-0">
        <div className="flex items-center justify-between px-6 py-2 text-white text-sm font-mi-sans">
          <div className="flex items-center gap-3">
            <span>{date}</span>
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/svg/Signal.svg" alt="Signal" width={12} height={12} className="brightness-0 invert" />
            <Image src="/svg/wifi.svg" alt="WiFi" width={16} height={16} className="brightness-0 invert" />
            <Image src="/svg/Battery.svg" alt="Battery" width={16} height={16} className="brightness-0 invert" />
          </div>
        </div>
      </div>

        <div 
          className={`absolute top-16 left-0 right-0 rounded-t-3xl mx-4 mt-2 p-6 transition-all duration-500 ease-out transform ${
            isVisible 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-8 opacity-0 scale-95'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
        <div className={`flex gap-5 mb-6 transition-all duration-700 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <ToggleButton
            iconPath="/svg/wifi.svg"
            label="WiFi"
            isActive={toggles.wifi}
            onClick={() => toggleSetting('wifi')}
            isLarge
          />
          <ToggleButton
            iconPath="/svg/Signal.svg"
            label="Mobile Data"
            isActive={toggles.mobileData}
            onClick={() => toggleSetting('mobileData')}
            isLarge
          />
        </div>

        <div className={`flex gap-6 mb-6 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="w-32 h-32 bg-gray-800/60 rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xs">V</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium font-mi-sans text-xs truncate">VISIONS</h3>
                <p className="text-white/70 text-xs font-mi-sans truncate">VALORANT, eaJ & Sa...</p>
              </div>
            </div>
             <div className="flex items-center justify-center gap-2">
               <button className="text-white/70 hover:text-white">
                 <Image src="/svg/previous.svg" alt="Previous" width={16} height={16} className="brightness-0 invert opacity-70" />
               </button>
               <button 
                 className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white"
                 onClick={() => setIsPlaying(!isPlaying)}
               >
                 <Image src={isPlaying ? "/svg/pause.svg" : "/svg/play.svg"} alt={isPlaying ? "Pause" : "Play"} width={12} height={12} className="brightness-0 invert" />
               </button>
               <button className="text-white/70 hover:text-white">
                 <Image src="/svg/next.svg" alt="Next" width={16} height={16} className="brightness-0 invert opacity-70" />
               </button>
             </div>
          </div>

          {/* Sliders */}
            <div className="flex gap-4">
            <div className="flex flex-col items-center gap-2">
              <div 
                className="w-14 h-32 bg-gray-600/60 rounded-2xl relative cursor-pointer border border-gray-500/30 overflow-hidden"
                onMouseDown={(e) => {
                  e.preventDefault()
                  const slider = e.currentTarget
                  const rect = slider.getBoundingClientRect()
                  
                  const updateBrightness = (clientY: number) => {
                    const y = clientY - rect.top
                    const percentage = Math.max(0, Math.min(100, ((rect.height - y) / rect.height) * 100))
                    setBrightness(Math.round(percentage))
                  }
                  
                  const handleMouseMove = (e: MouseEvent) => {
                    e.preventDefault()
                    requestAnimationFrame(() => updateBrightness(e.clientY))
                  }
                  
                  const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove)
                    document.removeEventListener('mouseup', handleMouseUp)
                  }
                  
                  document.addEventListener('mousemove', handleMouseMove, { passive: false })
                  document.addEventListener('mouseup', handleMouseUp)
                  
                  updateBrightness(e.clientY)
                }}
              >
                <div className="absolute inset-0 bg-gray-700/40 rounded-2xl"></div>
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-white transition-all duration-75 ease-out"
                  style={{ 
                    height: `${brightness}%`,
                    borderRadius: '0 0 0.75rem 0.75rem'
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Sun className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div 
                className="w-14 h-32 bg-gray-600/60 rounded-2xl relative cursor-pointer border border-gray-500/30 overflow-hidden"
                onMouseDown={(e) => {
                  e.preventDefault()
                  const slider = e.currentTarget
                  const rect = slider.getBoundingClientRect()
                  
                  const updateVolume = (clientY: number) => {
                    const y = clientY - rect.top
                    const percentage = Math.max(0, Math.min(100, ((rect.height - y) / rect.height) * 100))
                    setVolume(Math.round(percentage))
                  }
                  
                  const handleMouseMove = (e: MouseEvent) => {
                    e.preventDefault()
                    requestAnimationFrame(() => updateVolume(e.clientY))
                  }
                  
                  const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove)
                    document.removeEventListener('mouseup', handleMouseUp)
                  }
                  
                  document.addEventListener('mousemove', handleMouseMove, { passive: false })
                  document.addEventListener('mouseup', handleMouseUp)
                  
                  updateVolume(e.clientY)
                }}
              >
                <div className="absolute inset-0 bg-gray-700/40 rounded-2xl"></div>
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-white transition-all duration-75 ease-out"
                  style={{ 
                    height: `${volume}%`,
                    borderRadius: '0 0 0.75rem 0.75rem'
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Volume2 className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`grid grid-cols-4 gap-3 transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          {/* Row 1 */}
          <ToggleButton iconPath="/svg/bluetooth.svg" label="Bluetooth" isActive={toggles.bluetooth} onClick={() => toggleSetting('bluetooth')} isRounded />
          <ToggleButton iconPath="/svg/plane.svg" label="Airplane" isActive={toggles.airplane} onClick={() => toggleSetting('airplane')} isRounded />
          <ToggleButton iconPath="/svg/sun.svg" label="Auto-brightness" isActive={toggles.autoBrightness} onClick={() => toggleSetting('autoBrightness')} isRounded />
          <ToggleButton iconPath="/svg/bell.svg" label="Do Not Disturb" isActive={toggles.doNotDisturb} onClick={() => toggleSetting('doNotDisturb')} isRounded />

          {/* Row 2 */}
          <ToggleButton iconPath="/svg/flash.svg" label="Flashlight" isActive={toggles.flashlight} onClick={() => toggleSetting('flashlight')} isRounded />
          <ToggleButton iconPath="/svg/lock.svg" label="Screen Lock" isActive={toggles.screenLock} onClick={() => toggleSetting('screenLock')} isRounded />
          <ToggleButton iconPath="/svg/link.svg" label="Link" isActive={toggles.link} onClick={() => toggleSetting('link')} isRounded />
          <ToggleButton iconPath="/svg/map.svg" label="Location" isActive={toggles.location} onClick={() => toggleSetting('location')} isRounded />

          {/* Row 3 */}
          <ToggleButton iconPath="/svg/lock.svg" label="Rotation" isActive={toggles.rotationLock} onClick={() => toggleSetting('rotationLock')} isRounded />
          <ToggleButton iconPath="/svg/video.svg" label="Screen Recording" isActive={toggles.screenRecording} onClick={() => toggleSetting('screenRecording')} isRounded />
          <ToggleButton iconPath="/svg/scissors.svg" label="Screenshot" isActive={toggles.screenshot} onClick={() => toggleSetting('screenshot')} isRounded />
          <ToggleButton iconPath="/svg/monitor.svg" label="Cast" isActive={toggles.screenMirroring} onClick={() => toggleSetting('screenMirroring')} isRounded />

          {/* Row 4 */}
          <ToggleButton iconPath="/svg/eye.svg" label="Eye Comfort" isActive={toggles.eyeComfort} onClick={() => toggleSetting('eyeComfort')} isRounded />
          <ToggleButton iconPath="/svg/moon.svg" label="Dark Mode" isActive={toggles.darkMode} onClick={() => toggleSetting('darkMode')} isRounded />
          <ToggleButton iconPath="/svg/Battery.svg" label="Battery Saver" isActive={toggles.batterySaver} onClick={() => toggleSetting('batterySaver')} isRounded />
          <ToggleButton iconPath="/svg/power.svg" label="Power Off" isActive={toggles.powerOff} onClick={() => toggleSetting('powerOff')} isRounded />

          {/* Row 5 */}
          <ToggleButton iconPath="/svg/Battery.svg" label="Ultra Battery" isActive={toggles.ultraBatterySaver} onClick={() => toggleSetting('ultraBatterySaver')} isRounded />
          <ToggleButton iconPath="/svg/monitor.svg" label="Cast" isActive={toggles.cast} onClick={() => toggleSetting('cast')} isRounded />
          <ToggleButton iconPath="/svg/video.svg" label="Screen Recorder" isActive={toggles.screenRecorder} onClick={() => toggleSetting('screenRecorder')} isRounded />
          <ToggleButton iconPath="/svg/volume.svg" label="Sound Mode" isActive={toggles.soundMode} onClick={() => toggleSetting('soundMode')} isRounded />
        </div>

      </div>

      <div 
        className="absolute inset-0 -z-10" 
        onClick={onClose}
      />
    </div>
  )
}
