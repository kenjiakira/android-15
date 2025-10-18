"use client"

import { useState, useEffect, useRef } from "react"
import { Search, MapPin, Navigation, Layers, Menu, ChevronLeft, Compass } from "lucide-react"
import AppScreen from "@/components/app-screen"

interface GoogleMapsScreenProps {
  onBack: () => void
}

interface Place {
  id: string
  name: string
  type: string
  icon: string
  lat: number
  lng: number
}

const categoryButtons = [
  { id: "restaurants", label: "Restaurants", icon: "🍽️" },
  { id: "gas", label: "Gas", icon: "⛽" },
  { id: "groceries", label: "Groceries", icon: "🛒" },
  { id: "coffee", label: "Coffee", icon: "☕" }
]


export default function GoogleMapsScreen({ onBack }: GoogleMapsScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([])
  const [currentLocation, setCurrentLocation] = useState({ lat: 40.7580, lng: -73.9855 })
  
  // Load dark mode preference from localStorage on component mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('googleMapsAppDarkMode')
    if (savedDarkMode !== null) {
      setIsDarkMode(savedDarkMode === 'true')
    } else {
      // Set dark mode as default
      localStorage.setItem('googleMapsAppDarkMode', 'true')
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newValue = !prev
      localStorage.setItem('googleMapsAppDarkMode', String(newValue))
      return newValue
    })
  }

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredPlaces([])
      return
    }

    const mockResults: Place[] = []
    setFilteredPlaces(mockResults)
  }

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(prevCategory => prevCategory === categoryId ? null : categoryId)
    
    if (categoryId === selectedCategory) {
      setFilteredPlaces([])
      return
    }

    const mockResults: Place[] = []
    setFilteredPlaces(mockResults)
  }

  return (
    <AppScreen onBack={onBack} variant={isDarkMode ? "dark" : "light"} hideDefaultHeader={true} allowContentScroll={false} fullScreen={true}>
      <div className={`w-full h-full relative ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {/* Map Container - Using a simple background instead of Google Maps */}
        <div className="absolute inset-0 w-full h-full z-0">
          <div className={`w-full h-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-center`}>
            <div className="text-center">
              <MapPin size={64} className={`mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <h3 className={`text-lg font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Interactive Map
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                Manhattan, New York
              </p>
            </div>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className={`flex items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-full shadow-lg`}>
            <button 
              onClick={onBack}
              className={`p-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex-1 flex items-center">
              <div className={`flex items-center px-4 py-2 rounded-full flex-1`}>
                <Search size={20} className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
                <input 
                  type="text" 
                  placeholder="Try gas stations, ATMs" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className={`ml-2 flex-1 bg-transparent border-none focus:outline-none ${isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
                />
              </div>
            </div>
            <button 
              onClick={toggleDarkMode}
              className={`p-3 rounded-full overflow-hidden ${isDarkMode ? 'bg-indigo-600' : 'bg-indigo-100'}`}
            >
              <span className="font-bold text-sm">
                {isDarkMode ? "E" : "E"}
              </span>
            </button>
          </div>
        </div>

        {/* Category Buttons */}
        <div className="absolute top-20 left-4 right-4 z-10">
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2">
            {categoryButtons.map(button => (
              <button
                key={button.id}
                onClick={() => handleCategorySelect(button.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === button.id
                    ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
                    : isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'
                } ${isDarkMode ? 'border border-gray-700' : 'border border-gray-200'}`}
              >
                <span>{button.icon}</span>
                <span>{button.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Places List */}
        {filteredPlaces.length > 0 && (
          <div className="absolute top-32 left-4 right-4 z-10 max-h-64 overflow-y-auto">
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`}>
              {filteredPlaces.map(place => (
                <div 
                  key={place.id}
                  className={`flex items-center p-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} last:border-b-0`}
                >
                  <div className="text-2xl mr-3">{place.icon}</div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {place.name}
                    </h4>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {place.type}
                    </p>
                  </div>
                  <button className={`p-2 rounded-full ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Navigation size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className={`absolute bottom-0 left-0 right-0 z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-around py-3">
            <button className={`flex flex-col items-center ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              <MapPin size={20} />
              <span className="text-xs mt-1">Explore</span>
            </button>
            <button className={`flex flex-col items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Navigation size={20} />
              <span className="text-xs mt-1">Commute</span>
            </button>
            <button className={`flex flex-col items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Bookmark size={20} />
              <span className="text-xs mt-1">Saved</span>
            </button>
            <button className={`flex flex-col items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Layers size={20} />
              <span className="text-xs mt-1">Contribute</span>
            </button>
            <button className={`flex flex-col items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Bell size={20} />
              <span className="text-xs mt-1">Updates</span>
            </button>
          </div>
        </div>

        {/* Current Location Button */}
        <div className="absolute bottom-24 right-4 z-10">
          <button 
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
              isDarkMode ? 'bg-gray-800 text-blue-400' : 'bg-white text-blue-600'
            }`}
          >
            <Compass size={24} />
          </button>
        </div>

        {/* Go Button */}
        <div className="absolute bottom-24 right-20 z-10">
          <button 
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
              isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
            }`}
          >
            <div className="flex flex-col items-center">
              <Navigation size={24} />
              <span className="text-xs font-bold mt-1">GO</span>
            </div>
          </button>
        </div>
      </div>
    </AppScreen>
  )
}

// Missing icons
const Bookmark = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
  </svg>
)

const Bell = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
  </svg>
)
    