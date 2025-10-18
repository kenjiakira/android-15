"use client"

import { useState, useEffect } from "react"
import { 
  Search, 
  Menu, 
  Bell, 
  Mic, 
  Play, 
  Clock, 
  ThumbsUp, 
  User,
  ThumbsDown, 
  Share, 
  MoreVertical,
  Home,
  TrendingUp,
  Library,
  History,
  ChevronLeft,
  ChevronRight

} from "lucide-react"
import AppScreen from "@/components/app-screen"

interface YouTubeScreenProps {
  onBack: () => void
}

interface Video {
  id: string
  title: string
  channel: string
  views: string
  timeAgo: string
  duration: string
  thumbnail: string
  avatar: string
  isLive?: boolean
}

const categories = [
  "All", "Music", "Gaming", "News", "Sports", "Entertainment", "Education", "Science"
]

const sampleVideos: Video[] = [
  {
    id: "1",
    title: "How to Build a Modern React App with TypeScript",
    channel: "Tech Tutorials",
    views: "1.2M views",
    timeAgo: "2 days ago",
    duration: "15:30",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
  },
  {
    id: "2",
    title: "Amazing Nature Documentary - Wildlife in 4K",
    channel: "Nature Channel",
    views: "856K views",
    timeAgo: "1 week ago",
    duration: "42:15",
    thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=225&fit=crop",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop"
  },
  {
    id: "3",
    title: "LIVE: Breaking News - Technology Updates",
    channel: "Tech News",
    views: "2.1K watching",
    timeAgo: "Live",
    duration: "LIVE",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=225&fit=crop",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
    isLive: true
  },
  {
    id: "4",
    title: "Cooking Masterclass: Italian Pasta Recipes",
    channel: "Chef's Kitchen",
    views: "324K views",
    timeAgo: "3 days ago",
    duration: "28:45",
    thumbnail: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=225&fit=crop",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
  },
  {
    id: "5",
    title: "Gaming: Epic Battle Royale Highlights",
    channel: "Gaming Pro",
    views: "1.8M views",
    timeAgo: "5 days ago",
    duration: "12:20",
    thumbnail: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=225&fit=crop",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop"
  },
  {
    id: "6",
    title: "Music: Best of 2024 - Top Hits Compilation",
    channel: "Music World",
    views: "5.2M views",
    timeAgo: "1 month ago",
    duration: "1:25:30",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop"
  },
  {
    id: "7",
    title: "Space Exploration: Journey to Mars",
    channel: "Space Science",
    views: "2.3M views",
    timeAgo: "1 week ago",
    duration: "35:20",
    thumbnail: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=225&fit=crop",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
  },
  {
    id: "8",
    title: "Fitness Workout: 30-Minute HIIT Session",
    channel: "FitLife",
    views: "892K views",
    timeAgo: "4 days ago",
    duration: "30:00",
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop",
    avatar: "https://images.unsplash.com/photo-1594824388854-9e0a4a0b0b0b?w=200&h=200&fit=crop"
  },
  {
    id: "9",
    title: "Travel Vlog: Exploring Tokyo Streets",
    channel: "Wanderlust",
    views: "1.5M views",
    timeAgo: "2 weeks ago",
    duration: "18:45",
    thumbnail: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=225&fit=crop",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop"
  },
  {
    id: "10",
    title: "LIVE: Stock Market Analysis - Daily Updates",
    channel: "Finance Today",
    views: "3.2K watching",
    timeAgo: "Live",
    duration: "LIVE",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=225&fit=crop",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    isLive: true
  },
  {
    id: "11",
    title: "Art Tutorial: Digital Painting Techniques",
    channel: "Creative Studio",
    views: "456K views",
    timeAgo: "1 week ago",
    duration: "25:30",
    thumbnail: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=225&fit=crop",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop"
  },
  {
    id: "12",
    title: "Car Review: 2024 Electric Vehicle Comparison",
    channel: "Auto Expert",
    views: "1.1M views",
    timeAgo: "3 days ago",
    duration: "22:15",
    thumbnail: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=225&fit=crop",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
  },
  {
    id: "13",
    title: "Photography Tips: Mastering Natural Light",
    channel: "Photo Pro",
    views: "678K views",
    timeAgo: "5 days ago",
    duration: "16:40",
    thumbnail: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=225&fit=crop",
    avatar: "https://images.unsplash.com/photo-1594824388854-9e0a4a0b0b0b?w=200&h=200&fit=crop"
  },
  {
    id: "14",
    title: "LIVE: Gaming Tournament - Championship Finals",
    channel: "Esports Central",
    views: "15.2K watching",
    timeAgo: "Live",
    duration: "LIVE",
    thumbnail: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=225&fit=crop",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    isLive: true
  },
  {
    id: "15",
    title: "DIY Home Improvement: Kitchen Renovation",
    channel: "Home DIY",
    views: "934K views",
    timeAgo: "1 week ago",
    duration: "45:20",
    thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=225&fit=crop",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
  },
  {
    id: "16",
    title: "Science Experiment: Amazing Chemical Reactions",
    channel: "Science Lab",
    views: "2.1M views",
    timeAgo: "2 weeks ago",
    duration: "12:30",
    thumbnail: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=225&fit=crop",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
  },
  {
    id: "17",
    title: "Fashion Haul: Summer Collection 2024",
    channel: "Style Guide",
    views: "567K views",
    timeAgo: "4 days ago",
    duration: "20:15",
    thumbnail: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=225&fit=crop",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop"
  },
  {
    id: "18",
    title: "LIVE: Weather Forecast - Storm Tracking",
    channel: "Weather Center",
    views: "8.5K watching",
    timeAgo: "Live",
    duration: "LIVE",
    thumbnail: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=225&fit=crop",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
    isLive: true
  },
  {
    id: "19",
    title: "Language Learning: Spanish for Beginners",
    channel: "Lingua Academy",
    views: "1.3M views",
    timeAgo: "1 week ago",
    duration: "38:45",
    thumbnail: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=225&fit=crop",
    avatar: "https://images.unsplash.com/photo-1594824388854-9e0a4a0b0b0b?w=200&h=200&fit=crop"
  },
  {
    id: "20",
    title: "Pet Care: Training Your New Puppy",
    channel: "Pet World",
    views: "789K views",
    timeAgo: "3 days ago",
    duration: "24:30",
    thumbnail: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=225&fit=crop",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop"
  }
]

