"use client"

import { useState, useEffect } from "react"
import { 
  Search, 
  Grid3X3, 
  List, 
  MoreVertical, 
  Heart, 
  Share, 
  Download, 
  Trash2, 
  Star,
  Calendar,
  MapPin,
  Camera,
  Filter,
  SortAsc,
  ChevronDown,
  X,
  Play,
  Image as ImageIcon,
  Folder,
  Clock
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import AppScreen from "@/components/app-screen"

interface GalleryScreenProps {
  onBack: () => void
}

interface Photo {
  id: string
  url: string
  title: string
  date: string
  size: string
  location?: string
  isFavorite: boolean
  album?: string
  type: 'image' | 'video'
  duration?: string
  thumbnail?: string
}

const samplePhotos: Photo[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    title: "Mountain Landscape",
    date: "2024-01-15",
    size: "2.4 MB",
    location: "Swiss Alps",
    isFavorite: true,
    album: "Nature",
    type: 'image'
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
    title: "Tech Conference",
    date: "2024-01-14",
    size: "1.8 MB",
    location: "San Francisco",
    isFavorite: false,
    album: "Work",
    type: 'image'
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",
    title: "Cooking Session",
    date: "2024-01-13",
    size: "3.2 MB",
    isFavorite: true,
    album: "Food",
    type: 'image'
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop",
    title: "Family Portrait",
    date: "2024-01-12",
    size: "4.1 MB",
    isFavorite: false,
    album: "Family",
    type: 'image'
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=600&fit=crop",
    title: "Gaming Setup",
    date: "2024-01-11",
    size: "2.7 MB",
    isFavorite: true,
    album: "Gaming",
    type: 'image'
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    title: "Forest Walk",
    date: "2024-01-10",
    size: "3.5 MB",
    location: "Central Park",
    isFavorite: false,
    album: "Nature",
    type: 'image'
  },
  {
    id: "7",
    url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
    title: "Beach Sunset",
    date: "2024-01-09",
    size: "2.9 MB",
    location: "Maldives",
    isFavorite: true,
    album: "Travel",
    type: 'image'
  },
  {
    id: "8",
    url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
    title: "Car Show",
    date: "2024-01-08",
    size: "3.8 MB",
    isFavorite: false,
    album: "Automotive",
    type: 'image'
  },
  {
    id: "9",
    url: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=600&fit=crop",
    title: "Photography Tips",
    date: "2024-01-07",
    size: "2.1 MB",
    isFavorite: true,
    album: "Photography",
    type: 'image'
  },
  {
    id: "10",
    url: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=600&fit=crop",
    title: "Science Lab",
    date: "2024-01-06",
    size: "4.3 MB",
    isFavorite: false,
    album: "Science",
    type: 'image'
  },
  {
    id: "11",
    url: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop",
    title: "Fashion Shoot",
    date: "2024-01-05",
    size: "3.6 MB",
    isFavorite: true,
    album: "Fashion",
    type: 'image'
  },
  {
    id: "12",
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    title: "Workout Session",
    date: "2024-01-04",
    size: "2.8 MB",
    isFavorite: false,
    album: "Fitness",
    type: 'image'
  },
  {
    id: "13",
    url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
    title: "Tokyo Streets",
    date: "2024-01-03",
    size: "3.9 MB",
    location: "Tokyo, Japan",
    isFavorite: true,
    album: "Travel",
    type: 'image'
  },
  {
    id: "14",
    url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    title: "Music Studio",
    date: "2024-01-02",
    size: "2.5 MB",
    isFavorite: false,
    album: "Music",
    type: 'image'
  },
  {
    id: "15",
    url: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop",
    title: "Pet Portrait",
    date: "2024-01-01",
    size: "1.9 MB",
    isFavorite: true,
    album: "Pets",
    type: 'image'
  }
]

