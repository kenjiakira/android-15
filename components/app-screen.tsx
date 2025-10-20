"use client"

import { ReactNode } from "react"

interface AppScreenProps {
  onBack: () => void
  children: ReactNode
  variant?: "light" | "dark"
  showSearch?: boolean
  searchPlaceholder?: string
  onSearch?: (query: string) => void
  showScrollbar?: boolean
  fullScreen?: boolean
  hideStatusBar?: boolean
  hideNavigationBar?: boolean
  customHeader?: ReactNode
  hideDefaultHeader?: boolean
  allowContentScroll?: boolean
  noPadding?: boolean
}

export default function AppScreen({ 
  onBack, 
  children, 
  variant = "dark",
  showSearch = false,
  searchPlaceholder = "Search...",
  onSearch,
  showScrollbar = false,
  fullScreen = false,
  hideStatusBar = false,
  hideNavigationBar = false,
  customHeader,
  hideDefaultHeader = false,
  allowContentScroll = true,
  noPadding = false
}: AppScreenProps) {
  const isLight = variant === "light"
  const bgColor = isLight ? "bg-white" : "bg-gray-900"
  const textColor = isLight ? "text-gray-900" : "text-white"
  const secondaryTextColor = isLight ? "text-gray-600" : "text-gray-400"
  const cardBgColor = isLight ? "bg-gray-50" : "bg-gray-800"
  const borderColor = isLight ? "border-gray-200" : "border-gray-700"

  if (fullScreen) {
    return (
      <div className={`w-full h-full relative overflow-hidden ${!hideStatusBar ? 'pt-8' : ''}`}>
        {children}
      </div>
    )
  }

  return (
      <div className={`w-full h-full ${bgColor} ${textColor} overflow-hidden font-system flex flex-col select-none min-w-0 relative ${!hideStatusBar ? 'pt-8' : ''}`}>

        {/* Custom Header or Default Header */}
        {!hideDefaultHeader && (
          customHeader ? (
            customHeader
          ) : (
            <div className={`px-6 py-4 ${bgColor}`}>
              {/* Search Bar */}
              {showSearch && (
                <div className="relative">
                  <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${secondaryTextColor}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder={searchPlaceholder}
                    onChange={(e) => onSearch?.(e.target.value)}
                    className={`w-full ${cardBgColor} ${textColor} ${secondaryTextColor} placeholder-${secondaryTextColor} rounded-lg pl-10 pr-4 py-3 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              )}
            </div>
          )
        )}

        {/* Content */}
        <div className={`flex-1 min-w-0 ${
          allowContentScroll ? 'overflow-y-auto' : 'overflow-hidden'
        } ${
          noPadding ? '' : 'px-6 pb-6'
        } ${
          showScrollbar ? 'scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500' : 'scrollbar-hide'
        }`}>
          <div className="w-full max-w-full h-full">
            {children}
          </div>
        </div>
      </div>
  )
}
