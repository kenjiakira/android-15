"use client"

interface DragFeedbackAnimationProps {
  currentApp: string | null
  isDragging: boolean
  dragY: number
}

export function DragFeedbackAnimation({ currentApp, isDragging, dragY }: DragFeedbackAnimationProps) {
  if (!currentApp || !isDragging || dragY <= 0) return null

  return (
    <div className="absolute inset-0 z-40 pointer-events-none">
      <div 
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/30 via-white/10 to-transparent transition-all duration-100"
        style={{ height: `${Math.min(dragY * 2, 200)}px` }}
      ></div>
      <div 
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/80 text-sm font-medium transition-all duration-100"
        style={{ 
          transform: `translate(-50%, ${Math.min(dragY * 0.5, 20)}px)`,
          opacity: Math.min(dragY / 30, 1)
        }}
      >
        {dragY > 20 ? "Release to go home" : "Swipe up to go home"}
      </div>
    </div>
  )
}

interface AppExitAnimationProps {
  isTransitioning: boolean
  children: React.ReactNode
  onExited?: () => void
}

export function AppExitAnimation({ isTransitioning, children, onExited }: AppExitAnimationProps) {
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (!isTransitioning) return
    if (e.target !== e.currentTarget) return
    onExited?.()
  }
  return (
    <div 
      className={`flex-1 overflow-hidden relative z-20 transition-all duration-300 ${
        isTransitioning ? 'scale-95 opacity-90' : 'scale-100 opacity-100'
      }`}
      onTransitionEnd={handleTransitionEnd}
    >
      {children}
    </div>
  )
}


interface AppEnterAnimationProps {
  currentApp: string | null
  isEntering: boolean
  isExiting?: boolean
  onExited?: () => void
  children: React.ReactNode
}

export function AppEnterAnimation({ currentApp, isEntering, isExiting = false, onExited, children }: AppEnterAnimationProps) {
  if (!currentApp) return null

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (!isExiting) return
    if (e.target !== e.currentTarget) return
    onExited?.()
  }

  const stateClass = isExiting
    ? 'scale-90 opacity-0'
    : (isEntering ? 'scale-90 opacity-0' : 'scale-100 opacity-100')

  return (
    <div 
      className={`absolute inset-0 z-50 transition-all duration-300 ${stateClass}`}
      onTransitionEnd={handleTransitionEnd}
    >
      {children}
    </div>
  )
}
