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
  ThumbsDown
} from "lucide-react"
import AppScreen from "@/components/app-screen"

interface FacebookScreenProps {
  onBack: () => void
}

interface Post {
  id: string
  author: {
    name: string
    avatar: string
    verified?: boolean
  }
  content: string
  image?: string
  timeAgo: string
  location?: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
}

interface Story {
  id: string
  author: {
    name: string
    avatar: string
  }
  image: string
  isOwn?: boolean
}

const stories: Story[] = [
  {
    id: "1",
    author: { name: "Your Story", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop" },
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    isOwn: true
  },
  {
    id: "2",
    author: { name: "Sarah", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop" },
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop"
  },
  {
    id: "3",
    author: { name: "Mike", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop" },
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop"
  },
  {
    id: "4",
    author: { name: "Emma", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop" },
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=600&fit=crop"
  },
  {
    id: "5",
    author: { name: "Alex", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" },
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=600&fit=crop"
  }
]

const posts: Post[] = [
  {
    id: "1",
    author: {
      name: "Tech News",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      verified: true
    },
    content: "Breaking: New AI technology revolutionizes the way we work! 🚀 What do you think about this development?",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    timeAgo: "2 hours ago",
    location: "San Francisco, CA",
    likes: 1247,
    comments: 89,
    shares: 156,
    isLiked: false
  },
  {
    id: "2",
    author: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop"
    },
    content: "Just finished an amazing hiking trip in the mountains! The views were absolutely breathtaking. Can't wait to go back! 🏔️",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    timeAgo: "5 hours ago",
    location: "Rocky Mountains",
    likes: 342,
    comments: 23,
    shares: 12,
    isLiked: true
  },
  {
    id: "3",
    author: {
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
    },
    content: "Cooking experiment of the day: Homemade ramen with all the fixings! 🍜 Who's hungry?",
    timeAgo: "1 day ago",
    likes: 156,
    comments: 34,
    shares: 8,
    isLiked: false
  },
  {
    id: "4",
    author: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop"
    },
    content: "Grateful for all the amazing people in my life! 💕 Thank you for making every day special.",
    timeAgo: "2 days ago",
    likes: 892,
    comments: 67,
    shares: 45,
    isLiked: true
  },
  {
    id: "5",
    author: {
      name: "Alex Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
    },
    content: "Just launched my new startup! Excited to share this journey with all of you. Thanks for the support! 🚀",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=500&fit=crop",
    timeAgo: "3 days ago",
    location: "New York, NY",
    likes: 2156,
    comments: 234,
    shares: 189,
    isLiked: false
  }
]

export default function FacebookScreen({ onBack }: FacebookScreenProps) {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [postsData, setPostsData] = useState<Post[]>(posts)
  
  // Load dark mode preference from localStorage on component mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('facebookAppDarkMode')
    if (savedDarkMode !== null) {
      setIsDarkMode(savedDarkMode === 'true')
    } else {
      // Set dark mode as default
      localStorage.setItem('facebookAppDarkMode', 'true')
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newValue = !prev
      localStorage.setItem('facebookAppDarkMode', String(newValue))
      return newValue
    })
  }

  const handleLike = (postId: string) => {
    setPostsData(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    )
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  return (
    <AppScreen onBack={onBack} variant={isDarkMode ? "dark" : "light"} hideDefaultHeader={true} allowContentScroll={false} noPadding={true}>
      <div className={`flex flex-col h-full ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header */}
        <div className={`px-4 py-3 flex items-center justify-between ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex items-center">
            <div className="ml-2 flex items-center">
              <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-600'}`}>facebook</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <span className="text-white font-bold text-lg">+</span>
            </button>
            <button className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <Search size={16} className={isDarkMode ? "text-gray-300" : "text-gray-700"} />
            </button>
            <button className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <Menu size={16} className={isDarkMode ? "text-gray-300" : "text-gray-700"} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className={`px-4 py-2 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex items-center justify-around">
            <button className={`flex flex-col items-center py-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              <Home size={20} />
              <span className="text-xs mt-1">Home</span>
            </button>
            <button className={`flex flex-col items-center py-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Users size={20} />
              <span className="text-xs mt-1">Friends</span>
            </button>
            <button className={`flex flex-col items-center py-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <MessageCircle size={20} />
              <span className="text-xs mt-1">Messenger</span>
            </button>
            <button className={`flex flex-col items-center py-2 relative ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Bell size={20} />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <span className="text-xs mt-1">Notifications</span>
            </button>
            <button className={`flex flex-col items-center py-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Video size={20} />
              <span className="text-xs mt-1">Videos</span>
            </button>
            <button className={`flex flex-col items-center py-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <ShoppingBag size={20} />
              <span className="text-xs mt-1">Marketplace</span>
            </button>
          </div>
        </div>

         {/* All Content - Scrollable */}
         <div className="flex-1 overflow-y-auto scrollbar-hide pb-20">
           {/* Stories Section */}
           <div className={`px-4 py-3 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
             <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
               {stories.map(story => (
                 <div key={story.id} className="flex-shrink-0">
                   <div className="relative">
                     <div className={`w-16 h-16 rounded-full p-0.5 ${story.isOwn ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-300') : 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500'}`}>
                       <div className={`w-full h-full rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} flex items-center justify-center`}>
                         {story.isOwn ? (
                           <Camera size={20} className={isDarkMode ? "text-gray-400" : "text-gray-600"} />
                         ) : (
                           <img 
                             src={story.author.avatar}
                             alt={story.author.name}
                             className="w-full h-full object-cover"
                           />
                         )}
                       </div>
                     </div>
                   </div>
                   <p className={`text-xs text-center mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                     {story.author.name}
                   </p>
                 </div>
               ))}
             </div>
           </div>

           {/* Create Post */}
           <div className={`px-4 py-3 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
             <div className="flex items-center space-x-3">
               <div className="relative">
                 <div className="w-10 h-10 rounded-full overflow-hidden">
                   <img 
                     src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop"
                     alt="Your avatar"
                     className="w-full h-full object-cover"
                   />
                 </div>
                 <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
               </div>
               <div className={`flex-1 px-4 py-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                 <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                   What's on your mind?
                 </span>
               </div>
               <div className="flex flex-col items-center">
                 <button className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                   <Camera size={20} className={isDarkMode ? "text-gray-300" : "text-gray-600"} />
                 </button>
                 <span className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Photo</span>
               </div>
             </div>
           </div>
          {postsData.map(post => (
            <div key={post.id} className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} mb-2`}>
              {/* Post Header */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img 
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center space-x-1">
                        <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {post.author.name}
                        </h3>
                        {post.author.verified && (
                          <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-1 text-xs">
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{post.timeAgo}</span>
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>•</span>
                        <div className="w-3 h-3 rounded-full bg-gray-400 flex items-center justify-center">
                          <span className="text-white text-xs">🌐</span>
                        </div>
                        {post.location && (
                          <>
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>•</span>
                            <MapPin size={12} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{post.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <button className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                    <MoreHorizontal size={16} className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
                  </button>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-3">
                <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
                  {post.content}
                </p>
                {post.image && (
                  <div className="rounded-lg overflow-hidden">
                    <img 
                      src={post.image}
                      alt="Post content"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Post Stats */}
              <div className="px-4 pb-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                        <ThumbsUp size={10} className="text-white" />
                      </div>
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                        {formatNumber(post.likes)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                        {formatNumber(post.comments)} comments
                      </span>
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                        {formatNumber(post.shares)} shares
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Actions */}
              <div className={`px-4 py-2 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className="flex items-center justify-around">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} ${
                      post.isLiked ? (isDarkMode ? 'text-blue-400' : 'text-blue-600') : (isDarkMode ? 'text-gray-400' : 'text-gray-600')
                    }`}
                  >
                    <ThumbsUp size={16} className={post.isLiked ? 'fill-current' : ''} />
                    <span className="text-sm font-medium">Like</span>
                  </button>
                  <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <MessageSquare size={16} />
                    <span className="text-sm font-medium">Comment</span>
                  </button>
                  <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Share size={16} />
                    <span className="text-sm font-medium">Share</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppScreen>
  )
}
