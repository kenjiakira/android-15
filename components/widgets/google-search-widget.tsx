"use client"

import Image from "next/image"

interface GoogleSearchWidgetProps {
  onSearch?: (query: string) => void
  onVoiceSearch?: () => void
  onLensSearch?: () => void
  onNavigateToGoogle?: () => void
  }

export default function GoogleSearchWidget({ 
  onSearch, 
  onVoiceSearch, 
  onLensSearch,
  onNavigateToGoogle
}: GoogleSearchWidgetProps) {
  return (
    <div className="mt-6 mb-4">
      <div 
        className="bg-white/90 backdrop-blur-sm rounded-3xl pl-4 pr-1 py-1 shadow-lg border border-white/20"
        onClick={onNavigateToGoogle}
      >
        <div className="flex items-center gap-1">
          {/* Google Logo SVG */}
          <div className="flex items-center">
            <Image
              src="/svg/google.svg"
              alt="Google"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </div>
          
          {/* Right side buttons moved closer to edge */}
          <div className="flex items-center gap-0.5 ml-auto">
            {/* Microphone Icon SVG */}
            <button 
              onClick={onVoiceSearch}
              className="w-10 h-10"
            >
              <Image
                src="/svg/mic.svg"
                alt="Microphone"
                width={24}
                height={24}
                className="w-6 h-6 text-gray-600"
              />
            </button>
            
            {/* Google Lens Icon SVG */}
            <button 
              onClick={onLensSearch}
              className="w-10 h-10"
            >
              <Image
                src="/svg/lens.svg"
                alt="Google Lens"
                width={24}
                height={24}
                className="w-6 h-6 text-gray-600"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
