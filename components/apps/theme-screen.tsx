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
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=700&fit=crop&crop=center',
    fullImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920&fit=crop&crop=center',
    category: 'nature'
  },
  {
    id: 'nature-2', 
    name: 'Forest Path',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=700&fit=crop&crop=center',
    fullImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1080&h=1920&fit=crop&crop=center',
    category: 'nature'
  },
  {
    id: 'nature-3',
    name: 'Ocean Waves',
    thumbnail: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=700&fit=crop&crop=center',
    fullImage: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1080&h=1920&fit=crop&crop=center',
    category: 'nature'
  },
  {
    id: 'nature-4',
    name: 'Desert Sunset',
    thumbnail: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=700&fit=crop&crop=center',
    fullImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1080&h=1920&fit=crop&crop=center',
    category: 'nature'
  },
  {
    id: 'nature-5',
    name: 'Snow Mountains',
    thumbnail: 'https://images.unsplash.com/photo-1464822759844-d150baecb2f6?w=400&h=700&fit=crop&crop=center',
    fullImage: 'https://images.unsplash.com/photo-1464822759844-d150baecb2f6?w=1080&h=1920&fit=crop&crop=center',
    category: 'nature'
  },
  {
    id: 'nature-6',
    name: 'Tropical Beach',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=700&fit=crop&crop=center',
    fullImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1080&h=1920&fit=crop&crop=center',
    category: 'nature'
  },
  // Abstract wallpapers
  {
    id: 'abstract-1',
    name: 'Geometric',
    thumbnail: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=700&fit=crop&crop=center',
    fullImage: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1080&h=1920&fit=crop&crop=center',
    category: 'abstract'
  },
  {
    id: 'abstract-2',
    name: 'Modern Art',
    thumbnail: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=700&fit=crop&crop=center',
    fullImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1080&h=1920&fit=crop&crop=center',
    category: 'abstract'
  },
  // Gradient wallpapers
  {
    id: 'gradient-1',
    name: 'Purple Gradient',
    thumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=700&fit=crop&crop=center',
    fullImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1080&h=1920&fit=crop&crop=center',
    category: 'gradient'
  },
  {
    id: 'gradient-2',
    name: 'Blue Gradient',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=700&fit=crop&crop=center',
    fullImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1080&h=1920&fit=crop&crop=center',
    category: 'gradient'
  },
  {
    id: 'gradient-3',
    name: 'Sunset Gradient',
    thumbnail: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=700&fit=crop&crop=center',
    fullImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1080&h=1920&fit=crop&crop=center',
    category: 'gradient'
  },
  {
    id: 'gradient-4',
    name: 'Orange Gradient',
    thumbnail: 'https://images.unsplash.com/photo-1569982175971-d92b01cf8694?w=400&h=700&fit=crop&crop=center',
    fullImage: 'https://images.unsplash.com/photo-1569982175971-d92b01cf8694?w=1080&h=1920&fit=crop&crop=center',
    category: 'gradient'
  }
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
    
    // Simulate applying wallpaper
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Store wallpaper preference in localStorage
    localStorage.setItem('homeWallpaper', JSON.stringify(wallpaper))
    
    setSelectedWallpaper(wallpaper.id)
    setIsApplying(false)
    
    // Dispatch custom event to notify home screen of wallpaper change
    window.dispatchEvent(new CustomEvent('wallpaperChanged'))
    
    // Show success feedback
    const successToast = document.createElement('div')
    successToast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg z-50 transition-all duration-300'
    successToast.textContent = 'Wallpaper applied successfully!'
    document.body.appendChild(successToast)
    
    setTimeout(() => {
      successToast.remove()
    }, 2000)
  }

  // Load saved wallpaper on component mount
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
    <AppScreen onBack={onBack} variant="dark" hideDefaultHeader>
      {/* Custom Header */}
      <div className="px-6 py-4 bg-gray-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl font-semibold text-white">Themes</h1>
              <p className="text-sm text-gray-400">Customize your home screen</p>
            </div>
          </div>
          {isApplying && (
            <div className="flex items-center gap-2 text-blue-400">
              <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">Applying...</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Categories */}
        <div className="px-6 py-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Wallpapers Grid */}
        <div className="px-6 pb-6">
          <div className="grid grid-cols-2 gap-4">
            {filteredWallpapers.map((wallpaper) => (
              <div
                key={wallpaper.id}
                className={`relative group cursor-pointer rounded-xl overflow-hidden transition-all duration-200 ${
                  selectedWallpaper === wallpaper.id 
                    ? 'ring-2 ring-blue-500 scale-105' 
                    : 'hover:scale-102'
                }`}
                onClick={() => applyWallpaper(wallpaper)}
              >
                {/* Wallpaper Preview */}
                <div className="aspect-[9/16] relative">
                  <Image
                    src={wallpaper.thumbnail}
                    alt={wallpaper.name}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
                  
                  {/* Selected Indicator */}
                  {selectedWallpaper === wallpaper.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                
                {/* Wallpaper Info */}
                <div className="p-3 bg-gray-800">
                  <h3 className="text-white font-medium text-sm">{wallpaper.name}</h3>
                  <p className="text-gray-400 text-xs capitalize">{wallpaper.category}</p>
                </div>
                
                {/* Apply Button */}
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      applyWallpaper(wallpaper)
                    }}
                    disabled={isApplying}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {selectedWallpaper === wallpaper.id ? 'Applied' : 'Apply'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Wallpaper Section */}
        <div className="px-6 pb-6">
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-white font-medium mb-3">Custom Wallpaper</h3>
            <p className="text-gray-400 text-sm mb-4">
              Upload your own image to personalize your home screen
            </p>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition-colors">
              Choose from Gallery
            </button>
          </div>
        </div>
      </div>
    </AppScreen>
  )
}
