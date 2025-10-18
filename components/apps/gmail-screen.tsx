"use client"

import { useState, useEffect } from "react"
import { Search, Menu, Star, StarOff, Paperclip, MoreVertical, Mail, AlertCircle, Trash2, Archive, Clock, Tag } from "lucide-react"
import AppScreen from "@/components/app-screen"

interface GmailScreenProps {
  onBack: () => void
}

interface EmailMessage {
  id: string
  sender: {
    name: string
    email: string
    avatar?: string
  }
  subject: string
  preview: string
  time: string
  isRead: boolean
  isStarred: boolean
  hasAttachment: boolean
  category?: "primary" | "promotions" | "social" | "updates"
  labels?: string[]
}

const sampleEmails: EmailMessage[] = [
  {
    id: "1",
    sender: {
      name: "Annie Bee",
      email: "annie@example.com",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop"
    },
    subject: "Trip to Helen's 🏝️",
    preview: "Hi everyone! I just chatted with Helen, and she's excited to host us next weekend for the...",
    time: "Now",
    isRead: false,
    isStarred: false,
    hasAttachment: true,
    category: "primary"
  },
  {
    id: "2",
    sender: {
      name: "Google Play",
      email: "play-noreply@google.com"
    },
    subject: "Your app subscription is expiring soon",
    preview: "Your subscription to Premium Music will expire in 3 days. Renew now to avoid interruption...",
    time: "10:45 AM",
    isRead: false,
    isStarred: false,
    hasAttachment: false,
    category: "promotions"
  },
  {
    id: "3",
    sender: {
      name: "GitHub",
      email: "noreply@github.com"
    },
    subject: "Security alert: New sign-in from unknown location",
    preview: "We noticed a new sign-in to your account from a new location. If this was you, you can ignore...",
    time: "Yesterday",
    isRead: true,
    isStarred: true,
    hasAttachment: false,
    category: "updates"
  },
  {
    id: "4",
    sender: {
      name: "Netflix",
      email: "info@netflix.com"
    },
    subject: "New shows added to your list",
    preview: "We've added new shows based on your interests. Check out these new titles that we think you'll...",
    time: "Jul 15",
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    category: "promotions"
  },
  {
    id: "5",
    sender: {
      name: "Alex Morgan",
      email: "alex@example.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
    },
    subject: "Meeting notes from yesterday",
    preview: "Here are the action items we discussed during yesterday's meeting: 1. Update the project timeline...",
    time: "Jul 14",
    isRead: true,
    isStarred: false,
    hasAttachment: true,
    category: "primary"
  },
  {
    id: "6",
    sender: {
      name: "LinkedIn",
      email: "notifications@linkedin.com"
    },
    subject: "5 people viewed your profile this week",
    preview: "Your profile is getting attention from professionals in your industry. See who's viewed your profile...",
    time: "Jul 13",
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    category: "social"
  },
  {
    id: "7",
    sender: {
      name: "Google Play",
      email: "play-noreply@google.com"
    },
    subject: "Pixel software update available",
    preview: "A new system update is available for your Pixel device. This update includes performance improvements...",
    time: "Jul 12",
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    category: "updates"
  },
  {
    id: "8",
    sender: {
      name: "Garden•G",
      email: "newsletter@garden.com"
    },
    subject: "Summer gardening tips",
    preview: "Beat the heat with these summer gardening tips to keep your plants thriving during hot weather...",
    time: "Jul 11",
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    category: "updates"
  }
]

