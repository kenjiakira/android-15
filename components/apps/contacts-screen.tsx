"use client"

import { useState } from "react"
import { Search, Plus, MoreVertical, Phone, MessageCircle, Video, Star } from "lucide-react"
import AppScreen from "@/components/app-screen"

interface ContactsScreenProps {
  onBack: () => void
}

interface Contact {
  id: string
  name: string
  phone: string
  avatar?: string
  isFavorite?: boolean
  isOnline?: boolean
}

const sampleContacts: Contact[] = [
  { id: "1", name: "Anna Nguyen", phone: "+84 987 654 321", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face", isFavorite: true, isOnline: true },
  { id: "2", name: "David Tran", phone: "+84 123 456 789", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face", isFavorite: true, isOnline: false },
  { id: "3", name: "Emma Wilson", phone: "+84 555 123 456", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face", isFavorite: false, isOnline: true },
  { id: "4", name: "James Lee", phone: "+84 888 999 000", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face", isFavorite: false, isOnline: false },
  { id: "5", name: "Lisa Chen", phone: "+84 777 888 999", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face", isFavorite: true, isOnline: true },
  { id: "6", name: "Mike Johnson", phone: "+84 666 555 444", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face", isFavorite: false, isOnline: false },
  { id: "7", name: "Sarah Kim", phone: "+84 333 222 111", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face", isFavorite: false, isOnline: true },
  { id: "8", name: "Tom Brown", phone: "+84 111 222 333", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face", isFavorite: false, isOnline: false },
]

export default function ContactsScreen({ onBack }: ContactsScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all")
  
  const filteredContacts = sampleContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.phone.includes(searchQuery)
    
    if (activeTab === "favorites") {
      return matchesSearch && contact.isFavorite
    }
    
    return matchesSearch
  })

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const groupedContacts = filteredContacts.reduce((acc, contact) => {
    const firstLetter = contact.name[0].toUpperCase()
    if (!acc[firstLetter]) {
      acc[firstLetter] = []
    }
    acc[firstLetter].push(contact)
    return acc
  }, {} as Record<string, Contact[]>)

  return (
    <AppScreen onBack={onBack} variant="dark">
      {/* Custom Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-white text-lg font-medium">Contacts</h1>
        <div className="flex items-center space-x-4">
          <button className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
            <Plus size={18} className="text-white" strokeWidth={1.5} />
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
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-3 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-700 mb-6 p-1">
        <button
          onClick={() => setActiveTab("all")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === "all" 
              ? "bg-blue-500 text-white" 
              : "text-gray-400 hover:text-white"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab("favorites")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === "favorites" 
              ? "bg-blue-500 text-white" 
              : "text-gray-400 hover:text-white"
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Star size={16} className="fill-current" />
            <span>Favorites</span>
          </div>
        </button>
      </div>

      {/* Contacts List */}
      <div className="space-y-4">
        {Object.keys(groupedContacts).length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-400">No contacts found</p>
          </div>
        ) : (
          Object.entries(groupedContacts)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([letter, contacts]) => (
              <div key={letter}>
                <div className="sticky top-0 bg-gray-900 py-2 px-4 -mx-6 mb-2">
                  <h2 className="text-blue-400 font-medium text-sm">{letter}</h2>
                </div>
                <div className="space-y-1">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center justify-between p-4 bg-gray-800/40 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:bg-gray-800/60 transition-all"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        {/* Avatar */}
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center overflow-hidden">
                            {contact.avatar ? (
                              <img
                                src={contact.avatar}
                                alt={contact.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.style.display = 'none'
                                  target.nextElementSibling!.classList.remove('hidden')
                                }}
                              />
                            ) : null}
                            <span className={`text-white font-medium text-sm ${contact.avatar ? 'hidden' : ''}`}>
                              {getInitials(contact.name)}
                            </span>
                          </div>
                          {contact.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-900 rounded-full"></div>
                          )}
                        </div>

                        {/* Contact Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-white font-medium truncate">{contact.name}</h3>
                            {contact.isFavorite && (
                              <Star size={14} className="text-yellow-400 fill-current flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-gray-400 text-sm truncate">{contact.phone}</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2">
                        <button className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
                          <Phone size={14} className="text-white" strokeWidth={1.5} />
                        </button>
                        <button className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
                          <MessageCircle size={14} className="text-white" strokeWidth={1.5} />
                        </button>
                        <button className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
                          <Video size={14} className="text-white" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <div className="grid grid-cols-3 gap-4">
          <button className="flex flex-col items-center space-y-2 p-4 bg-gray-800/40 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:bg-gray-800/60 transition-all">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <Plus size={20} className="text-white" strokeWidth={1.5} />
            </div>
            <span className="text-white text-sm font-medium">Add Contact</span>
          </button>
          
          <button className="flex flex-col items-center space-y-2 p-4 bg-gray-800/40 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:bg-gray-800/60 transition-all">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <Phone size={20} className="text-white" strokeWidth={1.5} />
            </div>
            <span className="text-white text-sm font-medium">Import</span>
          </button>
          
          <button className="flex flex-col items-center space-y-2 p-4 bg-gray-800/40 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:bg-gray-800/60 transition-all">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <Star size={20} className="text-white fill-current" strokeWidth={1.5} />
            </div>
            <span className="text-white text-sm font-medium">Groups</span>
          </button>
        </div>
      </div>
    </AppScreen>
  )
}
