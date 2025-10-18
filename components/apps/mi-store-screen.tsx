"use client"

import { useState } from "react"
import { Search, Star, Download, Heart, Filter, MoreVertical, ShoppingBag, Gift, Award, Zap, Grid } from "lucide-react"
import AppScreen from "@/components/app-screen"

interface MiStoreScreenProps {
  onBack: () => void
}

interface App {
  id: string
  name: string
  developer: string
  rating: number
  downloads: string
  price: string
  category: string
  icon: string
  isFeatured?: boolean
  isOnSale?: boolean
}

const featuredApps: App[] = [
  { id: "1", name: "Mi Fitness", developer: "Xiaomi Inc.", rating: 4.8, downloads: "10M+", price: "Free", category: "Health", icon: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop", isFeatured: true },
  { id: "2", name: "Mi Music", developer: "Xiaomi Inc.", rating: 4.6, downloads: "5M+", price: "Free", category: "Music", icon: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop", isFeatured: true },
  { id: "3", name: "Mi Security", developer: "Xiaomi Inc.", rating: 4.7, downloads: "50M+", price: "Free", category: "Security", icon: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=400&fit=crop", isFeatured: true },
]

const popularApps: App[] = [
  { id: "4", name: "Mi Browser", developer: "Xiaomi Inc.", rating: 4.5, downloads: "100M+", price: "Free", category: "Browser", icon: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop" },
  { id: "5", name: "Mi File Manager", developer: "Xiaomi Inc.", rating: 4.4, downloads: "80M+", price: "Free", category: "Tools", icon: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop" },
  { id: "6", name: "Mi Remote", developer: "Xiaomi Inc.", rating: 4.3, downloads: "30M+", price: "Free", category: "Tools", icon: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=400&fit=crop" },
  { id: "7", name: "Mi Calculator", developer: "Xiaomi Inc.", rating: 4.6, downloads: "200M+", price: "Free", category: "Tools", icon: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=400&fit=crop" },
  { id: "8", name: "Mi Weather", developer: "Xiaomi Inc.", rating: 4.2, downloads: "60M+", price: "Free", category: "Weather", icon: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=400&fit=crop" },
]

const categories = [
  { name: "All", icon: Grid, count: "500+" },
  { name: "Games", icon: Zap, count: "120+" },
  { name: "Social", icon: Heart, count: "50+" },
  { name: "Tools", icon: Award, count: "80+" },
  { name: "Health", icon: Star, count: "30+" },
]

export default function MiStoreScreen({ onBack }: MiStoreScreenProps) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  
  const filteredApps = activeCategory === "All" 
    ? [...featuredApps, ...popularApps]
    : [...featuredApps, ...popularApps].filter(app => app.category === activeCategory)

  const displayApps = filteredApps.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.developer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <AppScreen onBack={onBack} variant="dark">
      {/* Custom Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg flex items-center justify-center">
            <ShoppingBag size={18} className="text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-white text-lg font-medium">Mi Store</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
            <Gift size={18} className="text-white" strokeWidth={1.5} />
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
          placeholder="Search apps..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-3 border-0 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Categories */}
      <div className="mb-6">
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  activeCategory === category.name
                    ? "bg-orange-500 text-white"
                    : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                <IconComponent size={16} className="stroke-current" />
                <span className="text-sm font-medium">{category.name}</span>
                <span className="text-xs opacity-75">({category.count})</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Featured Section */}
      {activeCategory === "All" && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-lg font-medium">Featured Apps</h2>
            <button className="text-orange-400 text-sm font-medium">See All</button>
          </div>
          <div className="space-y-3">
            {featuredApps.map((app) => (
              <div
                key={app.id}
                className="flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-500/10 to-orange-600/10 backdrop-blur-sm rounded-xl border border-orange-500/20 hover:from-orange-500/20 hover:to-orange-600/20 transition-all"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center overflow-hidden">
                    <img
                      src={app.icon}
                      alt={app.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23374151'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%23f3f4f6' font-family='system-ui' font-size='12'%3EApp%3C/text%3E%3C/svg%3E"
                      }}
                    />
                  </div>
                  {app.isFeatured && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                      <Star size={12} className="text-white fill-current" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-white font-medium truncate">{app.name}</h3>
                    {app.isOnSale && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Sale</span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm truncate">{app.developer}</p>
                  <div className="flex items-center space-x-3 mt-1">
                    <div className="flex items-center space-x-1">
                      <Star size={12} className="text-yellow-400 fill-current" />
                      <span className="text-gray-300 text-xs">{app.rating}</span>
                    </div>
                    <span className="text-gray-400 text-xs">•</span>
                    <span className="text-gray-400 text-xs">{app.downloads}</span>
                    <span className="text-gray-400 text-xs">•</span>
                    <span className="text-gray-400 text-xs">{app.category}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <span className="text-white font-medium">{app.price}</span>
                  <button className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                    <Download size={14} className="text-white" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Apps List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-lg font-medium">
            {activeCategory === "All" ? "Popular Apps" : activeCategory}
          </h2>
          {activeCategory !== "All" && (
            <button className="text-orange-400 text-sm font-medium">See All</button>
          )}
        </div>

        {displayApps.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-400">No apps found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayApps.map((app) => (
              <div
                key={app.id}
                className="flex items-center space-x-4 p-4 bg-gray-800/40 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:bg-gray-800/60 transition-all"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center overflow-hidden">
                    <img
                      src={app.icon}
                      alt={app.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23374151'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%23f3f4f6' font-family='system-ui' font-size='12'%3EApp%3C/text%3E%3C/svg%3E"
                      }}
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium truncate">{app.name}</h3>
                  <p className="text-gray-400 text-sm truncate">{app.developer}</p>
                  <div className="flex items-center space-x-3 mt-1">
                    <div className="flex items-center space-x-1">
                      <Star size={12} className="text-yellow-400 fill-current" />
                      <span className="text-gray-300 text-xs">{app.rating}</span>
                    </div>
                    <span className="text-gray-400 text-xs">•</span>
                    <span className="text-gray-400 text-xs">{app.downloads}</span>
                    <span className="text-gray-400 text-xs">•</span>
                    <span className="text-gray-400 text-xs">{app.category}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
                    <Heart size={14} className="text-white" strokeWidth={1.5} />
                  </button>
                  <div className="flex flex-col items-end">
                    <span className="text-white font-medium text-sm">{app.price}</span>
                    <button className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                      <Download size={14} className="text-white" strokeWidth={1.5} />
                    </button>
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
            <Download size={20} className="text-orange-400" strokeWidth={1.5} />
            <span className="text-white font-medium">My Downloads</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-4 bg-gray-800/40 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:bg-gray-800/60 transition-all">
            <Heart size={20} className="text-red-400" strokeWidth={1.5} />
            <span className="text-white font-medium">Wishlist</span>
          </button>
        </div>
      </div>
    </AppScreen>
  )
}
