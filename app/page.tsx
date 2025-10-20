"use client"

import { useState } from "react"
import LockScreen from "@/components/lock-screen"
import HomeScreen from "@/components/home-screen"
import StatusBar from "@/components/status-bar"
import NavigationBar from "@/components/navigation-bar"
import PhoneFrame from "@/components/phone-frame"
import { TimeProvider } from "@/components/time-provider"
import { useFullscreen } from "@/components/fullscreen-context"

export default function Page() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const { isFullscreen } = useFullscreen()

  return (
    <TimeProvider>
      {isFullscreen ? (
        // Fullscreen mode - no phone frame, just the content
        <div className="w-full h-screen bg-background overflow-hidden relative">
          {/* StatusBar - Fixed at top */}
          <div className="absolute top-2 left-4 right-4 z-60 pointer-events-none">
            <StatusBar variant={!isUnlocked ? "dark" : "light"} hideTime={!isUnlocked} />
          </div>
          
          {/* NavigationBar - Fixed at bottom */}
          {isUnlocked && (
            <div className="absolute bottom-0 left-0 right-0 z-60">
              <NavigationBar variant="light" />
            </div>
          )}

          {/* Main content - full screen */}
          <div className="w-full h-full">
            {!isUnlocked ? (
              <LockScreen onUnlock={() => setIsUnlocked(true)} />
            ) : (
              <HomeScreen 
                onLock={() => setIsUnlocked(false)}
                onOpenCamera={() => {}} 
              />
            )}
          </div>
        </div>
      ) : (
        <PhoneFrame>
          {/* StatusBar - Fixed at top */}
          <div className="absolute top-1 left-3 right-3 z-60 pointer-events-none">
            <StatusBar variant={!isUnlocked ? "dark" : "light"} hideTime={!isUnlocked} />
          </div>
          
          {/* NavigationBar - Fixed at bottom */}
          {isUnlocked && (
            <div className="absolute bottom-0 left-0 right-0 z-60">
              <NavigationBar variant="light" />
            </div>
          )}

          {/* Main content - full screen */}
          <div className="w-full h-full">
            {!isUnlocked ? (
              <LockScreen onUnlock={() => setIsUnlocked(true)} />
            ) : (
              <HomeScreen 
                onLock={() => setIsUnlocked(false)}
                onOpenCamera={() => {}} 
              />
            )}
          </div>
        </PhoneFrame>
      )}
    </TimeProvider>
  )
}
