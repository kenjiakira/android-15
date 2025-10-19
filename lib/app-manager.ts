export interface App {
  id: string
  name: string
  image: string
  color: string
  category: 'system' | 'google' | 'xiaomi' | 'social' | 'entertainment' | 'utility' | 'ai'
  component?: React.ComponentType<any>
  props?: Record<string, any>
}

export interface AppScreenProps {
  onBack: () => void
  onNavigate?: (appId: string) => void
}

export interface AppRegistry {
  [key: string]: App
}

export const appRegistry: AppRegistry = {
  // System Apps
  settings: {
    id: "settings",
    name: "Settings",
    image: "/setting.png",
    color: "from-slate-400 to-slate-600",
    category: "system"
  },
  'file-explore': {
    id: 'file-explore',
    name: 'File Explore',
    image: '/file-explore.png',
    color: 'from-slate-400 to-slate-600',
    category: 'system'
  },
  music: {
    id: "music",
    name: "Music",
    image: "/music.png",
    color: "from-purple-400 to-purple-600",
    category: "system"
  },
  gallery: {
    id: "gallery",
    name: "Gallery",
    image: "/gallery.png",
    color: "from-blue-400 to-blue-600",
    category: "system"
  },
  game: {
    id: "game",
    name: "Game Center",
    image: "/game.png",
    color: "from-indigo-400 to-indigo-600",
    category: "system"
  },
  notes: {
    id: "notes",
    name: "Notes",
    image: "/notes.png",
    color: "from-yellow-300 to-yellow-500",
    category: "system"
  },
  phonebook: {
    id: "phonebook",
    name: "Contacts",
    image: "/phonebook.png",
    color: "from-green-500 to-green-700",
    category: "system"
  },
  security: {
    id: "security",
    name: "Security",
    image: "/security.png",
    color: "from-red-400 to-red-600",
    category: "system"
  },
  theme: {
    id: "theme",
    name: "Themes",
    image: "/theme.png",
    color: "from-orange-400 to-orange-600",
    category: "system"
  },
  radio: {
    id: "radio",
    name: "Radio FM",
    image: "/radio.png",
    color: "from-amber-400 to-amber-600",
    category: "system"
  },
  calculator: {
    id: "calculator",
    name: "Calculator",
    image: "/calculator.png",
    color: "from-green-400 to-green-600",
    category: "system"
  },
  'mi-get-apps': {
    id: 'mi-get-apps',
    name: 'Mi Get Apps',
    image: '/mi-get-apps.png',
    color: 'from-slate-400 to-slate-600',
    category: 'system'
  },

  // Xiaomi Apps
  xiaomi: {
    id: "xiaomi",
    name: "Mi Store",
    image: "/xiaomi.png",
    color: "from-orange-500 to-orange-700",
    category: "xiaomi"
  },
  "mi-video": {
    id: "mi-video",
    name: "Mi Video",
    image: "/mi-video.png",
    color: "from-red-500 to-red-700",
    category: "xiaomi"
  },
  "mi-home": {
    id: "mi-home",
    name: "Mi Home",
    image: "/mi-home.png",
    color: "from-orange-400 to-orange-600",
    category: "xiaomi"
  },
  shareme: {
    id: "shareme",
    name: "Share Me",
    image: "/shareme.png",
    color: "from-cyan-400 to-cyan-600",
    category: "xiaomi"
  },

  // Google Apps
  google: {
    id: "google",
    name: "Google",
    image: "/google.png",
    color: "from-blue-500 to-blue-700",
    category: "google"
  },
  gmail: {
    id: "gmail",
    name: "Gmail",
    image: "/gmail.png",
    color: "from-red-400 to-red-600",
    category: "google"
  },
  "google-maps": {
    id: "google-maps",
    name: "Maps",
    image: "/google-maps.png",
    color: "from-green-400 to-green-600",
    category: "google"
  },
  "google-photo": {
    id: "google-photo",
    name: "Photos",
    image: "/google-photo.png",
    color: "from-blue-300 to-blue-500",
    category: "google"
  },
  "google-drive": {
    id: "google-drive",
    name: "Drive",
    image: "/google-drive.png",
    color: "from-blue-400 to-blue-600",
    category: "google"
  },
  meet: {
    id: "meet",
    name: "Meet",
    image: "/meet.png",
    color: "from-green-500 to-green-700",
    category: "google"
  },
  youtube: {
    id: "youtube",
    name: "YouTube",
    image: "/youtube.png",
    color: "from-red-500 to-red-700",
    category: "google"
  },

  // AI Apps
  chatgpt: {
    id: "chatgpt",
    name: "ChatGPT",
    image: "/chatgpt.png",
    color: "from-emerald-400 to-emerald-600",
    category: "ai"
  },
  gemini: {
    id: "gemini",
    name: "Gemini",
    image: "/gemini.png",
    color: "from-purple-500 to-purple-700",
    category: "ai"
  },

  // Social Media Apps
  facebook: {
    id: "facebook",
    name: "Facebook",
    image: "/facebook.png",
    color: "from-blue-600 to-blue-800",
    category: "social"
  },
  instagram: {
    id: "instagram",
    name: "Instagram",
    image: "/instagram.png",
    color: "from-pink-500 to-purple-600",
    category: "social"
  },
  messenger: {
    id: "messenger",
    name: "Messenger",
    image: "/messenger.png",
    color: "from-blue-500 to-blue-700",
    category: "social"
  },
  tiktok: {
    id: "tiktok",
    name: "TikTok",
    image: "/tiktok.png",
    color: "from-gray-800 to-black",
    category: "social"
  },
  zalo: {
    id: "zalo",
    name: "Zalo",
    image: "/zalo.png",
    color: "from-blue-400 to-blue-600",
    category: "social"
  },

  // Entertainment Apps
  spotify: {
    id: "spotify",
    name: "Spotify",
    image: "/spotify.png",
    color: "from-green-400 to-green-600",
    category: "entertainment"
  },

  // Utility Apps
  cleaner: {
    id: "cleaner",
    name: "Cleaner",
    image: "/cleaner.png",
    color: "from-orange-400 to-orange-600",
    category: "utility"
  },
  github: {
    id: "github",
    name: "GitHub",
    image: "/github.png",
    color: "from-black to-white",
    category: "utility"
  },
  capcut: {
    id: "capcut",
    name: "CapCut",
    image: "/capcut.png",
    color: "from-purple-400 to-purple-600",
    category: "utility"
  }
}

