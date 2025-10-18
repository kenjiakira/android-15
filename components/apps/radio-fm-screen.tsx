"use client"

import { useState } from "react"
import { Play, Pause, Volume2, VolumeX, Radio, Heart, Share, Settings, MoreVertical, Clock, Star, List } from "lucide-react"
import AppScreen from "@/components/app-screen"

interface RadioFMScreenProps {
  onBack: () => void
}

interface RadioStation {
  id: string
  name: string
  frequency: string
  genre: string
  isPlaying?: boolean
  isFavorite?: boolean
  signal: 'strong' | 'medium' | 'weak'
  currentSong?: string
  artist?: string
}

const radioStations: RadioStation[] = [
  { id: "1", name: "VOV1", frequency: "87.5 FM", genre: "News", isFavorite: true, signal: 'strong', currentSong: "Tin tức buổi sáng", artist: "VOV" },
  { id: "2", name: "VOV3", frequency: "90.0 FM", genre: "Music", isPlaying: true, isFavorite: true, signal: 'strong', currentSong: "Nhạc trẻ Việt Nam", artist: "Various Artists" },
  { id: "3", name: "Radio Hà Nội", frequency: "91.5 FM", genre: "Talk", signal: 'medium', currentSong: "Chương trình sáng", artist: "Radio Hà Nội" },
  { id: "4", name: "FM 99.9", frequency: "99.9 FM", genre: "Pop", isFavorite: true, signal: 'strong', currentSong: "Top Hits 2024", artist: "Various Artists" },
  { id: "5", name: "Classic FM", frequency: "103.7 FM", genre: "Classical", signal: 'medium', currentSong: "Beethoven Symphony", artist: "Vienna Philharmonic" },
  { id: "6", name: "Jazz Station", frequency: "106.2 FM", genre: "Jazz", signal: 'weak', currentSong: "Smooth Jazz", artist: "Jazz Ensemble" },
  { id: "7", name: "Rock FM", frequency: "108.5 FM", genre: "Rock", signal: 'strong', currentSong: "Rock Anthems", artist: "Rock Bands" },
  { id: "8", name: "Country FM", frequency: "95.3 FM", genre: "Country", signal: 'medium', currentSong: "Country Roads", artist: "Country Artists" },
]

const genres = [
  { name: "All", count: "50+" },
  { name: "Music", count: "25+" },
  { name: "News", count: "8+" },
  { name: "Talk", count: "12+" },
  { name: "Classical", count: "5+" },
]

