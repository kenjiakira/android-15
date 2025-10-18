export interface Game {
  id: string
  name: string
  image: string
  rating: number
  category: 'puzzle' | 'sports' | 'card' | 'action' | 'strategy' | 'arcade'
  featured?: boolean
  recommended?: boolean
  description?: string
  developer?: string
  size?: string
  downloads?: string
}

export interface GameCategory {
  id: string
  name: string
  games: Game[]
}

export interface GameCenterState {
  searchQuery: string
  selectedCategory: string | null
  featuredGames: Game[]
  recommendedGames: Game[]
  categories: GameCategory[]
}
