"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Mic, Camera, Bookmark, Share, MoreVertical, ShoppingBag, Languages, Star, DollarSign } from "lucide-react"
import AppScreen from "@/components/app-screen"

interface GoogleScreenProps {
  onBack: () => void
}

interface Article {
  id: string
  title: string
  source: string
  timeAgo: string
  image: string
  category?: string
}

const sampleArticles: Article[] = [
  {
    id: "1",
    title: "Fun and Engaging Toys for Your Toddler in 2023",
    source: "feeds.friendshipblog.com",
    timeAgo: "1d",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=400&fit=crop",
    category: "Parenting"
  },
  {
    id: "2", 
    title: "Latest Tech Trends: AI Revolution in 2024",
    source: "techcrunch.com",
    timeAgo: "2h",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
    category: "Technology"
  },
  {
    id: "3",
    title: "Healthy Recipes for Busy Professionals",
    source: "foodnetwork.com", 
    timeAgo: "4h",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=400&fit=crop",
    category: "Food"
  }
]

export default function GoogleScreen({ onBack }: GoogleScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"discover" | "search" | "saved">("discover")
  const [articles, setArticles] = useState<Article[]>(sampleArticles)
  const [isDarkMode, setIsDarkMode] = useState(true)
  
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('googleAppDarkMode')
    if (savedDarkMode !== null) {
      setIsDarkMode(savedDarkMode === 'true')
    } else {
      localStorage.setItem('googleAppDarkMode', 'true')
    }
  }, [])

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

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newValue = !prev
      localStorage.setItem('googleAppDarkMode', String(newValue))
      return newValue
    })
  }

  return (
    <AppScreen onBack={onBack} variant={isDarkMode ? "dark" : "light"} hideDefaultHeader={true} allowContentScroll={false} noPadding={true}>
      <div className={`flex flex-col relative h-full ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`} style={{ fontFamily: 'Segoe UI, system-ui, sans-serif' }}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex-1">
            <button 
              onClick={toggleDarkMode}
              className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}
            >
              {isDarkMode ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="#F9FAFB" />
                  <path d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20" stroke="#F9FAFB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 21.25C6.89137 21.25 2.75 17.1086 2.75 12H1.25C1.25 17.9371 6.06294 22.75 12 22.75V21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C12.1751 2.75 12.3485 2.75892 12.531 2.79085L12.7553 1.30326C12.5072 1.26109 12.2546 1.25 12 1.25V2.75ZM21.7092 12.2447C21.741 12.4272 21.75 12.6006 21.75 12.7757H23.25C23.25 12.5211 23.2389 12.2685 23.1967 12.0204L21.7092 12.2447Z" fill="#334155" />
                </svg>
              )}
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
              <Star size={18} className={isDarkMode ? "text-gray-300" : "text-gray-600"} strokeWidth={1.5} />
            </button>
            <button className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white text-sm font-medium">U</span>
            </button>
          </div>
        </div>

        {/* Google Logo */}
        <div className="text-center mb-8">
          <div className="w-48 h-16 mx-auto flex items-center justify-center">
            <img 
              src="/logo-google.png" 
              alt="Google Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='192' height='64' viewBox='0 0 192 64'%3E%3Crect width='192' height='64' fill='white'/%3E%3Ctext x='96' y='40' text-anchor='middle' dy='.3em' fill='%23334155' font-family='system-ui' font-size='24'%3EGoogle%3C/text%3E%3C/svg%3E"
              }}
            />
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 mb-6">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search"
              className={`w-full ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} border rounded-full px-6 py-4 pr-24 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm`}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <button className="w-8 h-8 flex items-center justify-center">
                <Mic size={18} className={isDarkMode ? "text-gray-300" : "text-gray-500"} strokeWidth={1.5} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center">
                <Camera size={18} className={isDarkMode ? "text-gray-300" : "text-gray-500"} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 mb-8">
          <div className="flex justify-center space-x-4 max-w-2xl mx-auto">
            <button className={`flex items-center space-x-2 ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-700'} rounded-full px-4 py-3 text-sm font-medium`}>
              <ShoppingBag size={16} strokeWidth={1.5} />
              <span>Shop for products</span>
            </button>
            <button className={`flex items-center space-x-2 ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-700'} rounded-full px-4 py-3 text-sm font-medium`}>
              <Languages size={16} strokeWidth={1.5} />
              <span>Translate text</span>
            </button>
          </div>
        </div>

        {/* Weather Card */}
        <div className="px-4 mb-4">
          <div className="max-w-2xl mx-auto">
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4 flex items-center justify-between shadow-sm`}>
              <div>
                <h3 className={`${isDarkMode ? 'text-gray-100' : 'text-gray-900'} font-medium`}>Mountain View</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Current weather</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">☀️</span>
                <span className={`${isDarkMode ? 'text-gray-100' : 'text-gray-900'} font-medium`}>75°F</span>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Feed */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-20">
          <div className="max-w-2xl mx-auto space-y-4">
            {articles.map((article, index) => (
              <div
                key={article.id}
                className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg overflow-hidden shadow-sm`}
              >
                <div className="relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='${isDarkMode ? '%23374151' : '%23f3f4f6'}'/%3E%3Ctext x='400' y='200' text-anchor='middle' dy='.3em' fill='${isDarkMode ? '%239ca3af' : '%236b7280'}' font-family='system-ui' font-size='24'%3EImage%3C/text%3E%3C/svg%3E`
                    }}
                  />
                  {article.category && (
                    <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                      {article.category}
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className={`${isDarkMode ? 'text-gray-100' : 'text-gray-900'} font-medium text-lg mb-2 line-clamp-2`}>
                    {article.title}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
                      <span className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">b</span>
                      </span>
                      <span>{article.source}</span>
                      <span>•</span>
                      <span>{article.timeAgo}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="w-8 h-8 flex items-center justify-center">
                        <Bookmark size={16} className={isDarkMode ? "text-gray-400" : "text-gray-500"} strokeWidth={1.5} />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center">
                        <Share size={16} className={isDarkMode ? "text-gray-400" : "text-gray-500"} strokeWidth={1.5} />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center">
                        <MoreVertical size={16} className={isDarkMode ? "text-gray-400" : "text-gray-500"} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className={`absolute bottom-0 left-0 right-0 ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-t`}>
          <div className="flex items-center justify-around py-2">
            <button
              onClick={() => setActiveTab("discover")}
              className={`flex flex-col items-center space-y-1 py-2 px-4 ${
                activeTab === "discover" ? "text-blue-500" : isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <Star size={20} className={activeTab === "discover" ? "fill-current" : ""} strokeWidth={1.5} />
              <span className="text-xs font-medium">Discover</span>
            </button>
            
            <button
              onClick={() => setActiveTab("search")}
              className={`flex flex-col items-center space-y-1 py-2 px-4 ${
                activeTab === "search" ? "text-blue-500" : isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <Search size={20} strokeWidth={1.5} />
              <span className="text-xs font-medium">Search</span>
            </button>
            
            <button
              onClick={() => setActiveTab("saved")}
              className={`flex flex-col items-center space-y-1 py-2 px-4 ${
                activeTab === "saved" ? "text-blue-500" : isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <Bookmark size={20} className={activeTab === "saved" ? "fill-current" : ""} strokeWidth={1.5} />
              <span className="text-xs font-medium">Saved</span>
            </button>
          </div>
        </div>
      </div>
    </AppScreen>
  )
}
