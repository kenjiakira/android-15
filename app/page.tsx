"use client"

import { useState } from "react"
import LockScreen from "@/components/lock-screen"
import HomeScreen from "@/components/home-screen"
import StatusBar from "@/components/status-bar"
import NavigationBar from "@/components/navigation-bar"
import PunchHoleCamera from "@/components/punch-hole-camera"
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
          <div className="absolute top-0 left-0 right-0 z-50 pointer-events-none">
            <StatusBar variant={!isUnlocked ? "dark" : "light"} hideTime={!isUnlocked} />
          </div>
          
          {/* NavigationBar - Fixed at bottom */}
          {isUnlocked && (
            <div className="absolute bottom-0 left-0 right-0 z-50">
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
                onOpenCamera={() => {}} // Dummy function since camera is removed
              />
            )}
          </div>
        </div>
      ) : (
        // Normal mode - with phone frame
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-300 via-slate-200 to-slate-300 p-4 select-none">
          <div className="w-full max-w-sm aspect-[9/20] bg-black rounded-3xl shadow-2xl overflow-hidden border-8 border-slate-900 relative">
            <PunchHoleCamera />

            {/* Phone screen */}
            <div className="w-full h-full bg-background overflow-hidden relative">
              {/* StatusBar - Fixed at top */}
              <div className="absolute top-0 left-0 right-0 z-50 pointer-events-none">
                <StatusBar variant={!isUnlocked ? "dark" : "light"} hideTime={!isUnlocked} />
              </div>
              
              {/* NavigationBar - Fixed at bottom */}
              {isUnlocked && (
                <div className="absolute bottom-0 left-0 right-0 z-50">
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
                    onOpenCamera={() => {}} // Dummy function since camera is removed
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </TimeProvider>
  )
}
