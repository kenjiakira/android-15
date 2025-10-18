"use client"

import { useState, useRef, useCallback } from "react"

interface UseGestureManagerOptions {
  onUnlock: () => void
  threshold?: number
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
  threshold = 60 
}: UseGestureManagerOptions): UseGestureManagerReturn {
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startYRef = useRef(0)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true)
    startYRef.current = e.touches[0].clientY
    setDragY(0)
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return
    const currentY = e.touches[0].clientY
    const diff = startYRef.current - currentY
    setDragY(Math.max(0, diff))
  }, [isDragging])

  const handleTouchEnd = useCallback(() => {
    if (dragY > threshold) {
      onUnlock()
    }
    setIsDragging(false)
    setDragY(0)
  }, [dragY, threshold, onUnlock])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    startYRef.current = e.clientY
    setDragY(0)
  }, [])

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
