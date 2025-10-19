"use client"

import { useState, useRef, useCallback } from "react"

interface UseGestureManagerOptions {
  onUnlock: () => void
  threshold?: number
  exitZoneHeight?: number
  isLockScreen?: boolean
  enableFingerprint?: boolean
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
  // Fingerprint unlock
  isFingerprintPressed: boolean
  showWaveAnimation: boolean
  waveProgress: number
  handleFingerprintPress: () => void
  handleFingerprintRelease: () => void
}

export function useGestureManager({ 
  onUnlock, 
  threshold = 60,
  exitZoneHeight = 200,
  isLockScreen = false,
  enableFingerprint = false
}: UseGestureManagerOptions): UseGestureManagerReturn {
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startYRef = useRef(0)
  
  const [isFingerprintPressed, setIsFingerprintPressed] = useState(false)
  const [showWaveAnimation, setShowWaveAnimation] = useState(false)
  const [waveProgress, setWaveProgress] = useState(0)
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null)
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null)

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

  const handleFingerprintPress = useCallback(() => {
    if (!enableFingerprint) return
    
    console.log('Fingerprint pressed!')
    setIsFingerprintPressed(true)
    setShowWaveAnimation(true)
    setWaveProgress(0)
    
    const startTime = Date.now()
    progressTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / 500, 1) 
      setWaveProgress(progress)
    }, 16) // ~60fps
    
    pressTimerRef.current = setTimeout(() => {
      console.log('Fingerprint unlock triggered!')
      onUnlock()
      setIsFingerprintPressed(false)
      setShowWaveAnimation(false)
      setWaveProgress(0)
    }, 500)
  }, [enableFingerprint, onUnlock])

  const handleFingerprintRelease = useCallback(() => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current)
      pressTimerRef.current = null
    }
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current)
      progressTimerRef.current = null
    }
    setIsFingerprintPressed(false)
    setShowWaveAnimation(false)
    setWaveProgress(0)
  }, [])

  return {
    dragY,
    isDragging,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    isFingerprintPressed,
    showWaveAnimation,
    waveProgress,
    handleFingerprintPress,
    handleFingerprintRelease,
  }
}
