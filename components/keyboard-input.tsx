"use client"

import { useState, useRef, useEffect } from "react"
import { useKeyboard } from "./keyboard-provider"

interface KeyboardInputProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
  isDarkMode?: boolean
  type?: 'text' | 'email' | 'password' | 'number'
}

export default function KeyboardInput({ 
  placeholder = "Type something...", 
  value = "", 
  onChange,
  className = "",
  isDarkMode = true,
  type = 'text'
}: KeyboardInputProps) {
  const [inputValue, setInputValue] = useState(value)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { showKeyboard, hideKeyboard, setKeyPressHandler, setDarkMode } = useKeyboard()

  useEffect(() => {
    setInputValue(value)
  }, [value])

  useEffect(() => {
    setDarkMode(isDarkMode)
  }, [isDarkMode, setDarkMode])

  useEffect(() => {
    const handleKeyPress = (key: string) => {
      if (!isFocused) return

      if (key === 'backspace') {
        setInputValue(prev => prev.slice(0, -1))
      } else if (key === 'enter') {
        hideKeyboard()
        setIsFocused(false)
        if (inputRef.current) {
          inputRef.current.blur()
        }
      } else if (key === 'space') {
        setInputValue(prev => prev + ' ')
      } else if (key.length === 1) {
        setInputValue(prev => prev + key)
      }
    }

    setKeyPressHandler(handleKeyPress)
  }, [isFocused, hideKeyboard, setKeyPressHandler])

  const handleFocus = () => {
    setIsFocused(true)
    showKeyboard()
  }

  const handleBlur = () => {
    setIsFocused(false)
    hideKeyboard()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type={type}
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none ${
          isFocused 
            ? (isDarkMode ? 'border-blue-500 bg-gray-800' : 'border-blue-500 bg-white')
            : (isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50')
        } ${
          isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
        } ${className}`}
        readOnly={isFocused} // Prevent native keyboard when virtual keyboard is active
      />
      
      {/* Focus indicator */}
      {isFocused && (
        <div className={`absolute -top-1 -left-1 -right-1 -bottom-1 rounded-lg border-2 ${
          isDarkMode ? 'border-blue-400' : 'border-blue-500'
        } pointer-events-none animate-pulse`} />
      )}
    </div>
  )
}
