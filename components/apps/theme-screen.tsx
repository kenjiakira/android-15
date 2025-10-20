"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import AppScreen from "@/components/app-screen"

interface Wallpaper {
  id: string
  name: string
  thumbnail: string
  fullImage: string
  category: 'nature' | 'abstract' | 'gradient' | 'solid'
}

interface ThemeScreenProps {
  onBack: () => void
}

const wallpapers: Wallpaper[] = [
  // Nature wallpapers
  {
    id: 'nature-1',
    name: 'Mountain Lake',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop&crop=center',
    fullImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920&fit=crop&crop=center',
    category: 'nature',
  },
  {
    id: 'nature-2', 
    name: 'Forest Path',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=500&fit=crop&crop=center',
    fullImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1080&h=1920&fit=crop&crop=center',
    category: 'nature',
  },
  {
    id: 'nature-3',
    name: 'Ocean Waves',
    thumbnail: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=700&fit=crop&crop=center',
    fullImage: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1080&h=1920&fit=crop&crop=center',
    category: 'nature',
  },
  {
    id: 'nature-4',
    name: 'Desert Sunset',
    thumbnail: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=550&fit=crop&crop=center',
    fullImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1080&h=1920&fit=crop&crop=center',
    category: 'nature',
  },
  {
    id: 'nature-5',
    name: 'Blue Sky',
    thumbnail: 'https://images.unsplash.com/photo-1498081959737-f3ba1af08103?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687',
    fullImage: 'https://images.unsplash.com/photo-1498081959737-f3ba1af08103?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687',
    category: 'nature',
  },
  {
    id: 'nature-6',
    name: 'Tropical Beach',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=600&fit=crop&crop=center',
    fullImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1080&h=1920&fit=crop&crop=center',
    category: 'nature',
  },
  {
    id: 'nature-7',
    name: 'Flower Garden',
    thumbnail: 'https://images.unsplash.com/photo-1760029012684-7cc3800aba71?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=400&h=500',
    fullImage: 'https://images.unsplash.com/photo-1760029012684-7cc3800aba71?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1080&h=1920',
    category: 'nature',
  },
  // Abstract wallpapers
  {
    id: 'abstract-1',
    name: 'Geometric',
    thumbnail: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=700&fit=crop&crop=center',
    fullImage: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1080&h=1920&fit=crop&crop=center',
    category: 'abstract',
  },
  {
    id: 'abstract-2',
    name: 'Modern Art',
    thumbnail: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=600&fit=crop&crop=center',
    fullImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1080&h=1920&fit=crop&crop=center',
    category: 'abstract',
  },
  {
    id: 'abstract-3',
    name: 'Minimalist',
    thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=550&fit=crop&crop=center',
    fullImage: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1080&h=1920&fit=crop&crop=center',
    category: 'abstract',
  },
  // Gradient wallpapers
  {
    id: 'gradient-1',
    name: 'Purple Gradient',
    thumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=650&fit=crop&crop=center',
    fullImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1080&h=1920&fit=crop&crop=center',
    category: 'gradient',
  },
  {
    id: 'gradient-4',
    name: 'Orange Gradient',
    thumbnail: 'https://images.unsplash.com/photo-1569982175971-d92b01cf8694?w=400&h=600&fit=crop&crop=center',
    fullImage: 'https://images.unsplash.com/photo-1569982175971-d92b01cf8694?w=1080&h=1920&fit=crop&crop=center',
    category: 'gradient',
  },
]

export default function ThemeScreen({ onBack }: ThemeScreenProps) {
  const [selectedWallpaper, setSelectedWallpaper] = useState<string>('nature-1')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isApplying, setIsApplying] = useState(false)

  const categories = [
    { id: 'all', name: 'All', count: wallpapers.length },
    { id: 'nature', name: 'Nature', count: wallpapers.filter(w => w.category === 'nature').length },
    { id: 'abstract', name: 'Abstract', count: wallpapers.filter(w => w.category === 'abstract').length },
    { id: 'gradient', name: 'Gradient', count: wallpapers.filter(w => w.category === 'gradient').length },
    { id: 'solid', name: 'Solid', count: wallpapers.filter(w => w.category === 'solid').length }
  ]

  const filteredWallpapers = selectedCategory === 'all' 
    ? wallpapers 
    : wallpapers.filter(w => w.category === selectedCategory)

  const applyWallpaper = async (wallpaper: Wallpaper) => {
    setIsApplying(true)
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    localStorage.setItem('homeWallpaper', JSON.stringify(wallpaper))
    
    setSelectedWallpaper(wallpaper.id)
    setIsApplying(false)
    
    window.dispatchEvent(new CustomEvent('wallpaperChanged'))
  }


  useEffect(() => {
    const savedWallpaper = localStorage.getItem('homeWallpaper')
    if (savedWallpaper) {
      try {
        const wallpaper = JSON.parse(savedWallpaper)
        setSelectedWallpaper(wallpaper.id)
      } catch (error) {
        console.error('Error loading saved wallpaper:', error)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-b from-black/90 to-transparent backdrop-blur-xl px-4 py-1 relative z-10" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 2rem)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">

            <div>
              <h1 className="text-lg font-bold text-white">Themes</h1>
            </div>
          </div>
          {isApplying && (
            <div className="flex items-center gap-1 text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full backdrop-blur-sm">
              <div className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs font-medium">Applying...</span>
            </div>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-2 bg-black/50 backdrop-blur-sm">
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 backdrop-blur-sm ${
                selectedCategory === category.id
                  ? 'bg-white text-black shadow-lg'
                  : 'bg-white/10 text-white'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        <div className="grid grid-cols-2 gap-3">
          {filteredWallpapers.map((wallpaper, index) => (
            <div
              key={wallpaper.id}
              className={`relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
                selectedWallpaper === wallpaper.id 
                  ? 'ring-2 ring-white shadow-2xl scale-[1.02]' 
                  : ''
              }`}
              onClick={() => applyWallpaper(wallpaper)}
            >
              {/* Wallpaper Image */}
              <div className="aspect-[9/16] relative">
                <Image
                  src={wallpaper.thumbnail}
                  alt={wallpaper.name}
                  fill
                  className="object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Selected Indicator */}
                {selectedWallpaper === wallpaper.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                {/* Wallpaper Info */}
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-semibold text-xs mb-0.5">{wallpaper.name}</h3>
                  <p className="text-white/70 text-xs capitalize font-medium">{wallpaper.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
