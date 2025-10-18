"use client"

import { useState, useRef } from "react"
import { Camera, ArrowLeft, FlipHorizontal, Settings, Flashlight } from "lucide-react"

interface CameraScreenProps {
  onBack: () => void
}

export default function CameraScreen({ onBack }: CameraScreenProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [flashMode, setFlashMode] = useState<'off' | 'on' | 'auto'>('off')
  const [cameraMode, setCameraMode] = useState<'photo' | 'video'>('photo')
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  const toggleFlash = () => {
    const modes: ('off' | 'on' | 'auto')[] = ['off', 'on', 'auto']
    const currentIndex = modes.indexOf(flashMode)
    setFlashMode(modes[(currentIndex + 1) % modes.length])
  }

  return (
    <div className="w-full h-full bg-black relative overflow-hidden">
      {/* Status Bar removed - now handled in page.tsx */}

      {/* Camera View */}
      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        {/* Mock camera viewfinder */}
        <div className="w-4/5 h-4/5 bg-gray-700 rounded-lg border-2 border-white/20 flex items-center justify-center">
          <Camera size={48} className="text-white/40" strokeWidth={1} />
        </div>
      </div>

      {/* Top Controls */}
      <div className="absolute top-20 left-4 right-4 flex justify-between items-center z-20">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20"
        >
          <ArrowLeft size={20} className="text-white" strokeWidth={1.5} />
        </button>

        <div className="flex gap-3">
          <button
            onClick={toggleFlash}
            className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center border transition-all ${
              flashMode === 'off' 
                ? 'bg-black/50 border-white/20' 
                : 'bg-yellow-500/80 border-yellow-400/60'
            }`}
          >
            <Flashlight size={18} className={`${flashMode === 'off' ? 'text-white' : 'text-yellow-100'}`} strokeWidth={1.5} />
          </button>

          <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <FlipHorizontal size={18} className="text-white" strokeWidth={1.5} />
          </button>

          <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <Settings size={18} className="text-white" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Camera Mode Toggle */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 flex bg-black/50 backdrop-blur-sm rounded-full border border-white/20 p-1">
        <button
          onClick={() => setCameraMode('photo')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            cameraMode === 'photo' 
              ? 'bg-white text-black' 
              : 'text-white/70 hover:text-white'
          }`}
        >
          Photo
        </button>
        <button
          onClick={() => setCameraMode('video')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            cameraMode === 'video' 
              ? 'bg-white text-black' 
              : 'text-white/70 hover:text-white'
          }`}
        >
          Video
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        <div className="flex items-center justify-between">
          {/* Gallery */}
          <div className="w-12 h-12 rounded-lg bg-gray-600 border-2 border-white/30 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded"></div>
          </div>

          {/* Capture Button */}
          <button
            onClick={toggleRecording}
            className={`w-20 h-20 rounded-full border-4 transition-all ${
              isRecording 
                ? 'bg-red-500 border-red-300 animate-pulse' 
                : 'bg-white border-white/30 hover:scale-105'
            }`}
          >
            {isRecording && (
              <div className="w-8 h-8 bg-white rounded-sm m-auto"></div>
            )}
          </button>

          {/* Switch Camera */}
          <button className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <FlipHorizontal size={20} className="text-white" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  )
}
