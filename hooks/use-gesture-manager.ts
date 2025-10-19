"use client"

import { useState, useRef, useCallback } from "react"

interface UseGestureManagerOptions {
  onUnlock: () => void
  threshold?: number
  exitZoneHeight?: number
  isLockScreen?: boolean
}

interface UseGestureManagerReturn {
  dragY: number
  isDragging: boolean
  handleTouchStart: (e: React.TouchEvent) => void
  handleTouchMove: (e: React.TouchEvent) => void
  handleTouchEnd: () => void
  handleMouseDown: (e: React.MouseEvent) => void
  handleMouseMove: (e: React.MouseEvent) => void
  handleMouseUp: () => void
}

export function useGestureManager({ 
  onUnlock, 
  threshold = 60,
  exitZoneHeight = 200,
  isLockScreen = false
}: UseGestureManagerOptions): UseGestureManagerReturn {
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startYRef = useRef(0)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const startY = e.touches[0].clientY
    const windowHeight = window.innerHeight
    
    if (!isLockScreen && startY < windowHeight - exitZoneHeight) {
      // console.log(`Touch start outside exit zone: startY=${startY}, windowHeight=${windowHeight}, exitZoneHeight=${exitZoneHeight}`)
      return
    }
    
    // console.log(`Touch start in exit zone: startY=${startY}, windowHeight=${windowHeight}, exitZoneHeight=${exitZoneHeight}`)
    setIsDragging(true)
    startYRef.current = startY
    setDragY(0)
  }, [exitZoneHeight, isLockScreen])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return
    const currentY = e.touches[0].clientY
    const diff = startYRef.current - currentY
    setDragY(Math.max(0, diff))
  }, [isDragging])

  const handleTouchEnd = useCallback(() => {
    console.log(`Touch end: dragY=${dragY}, threshold=${threshold}`)
    if (dragY > threshold) {
      console.log('Triggering unlock')
      onUnlock()
    }
    setIsDragging(false)
    setDragY(0)
  }, [dragY, threshold, onUnlock])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const startY = e.clientY
    const windowHeight = window.innerHeight

    if (!isLockScreen && startY < windowHeight - exitZoneHeight) {
      return
    }
    
    setIsDragging(true)
    startYRef.current = startY
    setDragY(0)
  }, [exitZoneHeight, isLockScreen])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const currentY = e.clientY
    const diff = startYRef.current - currentY
    setDragY(Math.max(0, diff))
  }, [isDragging])

  const handleMouseUp = useCallback(() => {
    if (dragY > threshold) {
      onUnlock()
    }
    setIsDragging(false)
    setDragY(0)
  }, [dragY, threshold, onUnlock])

  return {
    dragY,
    isDragging,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  }
}