export default function YouTubeScreen({ onBack }: YouTubeScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [activeCategory, setActiveCategory] = useState("All")
  const [videos, setVideos] = useState<Video[]>(sampleVideos)
  
  // Load dark mode preference from localStorage on component mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('youtubeAppDarkMode')
    if (savedDarkMode !== null) {
      setIsDarkMode(savedDarkMode === 'true')
    } else {
      // Set dark mode as default
      localStorage.setItem('youtubeAppDarkMode', 'true')
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newValue = !prev
      localStorage.setItem('youtubeAppDarkMode', String(newValue))
      return newValue
    })
  }

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setVideos(sampleVideos)
      return
    }

    // Simulate search
    const filtered = sampleVideos.filter(video => 
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.channel.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setVideos(filtered)
  }

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category)
    // Simulate category filtering
    if (category === "All") {
      setVideos(sampleVideos)
    } else {
      // Filter by category (simplified)
      setVideos(sampleVideos.filter(video => 
        video.title.toLowerCase().includes(category.toLowerCase()) ||
        video.channel.toLowerCase().includes(category.toLowerCase())
      ))
    }
  }

  return (
    <AppScreen onBack={onBack} variant={isDarkMode ? "dark" : "light"} hideDefaultHeader={true} allowContentScroll={false} noPadding={true}>
      <div className={`flex flex-col h-full ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {/* Header */}
        <div className={`px-4 py-3 flex items-center justify-between ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex items-center">
            <div className="ml-2 flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-red-600' : 'bg-red-500'}`}>
                <Play size={16} className="text-white" fill="white" />
              </div>
              <span className={`ml-2 text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>YouTube</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <Bell size={20} className={isDarkMode ? "text-gray-300" : "text-gray-700"} />
            </button>
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
            >
              <Search size={20} className={isDarkMode ? "text-gray-300" : "text-gray-700"} />
            </button>
          </div>
        </div>
        {/* Categories */}
        <div className={`px-4 py-3 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  activeCategory === category
                    ? isDarkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'
                    : isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-20">
          <div className="grid grid-cols-1 gap-4">
            {videos.map(video => (
              <div key={video.id} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg overflow-hidden`}>
                 {/* Thumbnail */}
                 <div className="relative">
                   <img 
                     src={video.thumbnail}
                     alt={video.title}
                     className="w-full h-48 object-cover"
                     onError={(e) => {
                       const target = e.target as HTMLImageElement
                       target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='${isDarkMode ? '%23374151' : '%23e5e7eb'}'/%3E%3Ctext x='200' y='112' text-anchor='middle' dy='.3em' fill='${isDarkMode ? '%239ca3af' : '%236b7280'}' font-family='system-ui' font-size='16'%3EThumbnail%3C/text%3E%3C/svg%3E`
                     }}
                   />
                   <div className="absolute inset-0 flex items-center justify-center">
                     <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-black/50' : 'bg-white/50'} backdrop-blur-sm`}>
                       <Play size={20} className="text-white" fill="white" />
                     </div>
                   </div>
                  
                  {/* Duration */}
                  <div className="absolute bottom-2 right-2">
                    <div className={`px-2 py-1 rounded ${isDarkMode ? 'bg-black/80' : 'bg-black/80'}`}>
                      <span className="text-xs text-white">{video.duration}</span>
                    </div>
                  </div>
                  
                  {/* Live Badge */}
                  {video.isLive && (
                    <div className="absolute top-2 left-2">
                      <div className="bg-red-600 px-2 py-1 rounded flex items-center space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-xs text-white font-medium">LIVE</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Video Info */}
                <div className="p-3">
                  <div className="flex space-x-3">
                     {/* Channel Avatar */}
                     <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                       <img 
                         src={video.avatar}
                         alt={video.channel}
                         className="w-full h-full object-cover"
                         onError={(e) => {
                           const target = e.target as HTMLImageElement
                           target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='${isDarkMode ? '%234b5563' : '%23d1d5db'}'/%3E%3Ctext x='100' y='100' text-anchor='middle' dy='.3em' fill='${isDarkMode ? '%23ffffff' : '%23374151'}' font-family='system-ui' font-size='24'%3E${video.channel.charAt(0)}%3C/text%3E%3C/svg%3E`
                         }}
                       />
                     </div>
                    
                    {/* Video Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-medium text-sm line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {video.title}
                      </h3>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                        {video.channel}
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {video.views} • {video.timeAgo}
                      </p>
                    </div>
                    
                    {/* More Options */}
                    <button className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                      <MoreVertical size={16} className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className={`absolute bottom-0 left-0 right-0 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex items-center justify-around py-2">
            <button className={`flex flex-col items-center py-2 ${isDarkMode ? 'text-white' : 'text-red-600'}`}>
              <Home size={20} />
              <span className="text-xs mt-1">Home</span>
            </button>
            <button className={`flex flex-col items-center py-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <TrendingUp size={20} />
              <span className="text-xs mt-1">Trending</span>
            </button>
            <button className={`flex flex-col items-center py-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <User size={20} />
              <span className="text-xs mt-1">Subscriptions</span>
            </button>
            <button className={`flex flex-col items-center py-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Library size={20} />
              <span className="text-xs mt-1">Library</span>
            </button>
          </div>
        </div>
      </div>
    </AppScreen>
  )
}
