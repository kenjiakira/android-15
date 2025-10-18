"use client"

import { useState } from "react"
import { Search, Filter, MoreVertical, Mountain, Album } from "lucide-react"
import AppScreen from "@/components/app-screen"

interface GalleryScreenProps {
  onBack: () => void
}

interface Photo {
  id: string
  src: string
  alt: string
  date: string
  section: string
}

const samplePhotos: Photo[] = [
  // Today
  { id: "1", src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop", alt: "Woman in blue top", date: "Today", section: "Today" },
  { id: "2", src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop", alt: "Mountain landscape", date: "Today", section: "Today" },
  { id: "3", src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop", alt: "Woman in floral dress", date: "Today", section: "Today" },
  
  // Yesterday  
  { id: "4", src: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=600&fit=crop", alt: "Woman in dark top", date: "Yesterday", section: "Yesterday" },
  { id: "5", src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop", alt: "Woman in red dress", date: "Yesterday", section: "Yesterday" },
  
  // October 10, 2024
  { id: "6", src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop", alt: "Wedding couple", date: "10 October 2024", section: "10 October 2024" },
  { id: "7", src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop", alt: "Woman in red top", date: "10 October 2024", section: "10 October 2024" },
  { id: "8", src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop", alt: "Woman in floral dress", date: "10 October 2024", section: "10 October 2024" },
  { id: "9", src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop", alt: "Woman in black blazer", date: "10 October 2024", section: "10 October 2024" },
  { id: "10", src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop", alt: "Sunset silhouette", date: "10 October 2024", section: "10 October 2024" },
  { id: "11", src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop", alt: "Woman in white top", date: "10 October 2024", section: "10 October 2024" },
]

export default function GalleryScreen({ onBack }: GalleryScreenProps) {
  const [activeTab, setActiveTab] = useState<"photos" | "album">("photos")
  
  const groupedPhotos = samplePhotos.reduce((acc, photo) => {
    if (!acc[photo.section]) {
      acc[photo.section] = []
    }
    acc[photo.section].push(photo)
    return acc
  }, {} as Record<string, Photo[]>)

  const getPhotoGridClass = (section: string, index: number) => {
    if (section === "10 October 2024") {
      if (index === 0) return "col-span-2 row-span-2" // Large wedding photo
      return "col-span-1 row-span-1"
    }
    return "col-span-1 row-span-1"
  }

  return (
    <AppScreen onBack={onBack} variant="dark">
      {/* Custom Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-white text-lg font-medium">Photos</h1>
        <div className="flex items-center space-x-4">
          <Search className="w-6 h-6 text-white" />
          <Filter className="w-6 h-6 text-white" />
          <MoreVertical className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {Object.entries(groupedPhotos).map(([section, photos]) => (
          <div key={section}>
            <h2 className="text-white font-medium text-base mb-4">{section}</h2>
            <div className={`grid gap-2 ${
              section === "10 October 2024" 
                ? "grid-cols-3 grid-rows-2" 
                : photos.length === 3 
                  ? "grid-cols-3" 
                  : "grid-cols-2"
            }`}>
              {photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className={`bg-gray-200 rounded-lg overflow-hidden ${getPhotoGridClass(section, index)}`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='system-ui' font-size='12'%3EPhoto%3C/text%3E%3C/svg%3E"
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-gray-800/60 backdrop-blur-sm border-t border-gray-700 px-6 py-4 -mx-6 mt-8">
        <div className="flex justify-center space-x-12">
          <button
            onClick={() => setActiveTab("photos")}
            className={`flex flex-col items-center space-y-1 ${
              activeTab === "photos" ? "text-blue-400" : "text-gray-400"
            }`}
          >
            <Mountain className="w-6 h-6" />
            <span className="text-xs font-medium">Photos</span>
          </button>
          <button
            onClick={() => setActiveTab("album")}
            className={`flex flex-col items-center space-y-1 ${
              activeTab === "album" ? "text-blue-400" : "text-gray-400"
            }`}
          >
            <Album className="w-6 h-6" />
            <span className="text-xs font-medium">Album</span>
          </button>
        </div>
      </div>
    </AppScreen>
  )
}
