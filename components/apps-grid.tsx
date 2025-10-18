"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useTime } from "@/components/time-provider"
import GoogleSearchWidget from "@/components/google-search-widget"

interface App {
  id: string
  name: string
  image: string
  color: string
}

interface AppsGridProps {
  apps: App[]
  onAppSelect: (appId: string) => void
}

export default function AppsGrid({ apps, onAppSelect }: AppsGridProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { time, date } = useTime()

  const GRID_COLS = 4
  const GRID_ROWS = 7
  const DEFAULT_APPS_PER_PAGE = GRID_COLS * GRID_ROWS 
  
  const getAvailableSlotsOnFirstPage = () => {
    const hasTimeWidget = true  
    const hasSearchWidget = true  
    const hasPageIndicators = true  
    
    let usedSlots = 0
    
    if (hasTimeWidget) usedSlots += 8
    
    if (hasSearchWidget) usedSlots += 4
    
    if (hasPageIndicators) usedSlots += 0 
    
    const availableSlots = DEFAULT_APPS_PER_PAGE - usedSlots
    return Math.max(0, availableSlots)
  }

  const availableSlotsFirstPage = getAvailableSlotsOnFirstPage()
  const remainingApps = apps.length - availableSlotsFirstPage
  const additionalPages = Math.ceil(remainingApps / DEFAULT_APPS_PER_PAGE)
  const totalPages = 1 + additionalPages

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollLeft = scrollContainerRef.current.scrollLeft
        const containerWidth = scrollContainerRef.current.clientWidth
        const newPage = Math.round(scrollLeft / containerWidth)
        setCurrentPage(newPage)
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="mb-8 relative h-full -mx-4">
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-12" 
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {Array.from({ length: totalPages }, (_, pageIndex) => {
          let startIndex, endIndex, pageApps
          
          if (pageIndex === 0) {
            startIndex = 0
            endIndex = availableSlotsFirstPage
            pageApps = apps.slice(startIndex, endIndex)
          } else {
            const remainingAppsStart = availableSlotsFirstPage + (pageIndex - 1) * DEFAULT_APPS_PER_PAGE
            startIndex = remainingAppsStart
            endIndex = remainingAppsStart + DEFAULT_APPS_PER_PAGE
            pageApps = apps.slice(startIndex, endIndex)
          }
          
          return (
            <div key={pageIndex} className="w-full flex-shrink-0 snap-center px-4">
              {/* Header with date and time - only show on first page */}
              {pageIndex === 0 && (
                <div className="mb-6 animate-slide-up">
                  <p className="text-xs text-white/70 font-medium font-mi-sans">{date}</p>
                  <h1
                    className="text-5xl font-black text-white mt-1 font-mi-sans"
                  >
                    {time}
                  </h1>
                  
                  {/* Google Search Widget */}
                  <GoogleSearchWidget 
                    onSearch={(query) => console.log('Search:', query)}
                    onVoiceSearch={() => console.log('Voice search')}
                    onLensSearch={() => console.log('Lens search')}
                  />
                </div>
              )}
              
              {/* Apps Grid */}
              <div className="grid grid-cols-4 gap-3">
                {pageApps.map((app, index) => (
                  <button
                    key={app.id}
                    onClick={() => onAppSelect(app.id)}
                    className="animate-slide-up active:scale-90 transition-transform"
                    style={{ animationDelay: `${0.02 * index}s` }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center text-white shadow-lg transition-all active:scale-95 relative overflow-hidden`}
                      >
                        <Image
                          src={app.image}
                          alt={app.name}
                          fill
                          className="object-cover rounded-2xl"
                        />
                      </div>
                      <span className="text-xs font-medium text-white text-center line-clamp-1 font-mi-sans w-full">
                        {app.name}
                      </span>
                    </div>
                  </button>
                ))}
                
                {/* Fill empty slots on first page to maintain grid structure */}
                {pageIndex === 0 && pageApps.length < availableSlotsFirstPage && (
                  Array.from({ length: availableSlotsFirstPage - pageApps.length }, (_, index) => (
                    <div key={`empty-${index}`} className="w-14 h-14"></div>
                  ))
                )}
              </div>
              
            </div>
          )
        })}
      </div>
      
      {/* Page indicators - Fixed at bottom near dock */}
      {totalPages > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex justify-center gap-2 z-10">
          {Array.from({ length: totalPages }, (_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentPage ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      )}
      
    </div>
  )
}
