"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Mic, Plus, User, ShoppingBag, Grid3X3, List, Heart, Share, MoreVertical, Camera, Star, Clock, Folder } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import AppScreen from "@/components/app-screen"

interface GooglePhotosScreenProps {
  onBack: () => void
}

interface Photo {
  id: string
  url: string
  title: string
  date: string
  isFavorite: boolean
  album?: string
}

interface Album {
  id: string
  name: string
  cover: string
  count: number
  lastModified: string
}

const samplePhotos: Photo[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    title: "Mountain View",
    date: "2024-01-15",
    isFavorite: true,
    album: "Favorites"
  },
  {
    id: "2", 
    url: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
    title: "Sunset",
    date: "2024-01-14",
    isFavorite: false,
    album: "Camera"
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
    title: "Family",
    date: "2024-01-13",
    isFavorite: true,
    album: "Favorites"
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=400&fit=crop",
    title: "Food",
    date: "2024-01-12",
    isFavorite: false,
    album: "Camera"
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    title: "Nature",
    date: "2024-01-11",
    isFavorite: false,
    album: "Maui"
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
    title: "Landscape",
    date: "2024-01-10",
    isFavorite: true,
    album: "Dali"
  }
]

const sampleAlbums: Album[] = [
  {
    id: "1",
    name: "Favorites",
    cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    count: 24,
    lastModified: "2 days ago"
  },
  {
    id: "2",
    name: "Camera",
    cover: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
    count: 156,
    lastModified: "1 hour ago"
  },
  {
    id: "3",
    name: "Maui",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
    count: 89,
    lastModified: "1 week ago"
  },
  {
    id: "4",
    name: "Dali",
    cover: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=400&fit=crop",
    count: 12,
    lastModified: "3 days ago"
  }
]