export default function RadioFMScreen({ onBack }: RadioFMScreenProps) {
  const [activeGenre, setActiveGenre] = useState("All")
  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolume] = useState(75)
  const [currentStation, setCurrentStation] = useState(radioStations[1]) // VOV3 is playing
  
  const filteredStations = activeGenre === "All" 
    ? radioStations
    : radioStations.filter(station => station.genre === activeGenre)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleFavorite = (stationId: string) => {
    const station = radioStations.find(s => s.id === stationId)
    if (station) {
      station.isFavorite = !station.isFavorite
    }
  }

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case 'strong':
        return <div className="flex space-x-1">
          <div className="w-1 h-3 bg-green-400 rounded-full"></div>
          <div className="w-1 h-4 bg-green-400 rounded-full"></div>
          <div className="w-1 h-5 bg-green-400 rounded-full"></div>
          <div className="w-1 h-6 bg-green-400 rounded-full"></div>
        </div>
      case 'medium':
        return <div className="flex space-x-1">
          <div className="w-1 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-1 h-4 bg-yellow-400 rounded-full"></div>
          <div className="w-1 h-5 bg-yellow-400 rounded-full"></div>
          <div className="w-1 h-3 bg-gray-600 rounded-full"></div>
        </div>
      case 'weak':
        return <div className="flex space-x-1">
          <div className="w-1 h-3 bg-red-400 rounded-full"></div>
          <div className="w-1 h-4 bg-red-400 rounded-full"></div>
          <div className="w-1 h-3 bg-gray-600 rounded-full"></div>
          <div className="w-1 h-3 bg-gray-600 rounded-full"></div>
        </div>
      default:
        return null
    }
  }

  return (
    <AppScreen onBack={onBack} variant="dark">
      {/* Custom Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg flex items-center justify-center">
            <Radio size={18} className="text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-white text-lg font-medium">Radio FM</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
            <List size={18} className="text-white" strokeWidth={1.5} />
          </button>
          <MoreVertical className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Current Playing Station */}
      <div className="mb-8 p-6 bg-gradient-to-r from-amber-500/10 to-amber-600/10 backdrop-blur-sm rounded-xl border border-amber-500/20">
        <div className="text-center">
          {/* Station Info */}
          <div className="mb-4">
            <h2 className="text-white text-xl font-bold mb-1">{currentStation.name}</h2>
            <p className="text-amber-400 text-lg font-medium">{currentStation.frequency}</p>
            <p className="text-gray-400 text-sm">{currentStation.genre}</p>
          </div>

          {/* Current Song */}
          <div className="mb-6">
            <p className="text-white text-base font-medium mb-1">{currentStation.currentSong}</p>
            <p className="text-gray-400 text-sm">{currentStation.artist}</p>
          </div>

          {/* Signal Strength */}
          <div className="flex items-center justify-center space-x-3 mb-6">
            <span className="text-gray-400 text-sm">Signal:</span>
            {getSignalIcon(currentStation.signal)}
          </div>

          {/* Main Controls */}
          <div className="flex items-center justify-center space-x-6">
            <button className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
              <Heart size={20} className="text-red-400" strokeWidth={1.5} />
            </button>
            
            <button
              onClick={togglePlay}
              className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center hover:bg-amber-600 transition-all hover:scale-105"
            >
              {isPlaying ? (
                <Pause size={24} className="text-white" strokeWidth={1.5} />
              ) : (
                <Play size={24} className="text-white ml-1" strokeWidth={1.5} />
              )}
            </button>
            
            <button className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
              <Share size={20} className="text-white" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Volume Control */}
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <Volume2 size={20} className="text-gray-400" />
          <div className="flex-1 bg-gray-800 rounded-full h-2">
            <div 
              className="bg-amber-500 h-2 rounded-full transition-all"
              style={{ width: `${volume}%` }}
            ></div>
          </div>
          <span className="text-white text-sm font-medium w-12 text-right">{volume}%</span>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {genres.map((genre) => (
            <button
              key={genre.name}
              onClick={() => setActiveGenre(genre.name)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm font-medium ${
                activeGenre === genre.name
                  ? "bg-amber-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              {genre.name} ({genre.count})
            </button>
          ))}
        </div>
      </div>

      {/* Stations List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-lg font-medium">Radio Stations</h2>
          <button className="text-amber-400 text-sm font-medium">Scan</button>
        </div>

        <div className="space-y-3">
          {filteredStations.map((station) => (
            <div
              key={station.id}
              className={`flex items-center space-x-4 p-4 backdrop-blur-sm rounded-lg border transition-all ${
                station.isPlaying 
                  ? "bg-gradient-to-r from-amber-500/20 to-amber-600/20 border-amber-500/30" 
                  : "bg-gray-800/40 border-gray-700/50 hover:bg-gray-800/60"
              }`}
            >
              {/* Station Icon */}
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
                  <Radio size={20} className="text-white" strokeWidth={1.5} />
                </div>
                {station.isPlaying && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>

              {/* Station Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-white font-medium truncate">{station.name}</h3>
                  {station.isFavorite && (
                    <Heart size={14} className="text-red-400 fill-current flex-shrink-0" />
                  )}
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-400">
                  <span className="text-amber-400 font-medium">{station.frequency}</span>
                  <span>•</span>
                  <span>{station.genre}</span>
                  {station.currentSong && (
                    <>
                      <span>•</span>
                      <span className="truncate">{station.currentSong}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Signal & Controls */}
              <div className="flex items-center space-x-3 flex-shrink-0">
                <div className="flex items-center space-x-2">
                  {getSignalIcon(station.signal)}
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => toggleFavorite(station.id)}
                    className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
                  >
                    <Heart 
                      size={14} 
                      className={`${station.isFavorite ? 'text-red-400 fill-current' : 'text-white'}`} 
                      strokeWidth={1.5} 
                    />
                  </button>
                  
                  <button 
                    onClick={() => setCurrentStation(station)}
                    className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center hover:bg-amber-600 transition-colors"
                  >
                    <Play size={14} className="text-white" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 bg-gray-800/40 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:bg-gray-800/60 transition-all">
            <Heart size={20} className="text-red-400" strokeWidth={1.5} />
            <span className="text-white font-medium">Favorites</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-4 bg-gray-800/40 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:bg-gray-800/60 transition-all">
            <Settings size={20} className="text-amber-400" strokeWidth={1.5} />
            <span className="text-white font-medium">Settings</span>
          </button>
        </div>
      </div>
    </AppScreen>
  )
}