export default function GalleryScreen({ onBack }: GalleryScreenProps) {
  const [photos, setPhotos] = useState<Photo[]>(samplePhotos)
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>(samplePhotos)
  const [searchQuery] = useState("")
  const [selectedAlbum] = useState("All Photos")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([])
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [sortBy] = useState<"date" | "name" | "size">("date")
  const [sortOrder] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    let filtered = photos

    if (searchQuery.trim()) {
      filtered = filtered.filter(photo =>
        photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.album?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedAlbum !== "All Photos") {
      if (selectedAlbum === "Favorites") {
        filtered = filtered.filter(photo => photo.isFavorite)
      } else {
        filtered = filtered.filter(photo => photo.album === selectedAlbum)
      }
    }

    filtered.sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
          break
        case "name":
          comparison = a.title.localeCompare(b.title)
          break
        case "size":
          comparison = parseFloat(a.size) - parseFloat(b.size)
          break
      }
      return sortOrder === "asc" ? comparison : -comparison
    })

    setFilteredPhotos(filtered)
  }, [photos, searchQuery, selectedAlbum, sortBy, sortOrder])

  const toggleFavorite = (photoId: string) => {
    setPhotos(prev => prev.map(photo => 
      photo.id === photoId ? { ...photo, isFavorite: !photo.isFavorite } : photo
    ))
  }

  return (
    <AppScreen onBack={onBack} variant="dark" hideDefaultHeader={true} allowContentScroll={false} noPadding={true}>
      <div className="flex flex-col h-full bg-gray-900" style={{ fontFamily: 'Segoe UI, system-ui, sans-serif' }}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <h1 className="text-white text-lg font-semibold">Gallery</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center"
            >
              {viewMode === "grid" ? (
                <List size={16} className="text-gray-300" />
              ) : (
                <Grid3X3 size={16} className="text-gray-300" />
              )}
            </button>
            
            <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
              <MoreVertical size={16} className="text-gray-300" />
            </button>
          </div>
        </div>

        {/* Photos Grid/List */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-20">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 gap-3">
              {filteredPhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  className="relative group cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-800">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23374151'/%3E%3Ctext x='200' y='200' text-anchor='middle' dy='.3em' fill='%239ca3af' font-family='system-ui' font-size='16'%3EImage%3C/text%3E%3C/svg%3E`
                      }}
                    />
                    
                    {/* Selection indicator */}
                    {selectedPhotos.includes(photo.id) && (
                      <div className="absolute top-2 left-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                    )}
                    
                    {/* Favorite indicator */}
                    {photo.isFavorite && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <Heart size={12} className="text-white fill-current" />
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-2">
                    <h3 className="text-white text-sm font-medium truncate">{photo.title}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{photo.date}</span>
                      <span>{photo.size}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredPhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  className="flex items-center space-x-4 p-3 bg-gray-800 rounded-lg cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%234b5563'/%3E%3Ctext x='32' y='32' text-anchor='middle' dy='.3em' fill='%239ca3af' font-family='system-ui' font-size='8'%3EImage%3C/text%3E%3C/svg%3E`
                      }}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate">{photo.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                      <span className="flex items-center space-x-1">
                        <Calendar size={12} />
                        <span>{photo.date}</span>
                      </span>
                      <span>{photo.size}</span>
                      {photo.location && (
                        <span className="flex items-center space-x-1">
                          <MapPin size={12} />
                          <span>{photo.location}</span>
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {photo.isFavorite && (
                      <Heart size={16} className="text-red-500 fill-current" />
                    )}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(photo.id)
                      }}
                      className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center"
                    >
                      <MoreVertical size={16} className="text-gray-300" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {filteredPhotos.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <ImageIcon size={48} className="mb-4 opacity-50" />
              <p className="text-lg font-medium">No photos found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Photo Preview Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div 
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
            >
              <motion.div 
                className="relative max-w-4xl max-h-[90vh] mx-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                 <div className="relative">
                   <img
                     src={selectedPhoto.url}
                     alt={selectedPhoto.title}
                     className="w-full h-auto object-contain rounded-lg"
                   />
                   
                   <button 
                     onClick={() => setSelectedPhoto(null)}
                     className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center"
                   >
                     <X size={20} className="text-white" />
                   </button>
                 </div>
                 
                 {/* Photo Details */}
                 <div className="bg-gray-800 rounded-lg p-4 mt-4">
                   <h3 className="text-white text-lg font-medium mb-2">{selectedPhoto.title}</h3>
                   <div className="flex items-center justify-between text-sm text-gray-300">
                     <div className="flex items-center space-x-4">
                       <span className="flex items-center space-x-1">
                         <Calendar size={14} />
                         <span>{selectedPhoto.date}</span>
                       </span>
                       <span>{selectedPhoto.size}</span>
                       {selectedPhoto.location && (
                         <span className="flex items-center space-x-1">
                           <MapPin size={14} />
                           <span>{selectedPhoto.location}</span>
                         </span>
                       )}
                     </div>
                   </div>
                 </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppScreen>
  )
}