export default function GooglePhotosScreen({ onBack }: GooglePhotosScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"photos" | "search" | "sharing" | "library">("library")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [photos, setPhotos] = useState<Photo[]>(samplePhotos)
  const [albums, setAlbums] = useState<Album[]>(sampleAlbums)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const filters = ["All", "Your albums", "On device", "Shared albums"]

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const toggleFavorite = (photoId: string) => {
    setPhotos(prev => prev.map(photo => 
      photo.id === photoId ? { ...photo, isFavorite: !photo.isFavorite } : photo
    ))
  }

  return (
    <AppScreen onBack={onBack} variant="dark" hideDefaultHeader={true} allowContentScroll={false} noPadding={true}>
      <div className="flex flex-col relative h-full bg-gray-900" style={{ fontFamily: 'Segoe UI, system-ui, sans-serif' }}>
        
         {/* Header */}
         <div className="flex items-center justify-center p-4 border-b border-gray-800 relative">
           <div className="flex items-center space-x-2">
             <img 
               src="/logo-google.png" 
               alt="Google Logo" 
               className="w-12 h-12 object-contain"
               onError={(e) => {
                 const target = e.target as HTMLImageElement
                 target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' fill='%23ffffff'/%3E%3Ctext x='12' y='16' text-anchor='middle' dy='.3em' fill='%23334155' font-family='system-ui' font-size='12' font-weight='bold'%3EG%3C/text%3E%3C/svg%3E"
               }}
             />
             <h1 className="text-white text-lg font-medium">Photos</h1>
           </div>
           
           <div className="absolute right-4 flex items-center space-x-3">
             <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
               <ShoppingBag size={18} className="text-white" strokeWidth={1.5} />
             </button>
             <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
               <User size={18} className="text-white" strokeWidth={1.5} />
             </button>
           </div>
         </div>

         {/* Action Buttons */}
         <div className="px-4 py-4 border-b border-gray-800">
           <div className="flex items-center space-x-3 overflow-x-auto scrollbar-hide">
             <button className="flex items-center space-x-2 bg-gray-800 text-gray-200 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-700 transition-colors whitespace-nowrap">
               <Plus size={16} strokeWidth={1.5} />
               <span>New album</span>
             </button>
             <button className="flex items-center space-x-2 bg-gray-800 text-gray-200 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-700 transition-colors whitespace-nowrap">
               <Clock size={16} strokeWidth={1.5} />
               <span>Most recent photo</span>
             </button>
             <button 
               onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
               className="w-10 h-10 bg-gray-800 text-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors flex-shrink-0"
             >
               {viewMode === "grid" ? <List size={16} strokeWidth={1.5} /> : <Grid3X3 size={16} strokeWidth={1.5} />}
             </button>
             <button className="w-10 h-10 bg-gray-800 text-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors flex-shrink-0">
               <MoreVertical size={16} strokeWidth={1.5} />
             </button>
           </div>
         </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {activeTab === "library" && (
            <div className="p-4">
              {selectedFilter === "All" ? (
                <div className="space-y-6">
                  {/* Albums Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {albums.map((album, index) => (
                      <motion.div
                        key={album.id}
                        className="bg-gray-800 rounded-lg overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="relative">
                          <img
                            src={album.cover}
                            alt={album.name}
                            className="w-full h-32 object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23374151'/%3E%3Ctext x='200' y='200' text-anchor='middle' dy='.3em' fill='%239ca3af' font-family='system-ui' font-size='24'%3EPhoto%3C/text%3E%3C/svg%3E"
                            }}
                          />
                          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                            {album.count}
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="text-white font-medium text-sm mb-1">{album.name}</h3>
                          <p className="text-gray-400 text-xs">{album.lastModified}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Recent Photos */}
                  <div>
                    <h3 className="text-white font-medium text-lg mb-4">Recent photos</h3>
                    <div className={`grid ${viewMode === "grid" ? "grid-cols-3" : "grid-cols-1"} gap-2`}>
                      {photos.map((photo, index) => (
                        <motion.div
                          key={photo.id}
                          className={`relative group cursor-pointer ${viewMode === "list" ? "flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800" : ""}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className={`relative ${viewMode === "grid" ? "aspect-square" : "w-16 h-16 flex-shrink-0"}`}>
                            <img
                              src={photo.url}
                              alt={photo.title}
                              className="w-full h-full object-cover rounded-lg"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23374151'/%3E%3Ctext x='200' y='200' text-anchor='middle' dy='.3em' fill='%239ca3af' font-family='system-ui' font-size='24'%3EPhoto%3C/text%3E%3C/svg%3E"
                              }}
                            />
                            {photo.isFavorite && (
                              <div className="absolute top-2 left-2">
                                <Heart size={16} className="text-red-500 fill-current" strokeWidth={1.5} />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                              <button 
                                onClick={() => toggleFavorite(photo.id)}
                                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                              >
                                <Heart size={16} className={`${photo.isFavorite ? 'text-red-500 fill-current' : 'text-white'}`} strokeWidth={1.5} />
                              </button>
                              <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                                <Share size={16} className="text-white" strokeWidth={1.5} />
                              </button>
                              <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                                <MoreVertical size={16} className="text-white" strokeWidth={1.5} />
                              </button>
                            </div>
                          </div>
                          {viewMode === "list" && (
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-medium text-sm truncate">{photo.title}</h4>
                              <p className="text-gray-400 text-xs">{photo.date}</p>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Folder size={48} className="text-gray-600 mx-auto mb-4" strokeWidth={1} />
                  <h3 className="text-white font-medium text-lg mb-2">{selectedFilter}</h3>
                  <p className="text-gray-400 text-sm">No items found</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "search" && (
            <div className="p-4 text-center py-12">
              <Search size={48} className="text-gray-600 mx-auto mb-4" strokeWidth={1} />
              <h3 className="text-white font-medium text-lg mb-2">Search your photos</h3>
              <p className="text-gray-400 text-sm">Find photos by people, places, or things</p>
            </div>
          )}

          {activeTab === "sharing" && (
            <div className="p-4 text-center py-12">
              <Share size={48} className="text-gray-600 mx-auto mb-4" strokeWidth={1} />
              <h3 className="text-white font-medium text-lg mb-2">Shared albums</h3>
              <p className="text-gray-400 text-sm">Photos shared with you</p>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800">
          <div className="flex items-center justify-around py-2">
            <button
              onClick={() => setActiveTab("photos")}
              className={`flex flex-col items-center space-y-1 py-2 px-4 ${
                activeTab === "photos" ? "text-blue-500" : "text-gray-400"
              }`}
            >
              <Grid3X3 size={20} className={activeTab === "photos" ? "fill-current" : ""} strokeWidth={1.5} />
              <span className="text-xs font-medium">Photos</span>
            </button>
            
            <button
              onClick={() => setActiveTab("search")}
              className={`flex flex-col items-center space-y-1 py-2 px-4 ${
                activeTab === "search" ? "text-blue-500" : "text-gray-400"
              }`}
            >
              <Search size={20} strokeWidth={1.5} />
              <span className="text-xs font-medium">Search</span>
            </button>
            
            <button
              onClick={() => setActiveTab("sharing")}
              className={`flex flex-col items-center space-y-1 py-2 px-4 ${
                activeTab === "sharing" ? "text-blue-500" : "text-gray-400"
              }`}
            >
              <Share size={20} className={activeTab === "sharing" ? "fill-current" : ""} strokeWidth={1.5} />
              <span className="text-xs font-medium">Sharing</span>
            </button>
            
            <button
              onClick={() => setActiveTab("library")}
              className={`flex flex-col items-center space-y-1 py-2 px-4 ${
                activeTab === "library" ? "text-blue-500" : "text-gray-400"
              }`}
            >
              <Folder size={20} className={activeTab === "library" ? "fill-current" : ""} strokeWidth={1.5} />
              <span className="text-xs font-medium">Library</span>
            </button>
          </div>
        </div>
      </div>
    </AppScreen>
  )
}
