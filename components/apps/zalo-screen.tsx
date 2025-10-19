"use client"

import { useState, useEffect } from "react"
import { 
  Search, 
  Menu, 
  Bell, 
  MessageCircle, 
  Home, 
  Users, 
  Video, 
  ShoppingBag, 
  Gamepad2,
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageSquare,
  Share,
  MoreHorizontal,
  Camera,
  Smile,
  MapPin,
  Tag,
  ThumbsUp,
  ThumbsDown,
  Phone,
  PhoneCall,
  Video as VideoIcon,
  MoreVertical,
  Star,
  Archive,
  Settings,
  Plus
} from "lucide-react"
import AppScreen from "@/components/app-screen"

interface ZaloScreenProps {
  onBack: () => void
}

interface Chat {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timeAgo: string
  unreadCount: number
  isOnline: boolean
  isPinned?: boolean
  isGroup?: boolean
}

interface Contact {
  id: string
  name: string
  avatar: string
  isOnline: boolean
  status?: string
}

const chats: Chat[] = [
  {
    id: "1",
    name: "Anna Nguyen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    lastMessage: "Chào bạn! Hôm nay thế nào?",
    timeAgo: "2 phút",
    unreadCount: 2,
    isOnline: true,
    isPinned: true
  },
  {
    id: "2",
    name: "David Tran",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop",
    lastMessage: "Cảm ơn bạn đã giúp đỡ!",
    timeAgo: "1 giờ",
    unreadCount: 0,
    isOnline: true
  },
  {
    id: "3",
    name: "Emma Wilson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    lastMessage: "Hẹn gặp lại nhé!",
    timeAgo: "3 giờ",
    unreadCount: 1,
    isOnline: false
  },
  {
    id: "4",
    name: "James Lee",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
    lastMessage: "Cuối tuần đi chơi không?",
    timeAgo: "1 ngày",
    unreadCount: 0,
    isOnline: true
  },
  {
    id: "5",
    name: "Lisa Chen",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    lastMessage: "Hôm nay đi ăn gì?",
    timeAgo: "2 ngày",
    unreadCount: 5,
    isOnline: false,
    isGroup: true,
    isPinned: true
  },
  {
    id: "6",
    name: "Mike Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    lastMessage: "OK, tôi sẽ gọi lại sau",
    timeAgo: "3 ngày",
    unreadCount: 0,
    isOnline: false
  },
  {
    id: "7",
    name: "Sarah Kim",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop",
    lastMessage: "Cảm ơn bạn nhiều!",
    timeAgo: "1 tuần",
    unreadCount: 0,
    isOnline: true
  },
  {
    id: "8",
    name: "Tom Brown",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    lastMessage: "Hẹn gặp lại!",
    timeAgo: "2 tuần",
    unreadCount: 0,
    isOnline: false
  }
]

const contacts: Contact[] = [
  {
    id: "1",
    name: "Anna Nguyen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    isOnline: true,
    status: "Đang hoạt động"
  },
  {
    id: "2",
    name: "David Tran",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop",
    isOnline: true,
    status: "Đang hoạt động"
  },
  {
    id: "3",
    name: "Emma Wilson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    isOnline: false,
    status: "2 giờ trước"
  },
  {
    id: "4",
    name: "James Lee",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
    isOnline: true,
    status: "Đang hoạt động"
  },
  {
    id: "5",
    name: "Lisa Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    isOnline: false,
    status: "1 ngày trước"
  }
]

export default function ZaloScreen({ onBack }: ZaloScreenProps) {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [activeTab, setActiveTab] = useState("chats")
  const [searchQuery, setSearchQuery] = useState("")
  const [chatsData, setChatsData] = useState<Chat[]>(chats)
  const [contactsData, setContactsData] = useState<Contact[]>(contacts)
  
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('zaloAppDarkMode')
    if (savedDarkMode !== null) {
      setIsDarkMode(savedDarkMode === 'true')
    } else {
      localStorage.setItem('zaloAppDarkMode', 'true')
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newValue = !prev
      localStorage.setItem('zaloAppDarkMode', String(newValue))
      return newValue
    })
  }

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setChatsData(chats)
      setContactsData(contacts)
      return
    }

    const filteredChats = chats.filter(chat => 
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setChatsData(filteredChats)

    const filteredContacts = contacts.filter(contact => 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setContactsData(filteredContacts)
  }

  const formatTime = (timeAgo: string): string => {
    return timeAgo
  }

  return (
    <AppScreen onBack={onBack} variant={isDarkMode ? "dark" : "light"} hideDefaultHeader={true} allowContentScroll={false} noPadding={true}>
      <div className={`flex flex-col h-full ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header */}
        <div className={`px-4 py-3 flex items-center justify-between ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex items-center">
            <div className="ml-2 flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'}`}>
                <span className="text-white font-bold text-sm">Z</span>
              </div>
              <span className={`ml-2 text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Zalo</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <Search size={20} className={isDarkMode ? "text-gray-300" : "text-gray-700"} />
            </button>
            <button className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <Bell size={20} className={isDarkMode ? "text-gray-300" : "text-gray-700"} />
            </button>
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
            >
              <Menu size={20} className={isDarkMode ? "text-gray-300" : "text-gray-700"} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide pb-20">
          {activeTab === "chats" && (
            <div className="space-y-1">
              {chatsData.map(chat => (
                <div key={chat.id} className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                  <div className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img 
                            src={chat.avatar}
                            alt={chat.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {chat.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {chat.name}
                            </h3>
                            {chat.isPinned && (
                              <Star size={14} className={isDarkMode ? "text-yellow-400" : "text-yellow-500"} fill="currentColor" />
                            )}
                            {chat.isGroup && (
                              <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                                <Users size={10} className="text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {formatTime(chat.timeAgo)}
                            </span>
                            {chat.unreadCount > 0 && (
                              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">{chat.unreadCount}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1 truncate`}>
                          {chat.lastMessage}
                        </p>
                      </div>
                      
                      <button className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                        <MoreVertical size={16} className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "contacts" && (
            <div className="space-y-1">
              {contactsData.map(contact => (
                <div key={contact.id} className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                  <div className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img 
                            src={contact.avatar}
                            alt={contact.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {contact.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {contact.name}
                        </h3>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                          {contact.status}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                          <Phone size={16} className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
                        </button>
                        <button className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                          <VideoIcon size={16} className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "calls" && (
            <div className="p-4">
              <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Phone size={48} className="mx-auto mb-4" />
                <p>Không có cuộc gọi nào</p>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="p-4">
              <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Settings size={48} className="mx-auto mb-4" />
                <p>Cài đặt</p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className={`absolute bottom-0 left-0 right-0 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex items-center justify-around py-2">
            <button className={`flex flex-col items-center py-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              <MessageCircle size={20} />
              <span className="text-xs mt-1">Trò chuyện</span>
            </button>
            <button className={`flex flex-col items-center py-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Users size={20} />
              <span className="text-xs mt-1">Danh bạ</span>
            </button>
            <button className={`flex flex-col items-center py-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Phone size={20} />
              <span className="text-xs mt-1">Cuộc gọi</span>
            </button>
            <button className={`flex flex-col items-center py-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Settings size={20} />
              <span className="text-xs mt-1">Cài đặt</span>
            </button>
          </div>
        </div>
      </div>
    </AppScreen>
  )
}
