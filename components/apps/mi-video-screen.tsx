"use client"

import { useState } from "react"
import { Search, Play, Pause, Volume2, Settings, MoreVertical, Heart, Share, Download, Clock, Star, Filter } from "lucide-react"
import AppScreen from "@/components/app-screen"

interface MiVideoScreenProps {
  onBack: () => void
}

interface Video {
  id: string
  title: string
  duration: string
  views: string
  uploadDate: string
  thumbnail: string
  isNew?: boolean
  isTrending?: boolean
  category: string
}

const featuredVideos: Video[] = [
  { id: "1", title: "Xiaomi 14 Ultra Camera Test", duration: "12:34", views: "2.5M", uploadDate: "2 days ago", thumbnail: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&h=450&fit=crop", isNew: true, category: "Tech" },
  { id: "2", title: "Mi Home Setup Guide 2024", duration: "8:45", views: "1.8M", uploadDate: "1 week ago", thumbnail: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=450&fit=crop", isTrending: true, category: "Tutorial" },
  { id: "3", title: "MIUI 15 New Features", duration: "15:22", views: "3.2M", uploadDate: "3 days ago", thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop", isNew: true, category: "Software" },
]

const recentVideos: Video[] = [
  { id: "4", title: "Xiaomi Smart Home Tour", duration: "6:30", views: "890K", uploadDate: "1 day ago", thumbnail: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=450&fit=crop", category: "Lifestyle" },
  { id: "5", title: "Mi Band 8 Review", duration: "10:15", views: "1.2M", uploadDate: "4 days ago", thumbnail: "https://images.unsplash.com/photo-1579586337278-3fd5d2b4c5e6?w=800&h=450&fit=crop", category: "Review" },
  { id: "6", title: "Gaming Performance Test", duration: "9:45", views: "756K", uploadDate: "5 days ago", thumbnail: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=450&fit=crop", category: "Gaming" },
  { id: "7", title: "Battery Life Comparison", duration: "7:20", views: "1.1M", uploadDate: "1 week ago", thumbnail: "https://images.unsplash.com/photo-1609592809230-5b0d4b6b3b3b?w=800&h=450&fit=crop", category: "Tech" },
]

const categories = [
  { name: "All", count: "500+" },
  { name: "Tech", count: "120+" },
  { name: "Gaming", count: "80+" },
  { name: "Tutorial", count: "90+" },
  { name: "Review", count: "60+" },
  { name: "Lifestyle", count: "40+" },
]

export default function MiVideoScreen({ onBack }: MiVideoScreenProps) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)
  
  const filteredVideos = activeCategory === "All" 
    ? [...featuredVideos, ...recentVideos]
    : [...featuredVideos, ...recentVideos].filter(video => video.category === activeCategory)

  const displayVideos = filteredVideos.filter(video => 
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const togglePlay = (videoId: string) => {
    setPlayingVideo(playingVideo === videoId ? null : videoId)
  }

  return (
    <AppScreen onBack={onBack} variant="dark">
      {/* Custom Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
            <Play size={18} className="text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-white text-lg font-medium">Mi Video</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
            <Download size={18} className="text-white" strokeWidth={1.5} />
          </button>
          <MoreVertical className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-3 border-0 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Categories */}
      <div className="mb-6">
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm font-medium ${
                activeCategory === category.name
                  ? "bg-red-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Featured Section */}
      {activeCategory === "All" && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-lg font-medium">Featured Videos</h2>
            <button className="text-red-400 text-sm font-medium">See All</button>
          </div>
          <div className="space-y-4">
            {featuredVideos.map((video) => (
              <div
                key={video.id}
                className="relative bg-gradient-to-r from-red-500/10 to-red-600/10 backdrop-blur-sm rounded-xl border border-red-500/20 overflow-hidden hover:from-red-500/20 hover:to-red-600/20 transition-all"
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video bg-gray-800 rounded-t-xl overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%23374151'/%3E%3Ctext x='400' y='225' text-anchor='middle' dy='.3em' fill='%23f3f4f6' font-family='system-ui' font-size='24'%3EVideo%3C/text%3E%3C/svg%3E"
                    }}
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => togglePlay(video.id)}
                      className="w-16 h-16 bg-red-500/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-500 transition-all hover:scale-110"
                    >
                      {playingVideo === video.id ? (
                        <Pause size={24} className="text-white" strokeWidth={1.5} />
                      ) : (
                        <Play size={24} className="text-white ml-1" strokeWidth={1.5} />
                      )}
                    </button>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm rounded px-2 py-1">
                    <span className="text-white text-xs font-medium">{video.duration}</span>
                  </div>

                  {/* Status Badges */}
                  <div className="absolute top-2 left-2 flex space-x-2">
                    {video.isNew && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">New</span>
                    )}
                    {video.isTrending && (
                      <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">Trending</span>
                    )}
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-4">
                  <h3 className="text-white font-medium text-base mb-2 line-clamp-2">{video.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-4">
                      <span>{video.views} views</span>
                      <span>•</span>
                      <span>{video.uploadDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
                        <Heart size={14} className="text-white" strokeWidth={1.5} />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
                        <Share size={14} className="text-white" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Videos List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-lg font-medium">
            {activeCategory === "All" ? "Recent Videos" : activeCategory}
          </h2>
          {activeCategory !== "All" && (
            <button className="text-red-400 text-sm font-medium">See All</button>
          )}
        </div>

        {displayVideos.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-400">No videos found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayVideos.map((video) => (
              <div
                key={video.id}
                className="flex items-start space-x-4 p-4 bg-gray-800/40 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:bg-gray-800/60 transition-all"
              >
                {/* Thumbnail */}
                <div className="relative w-32 h-20 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' fill='%23374151'/%3E%3Ctext x='160' y='90' text-anchor='middle' dy='.3em' fill='%23f3f4f6' font-family='system-ui' font-size='12'%3EVideo%3C/text%3E%3C/svg%3E"
                    }}
                  />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => togglePlay(video.id)}
                      className="w-8 h-8 bg-red-500/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-500 transition-all"
                    >
                      {playingVideo === video.id ? (
                        <Pause size={12} className="text-white" strokeWidth={1.5} />
                      ) : (
                        <Play size={12} className="text-white ml-0.5" strokeWidth={1.5} />
                      )}
                    </button>
                  </div>

                  {/* Duration */}
                  <div className="absolute bottom-1 right-1 bg-black/80 backdrop-blur-sm rounded px-1 py-0.5">
                    <span className="text-white text-xs">{video.duration}</span>
                  </div>
                </div>

                {/* Video Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium text-sm mb-2 line-clamp-2">{video.title}</h3>
                  <div className="flex items-center space-x-3 text-xs text-gray-400 mb-2">
                    <span>{video.views} views</span>
                    <span>•</span>
                    <span>{video.uploadDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-red-400 text-xs font-medium">{video.category}</span>
                    <div className="flex items-center space-x-2">
                      <button className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
                        <Heart size={12} className="text-white" strokeWidth={1.5} />
                      </button>
                      <button className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
                        <Share size={12} className="text-white" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 bg-gray-800/40 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:bg-gray-800/60 transition-all">
            <Clock size={20} className="text-red-400" strokeWidth={1.5} />
            <span className="text-white font-medium">Watch Later</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-4 bg-gray-800/40 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:bg-gray-800/60 transition-all">
            <Heart size={20} className="text-red-400" strokeWidth={1.5} />
            <span className="text-white font-medium">Liked Videos</span>
          </button>
        </div>
      </div>
    </AppScreen>
  )
}
