"use client"

import { useState, useEffect } from "react"
import AppScreen from "@/components/app-screen"
import { Game, GameCategory } from "@/lib/game-center-types"
import { useTheme } from "next-themes"

const sampleGames: Game[] = [
  // Featured games
  {
    id: "tripeaks-solitaire",
    name: "Tripeaks Solitaire",
    image: "/placeholder.jpg",
    rating: 4.8,
    category: "card",
    featured: true
  },
  {
    id: "rainbow-cubes",
    name: "Rainbow Cubes",
    image: "/placeholder.jpg", 
    rating: 4.2,
    category: "puzzle",
    featured: true
  },
  {
    id: "train-2048",
    name: "Train 2048",
    image: "/placeholder.jpg",
    rating: 4.1,
    category: "puzzle",
    featured: true
  },
  // Sports games
  {
    id: "penalty-shootout",
    name: "Penalty Shootout",
    image: "/placeholder.jpg",
    rating: 4.0,
    category: "sports"
  },
  {
    id: "billiards-classic",
    name: "Billiards Classic",
    image: "/placeholder.jpg",
    rating: 4.3,
    category: "sports"
  },
  // Recommended games
  {
    id: "merge-card",
    name: "Merge Card",
    image: "/placeholder.jpg",
    rating: 4.7,
    category: "puzzle",
    recommended: true
  },
  {
    id: "best-link",
    name: "Best Link",
    image: "/placeholder.jpg",
    rating: 4.3,
    category: "puzzle",
    recommended: true
  },
  {
    id: "mergest-kingdom",
    name: "The Mergest Kingdom",
    image: "/placeholder.jpg",
    rating: 4.3,
    category: "puzzle",
    recommended: true
  },
  // More games
  {
    id: "spider-solitaire",
    name: "Spider Solitaire",
    image: "/placeholder.jpg",
    rating: 4.5,
    category: "card"
  },
  {
    id: "puzzle-game-1",
    name: "Color Match",
    image: "/placeholder.jpg",
    rating: 4.0,
    category: "puzzle"
  },
  {
    id: "puzzle-game-2",
    name: "Jigsaw Master",
    image: "/placeholder.jpg",
    rating: 4.2,
    category: "puzzle"
  }
]

const gameCategories: GameCategory[] = [
  { id: "featured", name: "Featured", games: sampleGames.filter(g => g.featured) },
  { id: "sports", name: "Sports", games: sampleGames.filter(g => g.category === "sports") },
  { id: "recommended", name: "Recommended", games: sampleGames.filter(g => g.recommended) },
  { id: "puzzle", name: "Puzzle", games: sampleGames.filter(g => g.category === "puzzle") },
  { id: "card", name: "Card", games: sampleGames.filter(g => g.category === "card") }
]

interface GameCenterScreenProps {
  onBack: () => void
}

export default function GameCenterScreen({ onBack }: GameCenterScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredGames, setFilteredGames] = useState<Game[]>(sampleGames)
  const { theme, resolvedTheme } = useTheme()
  const [isDark, setIsDark] = useState(false)
  
  useEffect(() => {
    const currentTheme = resolvedTheme || theme
    setIsDark(currentTheme === "dark")
  }, [theme, resolvedTheme])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setFilteredGames(sampleGames)
    } else {
      const filtered = sampleGames.filter(game =>
        game.name.toLowerCase().includes(query.toLowerCase())
      )
      setFilteredGames(filtered)
    }
  }

  const GameCard = ({ game }: { game: Game }) => (
    <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-3 min-w-[140px] flex-shrink-0 hover:shadow-md transition-shadow">
      <div className="aspect-square bg-gray-700 rounded-lg mb-2 overflow-hidden">
        <img
          src={game.image}
          alt={game.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-semibold text-sm text-white mb-1 line-clamp-2">
        {game.name}
      </h3>
      <div className="flex items-center gap-1">
        <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span className="text-xs text-gray-400">{game.rating}</span>
      </div>
    </div>
  )

  const GameSection = ({ category, games }: { category: GameCategory, games: Game[] }) => (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{category.name}</h2>
        {games.length > 2 && (
          <button className={`text-sm font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
            More &gt;
          </button>
        )}
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  )

  return (
    <AppScreen
      onBack={onBack}
      variant="dark"
      showSearch={true}
      searchPlaceholder="Search games"
      onSearch={handleSearch}
      showScrollbar={false}
    >
      <div className="space-y-6">
        {searchQuery ? (
          // Search results
          <div>
            <h2 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
              Search Results ({filteredGames.length})
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {filteredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        ) : (
          // Category sections
          <>
            {/* Featured games */}
            <GameSection 
              category={gameCategories[0]} 
              games={gameCategories[0].games} 
            />
            
            {/* Sports section */}
            <GameSection 
              category={gameCategories[1]} 
              games={gameCategories[1].games} 
            />
            
            {/* Recommended section */}
            <GameSection 
              category={gameCategories[2]} 
              games={gameCategories[2].games} 
            />
            
            {/* More games */}
            <div className="mb-6">
              <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                {sampleGames.filter(g => !g.featured && !g.recommended && g.category !== "sports").map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </AppScreen>
  )
}
