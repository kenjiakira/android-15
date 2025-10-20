"use client"

import { useState, useRef, useEffect } from "react"
import { Menu, Mic, Plus, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import AppScreen from "@/components/app-screen"
import VirtualKeyboard from "@/components/virtual-keyboard"

interface ChatGPTScreenProps {
  onBack: () => void
}

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export default function ChatGPTScreen({ onBack }: ChatGPTScreenProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showVirtualKeyboard, setShowVirtualKeyboard] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText("")
    setIsTyping(true)
    setShowVirtualKeyboard(false) // Ẩn bàn phím ảo sau khi gửi

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "This is a response from ChatGPT. I can help you with many different topics!",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleInputChange = (text: string) => {
    setInputText(text)
  }

  const handleVirtualKeyboardKeyPress = (button: string) => {
    if (button === '{enter}') {
      handleSendMessage()
    }
  }

  return (
    <AppScreen onBack={onBack} variant="dark" hideDefaultHeader={true} allowContentScroll={false} noPadding={true}>
       <div className="flex flex-col relative h-full bg-gray-900" style={{ fontFamily: 'Segoe UI, system-ui, sans-serif' }}>
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div 
              className="absolute inset-0 z-50 bg-black/50" 
              onClick={() => setSidebarOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="w-80 h-full bg-gray-900 border-r border-gray-800 p-6" 
                onClick={(e) => e.stopPropagation()}
                initial={{ x: -320 }}
                animate={{ x: 0 }}
                exit={{ x: -320 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white text-lg font-medium">ChatGPT</h2>
                <button onClick={() => setSidebarOpen(false)} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <motion.button 
                    className="w-full text-left px-4 py-3 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                      <span>New Chat</span>
                    </div>
                  </motion.button>
                  
                  <motion.div 
                    className="border-t border-gray-800 pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    <h3 className="text-gray-400 text-sm font-medium mb-3">Recent Conversations</h3>
                    <div className="space-y-2">
                      <motion.button 
                        className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        What is artificial intelligence?
                      </motion.button>
                      <motion.button 
                        className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Help me write Python code
                      </motion.button>
                      <motion.button 
                        className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Explain quantum computing
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Custom Header */}
         <div className="flex items-center justify-between p-4 border-b border-gray-800">
           <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-8 h-8">
             <Menu size={18} className="text-white" strokeWidth={1.5} />
           </button>
          <h1 className="text-white text-lg font-medium">ChatGPT</h1>
          <button className="w-8 h-8 rounded-full">
            <User size={18} className="text-white" strokeWidth={1.5} />
          </button>
        </div>

         {/* Main Content - Only show when no messages */}
         {messages.length === 0 && (
           <div className="flex-1 flex items-center justify-center p-8">
             <div className="text-center max-w-md">
               <div className="w-27 h-24 mx-auto mb-6 flex items-center justify-center">
                 <img 
                   src="/logo-gpt.png" 
                   alt="ChatGPT Logo" 
                   className="w-full h-full object-contain filter brightness-300 contrast-300 saturate-200 invert"
                   onError={(e) => {
                     const target = e.target as HTMLImageElement
                     target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Crect width='96' height='96' fill='%2310b981' rx='48'/%3E%3Ctext x='48' y='60' text-anchor='middle' dy='.3em' fill='white' font-family='system-ui' font-size='24' font-weight='bold'%3EGPT%3C/text%3E%3C/svg%3E"
                   }}
                 />
               </div>
               <h2 className="text-white text-2xl font-bold mb-4">Introducing GPT-5</h2>
               <p className="text-gray-400 text-base leading-relaxed">
                 ChatGPT just got better at writing, coding, reasoning, and more — now powered by our latest intelligence.
               </p>
             </div>
           </div>
         )}

        {/* Messages Container - Only show when there are messages */}
        {messages.length > 0 && (
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scrollbar-hide">
            {messages.map((message, index) => (
            <motion.div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <motion.div 
                className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  message.isUser 
                    ? 'bg-gray-800 text-white' 
                    : 'text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", damping: 20 }}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
              </motion.div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div 
                className="flex justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 20 }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <motion.div 
                        className="w-1 h-1 bg-gray-400 rounded-full"
                        animate={{ y: [-4, 4, -4] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div 
                        className="w-1 h-1 bg-gray-400 rounded-full"
                        animate={{ y: [-4, 4, -4] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                      />
                      <motion.div 
                        className="w-1 h-1   bg-gray-400 rounded-full"
                        animate={{ y: [-4, 4, -4] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input Area */}
        <motion.div 
          className="p-4 border-t border-gray-800"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex items-center space-x-3">
            <motion.button 
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <Plus size={18} className="text-white" strokeWidth={1.5} />
            </motion.button>
            
            <div className="flex-1 relative">
              <motion.input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => setShowVirtualKeyboard(true)}
                placeholder="Ask anything"
                className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-full px-4 py-3 pr-12 border-0 focus:outline-none focus:ring-2 focus:ring-gray-400"
                readOnly={showVirtualKeyboard}
                style={{ caretColor: showVirtualKeyboard ? 'transparent' : 'auto' }}
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", damping: 20 }}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <motion.button 
                  className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", damping: 20 }}
                >
                  <Mic size={16} className="text-white" strokeWidth={1.5} />
                </motion.button>
              </div>
            </div>
            
            <motion.button 
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg ${
                inputText.trim() 
                  ? 'bg-white hover:bg-gray-100 shadow-lg' 
                  : 'bg-gray-600 cursor-not-allowed'
              }`}
              whileHover={inputText.trim() ? { scale: 1.1, rotate: 5 } : {}}
              whileTap={inputText.trim() ? { scale: 0.9 } : {}}
              transition={{ type: "spring", damping: 20 }}
            >
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                className={`${inputText.trim() ? 'text-black' : 'text-gray-400'}`}
              >
                <path 
                  d="M12 19V5M5 12L12 5L19 12" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          </div>
        </motion.div>

        {/* Virtual Keyboard */}
        <AnimatePresence>
          {showVirtualKeyboard && (
            <motion.div 
              className="border-t border-gray-800 bg-gray-900"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <VirtualKeyboard
                inputValue={inputText}
                onInputChange={handleInputChange}
                onKeyPress={handleVirtualKeyboardKeyPress}
                onClose={() => setShowVirtualKeyboard(false)}
                className="h-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppScreen>
  )
}
