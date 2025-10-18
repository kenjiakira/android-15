"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"

interface TimeContextType {
  time: string
  date: string
  dateChinese: string
  hour: number
  minute: number
  second: number
}

const TimeContext = createContext<TimeContextType | undefined>(undefined)

interface TimeProviderProps {
  children: ReactNode
}

export function TimeProvider({ children }: TimeProviderProps) {
  const [time, setTime] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const [dateChinese, setDateChinese] = useState<string>("")
  const [hour, setHour] = useState<number>(0)
  const [minute, setMinute] = useState<number>(0)
  const [second, setSecond] = useState<number>(0)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      
      setTime(now.toLocaleTimeString("vi-VN", { 
        hour: "2-digit", 
        minute: "2-digit" 
      }))
      
      setDate(now.toLocaleDateString("vi-VN", { 
        weekday: "short", 
        month: "numeric", 
        day: "numeric" 
      }))
      
      const chineseDate = now.toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long"
      })
      setDateChinese(chineseDate)

      setHour(now.getHours())
      setMinute(now.getMinutes())
      setSecond(now.getSeconds())
    }

    updateTime()
    
    const interval = setInterval(updateTime, 1000)
    
    return () => clearInterval(interval)
  }, [])

  const value: TimeContextType = {
    time,
    date,
    dateChinese,
    hour,
    minute,
    second
  }

  return (
    <TimeContext.Provider value={value}>
      {children}
    </TimeContext.Provider>
  )
}

export function useTime() {
  const context = useContext(TimeContext)
  if (context === undefined) {
    throw new Error('useTime must be used within a TimeProvider')
  }
  return context
}