export class AppHandler {
  private static instance: AppHandler
  private currentApp: string | null = null
  private appHistory: string[] = []
  private listeners: ((appId: string | null) => void)[] = []

  static getInstance(): AppHandler {
    if (!AppHandler.instance) {
      AppHandler.instance = new AppHandler()
    }
    return AppHandler.instance
  }

  getAllApps(): App[] {
    return Object.values(appRegistry)
  }

  getAppsByCategory(category: App['category']): App[] {
    return Object.values(appRegistry).filter(app => app.category === category)
  }

  getApp(appId: string): App | undefined {
    return appRegistry[appId]
  }

  navigateToApp(appId: string): void {
    if (this.currentApp) {
      this.appHistory.push(this.currentApp)
    }
    this.currentApp = appId
    this.notifyListeners(appId)
  }

  goBack(): string | null {
    if (this.appHistory.length > 0) {
      const previousApp = this.appHistory.pop()!
      this.currentApp = previousApp
      this.notifyListeners(previousApp)
      return previousApp
    }
    this.currentApp = null
    this.notifyListeners(null)
    return null
  }

  getCurrentApp(): string | null {
    return this.currentApp
  }

  hasApp(appId: string): boolean {
    return appId in appRegistry
  }

  addListener(listener: (appId: string | null) => void): () => void {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  private notifyListeners(appId: string | null): void {
    this.listeners.forEach(listener => listener(appId))
  }

  clearHistory(): void {
    this.appHistory = []
  }

  getHistory(): string[] {
    return [...this.appHistory]
  }
}

export const getAppsByCategory = (category: App['category']): App[] => {
  return Object.values(appRegistry).filter(app => app.category === category)
}

export const searchApps = (query: string): App[] => {
  const lowercaseQuery = query.toLowerCase()
  return Object.values(appRegistry).filter(app => 
    app.name.toLowerCase().includes(lowercaseQuery) ||
    app.id.toLowerCase().includes(lowercaseQuery)
  )
}

export const getAppCategories = (): App['category'][] => {
  const categories = new Set<App['category']>()
  Object.values(appRegistry).forEach(app => categories.add(app.category))
  return Array.from(categories)
}