export default function GmailScreen({ onBack }: GmailScreenProps) {
  const [emails, setEmails] = useState<EmailMessage[]>(sampleEmails)
  const [activeTab, setActiveTab] = useState<"primary" | "promotions" | "social" | "updates">("primary")
  const [searchQuery, setSearchQuery] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(true)
  
  // Load dark mode preference from localStorage on component mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('gmailAppDarkMode')
    if (savedDarkMode !== null) {
      setIsDarkMode(savedDarkMode === 'true')
    } else {
      // Set dark mode as default
      localStorage.setItem('gmailAppDarkMode', 'true')
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newValue = !prev
      localStorage.setItem('gmailAppDarkMode', String(newValue))
      return newValue
    })
  }

  const handleStarEmail = (id: string) => {
    setEmails(prevEmails => 
      prevEmails.map(email => 
        email.id === id ? { ...email, isStarred: !email.isStarred } : email
      )
    )
  }

  const handleMarkAsRead = (id: string) => {
    setEmails(prevEmails => 
      prevEmails.map(email => 
        email.id === id ? { ...email, isRead: true } : email
      )
    )
  }

  const filteredEmails = emails.filter(email => {
    // Filter by active tab
    if (email.category !== activeTab) return false
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        email.sender.name.toLowerCase().includes(query) ||
        email.sender.email.toLowerCase().includes(query) ||
        email.subject.toLowerCase().includes(query) ||
        email.preview.toLowerCase().includes(query)
      )
    }
    
    return true
  })

  // Count unread emails by category
  const unreadCounts = emails.reduce((acc, email) => {
    if (!email.isRead && email.category) {
      acc[email.category] = (acc[email.category] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)

  return (
    <AppScreen onBack={onBack} variant={isDarkMode ? "dark" : "light"} hideDefaultHeader={true} allowContentScroll={false} noPadding={true}>
      <div className={`flex flex-col relative h-full ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {/* Header */}
        <div className={`px-4 py-3 flex items-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <button className="p-2 rounded-full">
            <Menu size={24} className={isDarkMode ? "text-gray-300" : "text-gray-700"} />
          </button>
          
          {/* Search Bar */}
          <div className="flex-1 mx-2">
            <div className={`flex items-center px-4 py-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <Search size={20} className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
              <input 
                type="text" 
                placeholder="Search in mail" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`ml-2 flex-1 bg-transparent border-none focus:outline-none ${isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
              />
            </div>
          </div>
          
          {/* User Avatar */}
          <button 
            onClick={toggleDarkMode}
            className="w-8 h-8 rounded-full overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop" 
              alt="User" 
              className="w-full h-full object-cover"
            />
          </button>
        </div>
        
        {/* Tabs */}
        <div className={`flex border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <button 
            onClick={() => setActiveTab("primary")} 
            className={`flex-1 py-3 px-2 relative ${activeTab === "primary" ? (isDarkMode ? 'text-blue-400' : 'text-blue-600') : (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}
          >
            <div className="flex items-center justify-center">
              <Mail size={18} />
              <span className="ml-1 text-sm font-medium">Primary</span>
            </div>
            {activeTab === "primary" && (
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
            )}
          </button>
          
          <button 
            onClick={() => setActiveTab("promotions")} 
            className={`flex-1 py-3 px-2 relative ${activeTab === "promotions" ? (isDarkMode ? 'text-green-400' : 'text-green-600') : (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}
          >
            <div className="flex items-center justify-center">
              <Tag size={18} />
              <span className="ml-1 text-sm font-medium">Promotions</span>
            </div>
            {activeTab === "promotions" && (
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${isDarkMode ? 'bg-green-400' : 'bg-green-600'}`}></div>
            )}
          </button>
          
          <button 
            onClick={() => setActiveTab("updates")} 
            className={`flex-1 py-3 px-2 relative ${activeTab === "updates" ? (isDarkMode ? 'text-amber-400' : 'text-amber-600') : (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}
          >
            <div className="flex items-center justify-center">
              <AlertCircle size={18} />
              <span className="ml-1 text-sm font-medium">Updates</span>
            </div>
            {activeTab === "updates" && (
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${isDarkMode ? 'bg-amber-400' : 'bg-amber-600'}`}></div>
            )}
          </button>
        </div>
        
        {/* Email List */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {filteredEmails.length === 0 ? (
            <div className={`flex flex-col items-center justify-center h-full ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <Mail size={48} strokeWidth={1} />
              <p className="mt-4 text-center">No emails in this category</p>
            </div>
          ) : (
            filteredEmails.map(email => (
              <div 
                key={email.id}
                onClick={() => handleMarkAsRead(email.id)}
                className={`flex p-4 border-b ${
                  isDarkMode 
                    ? 'border-gray-800 hover:bg-gray-800' 
                    : 'border-gray-100 hover:bg-gray-50'
                } ${
                  !email.isRead 
                    ? (isDarkMode ? 'bg-gray-800/50' : 'bg-blue-50/30') 
                    : ''
                }`}
              >
                {/* Sender Avatar */}
                <div className="mr-3">
                  {email.sender.avatar ? (
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img 
                        src={email.sender.avatar} 
                        alt={email.sender.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'
                    }`}>
                      <span className="text-lg font-medium">{email.sender.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                
                {/* Email Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-medium truncate ${
                      !email.isRead 
                        ? (isDarkMode ? 'text-white' : 'text-gray-900') 
                        : (isDarkMode ? 'text-gray-300' : 'text-gray-700')
                    }`}>
                      {email.sender.name}
                    </h3>
                    <span className={`text-xs ${
                      !email.isRead 
                        ? (isDarkMode ? 'text-gray-300' : 'text-gray-700') 
                        : (isDarkMode ? 'text-gray-500' : 'text-gray-500')
                    }`}>
                      {email.time}
                    </span>
                  </div>
                  
                  <h4 className={`text-sm truncate ${
                    !email.isRead 
                      ? (isDarkMode ? 'text-gray-200' : 'text-gray-800') 
                      : (isDarkMode ? 'text-gray-400' : 'text-gray-600')
                  }`}>
                    {email.subject}
                  </h4>
                  
                  <div className="flex items-center">
                    <p className={`text-xs truncate ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {email.preview}
                    </p>
                    
                    {email.hasAttachment && (
                      <Paperclip size={14} className={`ml-1 ${
                        isDarkMode ? 'text-gray-500' : 'text-gray-400'
                      }`} />
                    )}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="ml-2 flex items-center">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStarEmail(email.id);
                    }}
                    className="p-2"
                  >
                    {email.isStarred ? (
                      <Star size={18} className="text-amber-400 fill-amber-400" />
                    ) : (
                      <StarOff size={18} className={isDarkMode ? "text-gray-500" : "text-gray-400"} />
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Floating Action Button */}
        <div className="absolute bottom-6 right-6">
          <button className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
            isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
          }`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </AppScreen>
  )
}
