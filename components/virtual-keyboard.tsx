"use client"

import { useState, useEffect } from "react"
import { 
  Backpack, 
  Space, 
  Send, 
  ArrowRight, 
  Globe, 
  Mic, 
  Smile,
  ChevronUp,
  ChevronDown
} from "lucide-react"

interface VirtualKeyboardProps {
  isVisible: boolean
  onKeyPress: (key: string) => void
  onClose: () => void
  isDarkMode?: boolean
}

const QWERTY_LAYOUT = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
]

const NUMBERS_LAYOUT = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['-', '/', ':', ';', '(', ')', '$', '&', '@', '"'],
  ['.', ',', '?', '!', "'", ':', ';', '(', ')']
]

const SYMBOLS_LAYOUT = [
  ['[', ']', '{', '}', '#', '%', '^', '*', '+', '='],
  ['_', '\\', '|', '~', '<', '>', '€', '£', '¥', '•'],
  ['.', ',', '?', '!', "'", ':', ';', '(', ')']
]

export default function VirtualKeyboard({ 
  isVisible, 
  onKeyPress, 
  onClose, 
  isDarkMode = true 
}: VirtualKeyboardProps) {
  const [isShift, setIsShift] = useState(false)
  const [isNumbers, setIsNumbers] = useState(false)
  const [isSymbols, setIsSymbols] = useState(false)
  const [currentLayout, setCurrentLayout] = useState<'letters' | 'numbers' | 'symbols'>('letters')

  useEffect(() => {
    if (isVisible) {
      // Reset keyboard state when opening
      setIsShift(false)
      setIsNumbers(false)
      setIsSymbols(false)
      setCurrentLayout('letters')
    }
  }, [isVisible])

  const handleKeyPress = (key: string) => {
    if (key === 'shift') {
      setIsShift(!isShift)
      return
    }
    
    if (key === 'numbers') {
      setCurrentLayout('numbers')
      setIsNumbers(true)
      setIsSymbols(false)
      return
    }
    
    if (key === 'symbols') {
      setCurrentLayout('symbols')
      setIsSymbols(true)
      setIsNumbers(false)
      return
    }
    
    if (key === 'letters') {
      setCurrentLayout('letters')
      setIsNumbers(false)
      setIsSymbols(false)
      return
    }

    let finalKey = key
    
    if (key === 'space') {
      finalKey = ' '
    } else if (key === 'backspace') {
      finalKey = 'backspace'
    } else if (key === 'enter') {
      finalKey = 'enter'
    } else if (isShift && currentLayout === 'letters') {
      finalKey = key.toUpperCase()
    }

    onKeyPress(finalKey)
    
    // Auto-disable shift after key press
    if (isShift && key !== 'shift') {
      setIsShift(false)
    }
  }

  const getCurrentLayout = () => {
    switch (currentLayout) {
      case 'numbers':
        return NUMBERS_LAYOUT
      case 'symbols':
        return SYMBOLS_LAYOUT
      default:
        return QWERTY_LAYOUT
    }
  }

  const getKeyButtonClass = (key: string) => {
    const baseClass = `flex-1 h-12 mx-0.5 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-150 active:scale-95`
    
    if (key === 'space') {
      return `${baseClass} flex-[3] ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`
    }
    
    if (key === 'backspace' || key === 'enter') {
      return `${baseClass} flex-[1.5] ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`
    }
    
    if (key === 'shift' && isShift) {
      return `${baseClass} ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`
    }
    
    if (key === 'numbers' && isNumbers) {
      return `${baseClass} ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`
    }
    
    if (key === 'symbols' && isSymbols) {
      return `${baseClass} ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`
    }
    
    if (key === 'letters' && currentLayout === 'letters') {
      return `${baseClass} ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`
    }
    
    return `${baseClass} ${isDarkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`
  }

  if (!isVisible) return null

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} shadow-2xl`}>
      {/* Keyboard Header */}
      <div className={`px-4 py-2 flex items-center justify-between ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => handleKeyPress('letters')}
            className={`px-3 py-1 rounded text-xs font-medium ${currentLayout === 'letters' ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') : (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}
          >
            ABC
          </button>
          <button 
            onClick={() => handleKeyPress('numbers')}
            className={`px-3 py-1 rounded text-xs font-medium ${currentLayout === 'numbers' ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') : (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}
          >
            123
          </button>
          <button 
            onClick={() => handleKeyPress('symbols')}
            className={`px-3 py-1 rounded text-xs font-medium ${currentLayout === 'symbols' ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') : (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}
          >
            #+=
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => handleKeyPress('shift')}
            className={`p-2 rounded ${isShift ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') : (isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-300 text-gray-700')}`}
          >
            <ArrowRight size={16} />
          </button>
          <button 
            onClick={onClose}
            className={`p-2 rounded ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-300 text-gray-700'}`}
          >
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Keyboard Body */}
      <div className="p-2">
        {/* Letter/Symbol Rows */}
        {getCurrentLayout().map((row, rowIndex) => (
          <div key={rowIndex} className="flex mb-1">
            {row.map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className={getKeyButtonClass(key)}
              >
                {key}
              </button>
            ))}
          </div>
        ))}

        {/* Bottom Row */}
        <div className="flex mb-1">
          <button
            onClick={() => handleKeyPress('shift')}
            className={getKeyButtonClass('shift')}
          >
            <ArrowRight size={16} />
          </button>
          
          <button
            onClick={() => handleKeyPress('space')}
            className={getKeyButtonClass('space')}
          >
            <Space size={16} />
          </button>
          
          <button
            onClick={() => handleKeyPress('backspace')}
            className={getKeyButtonClass('backspace')}
          >
            <Backpack size={16} />
          </button>
        </div>

        {/* Function Row */}
        <div className="flex">
          <button
            onClick={() => handleKeyPress('123')}
            className={`flex-1 h-10 mx-0.5 rounded-lg flex items-center justify-center text-sm font-medium ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-900'}`}
          >
            123
          </button>
          
          <button
            onClick={() => handleKeyPress('mic')}
            className={`flex-1 h-10 mx-0.5 rounded-lg flex items-center justify-center text-sm font-medium ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-900'}`}
          >
            <Mic size={16} />
          </button>
          
          <button
            onClick={() => handleKeyPress('enter')}
            className={`flex-1 h-10 mx-0.5 rounded-lg flex items-center justify-center text-sm font-medium ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-900'}`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
