"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import VirtualKeyboard from "./virtual-keyboard"

interface KeyboardContextType {
  isVisible: boolean
  showKeyboard: () => void
  hideKeyboard: () => void
  onKeyPress: (key: string) => void
  setKeyPressHandler: (handler: (key: string) => void) => void
  isDarkMode: boolean
  setDarkMode: (dark: boolean) => void
}

const KeyboardContext = createContext<KeyboardContextType | undefined>(undefined)

export function KeyboardProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false)
  const [keyPressHandler, setKeyPressHandler] = useState<((key: string) => void) | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(true)

  const showKeyboard = () => setIsVisible(true)
  const hideKeyboard = () => setIsVisible(false)

  const onKeyPress = (key: string) => {
    if (keyPressHandler) {
      keyPressHandler(key)
    }
  }

  const setKeyPressHandlerFunc = (handler: (key: string) => void) => {
    setKeyPressHandler(() => handler)
  }

  const setDarkMode = (dark: boolean) => {
    setIsDarkMode(dark)
  }

  return (
    <KeyboardContext.Provider value={{
      isVisible,
      showKeyboard,
      hideKeyboard,
      onKeyPress,
      setKeyPressHandler: setKeyPressHandlerFunc,
      isDarkMode,
      setDarkMode
    }}>
      {children}
      <VirtualKeyboard
        isVisible={isVisible}
        onKeyPress={onKeyPress}
        onClose={hideKeyboard}
        isDarkMode={isDarkMode}
      />
    </KeyboardContext.Provider>
  )
}

export function useKeyboard() {
  const context = useContext(KeyboardContext)
  if (context === undefined) {
    throw new Error('useKeyboard must be used within a KeyboardProvider')
  }
  return context
}
