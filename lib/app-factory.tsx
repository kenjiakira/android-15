"use client"

import { useEffect } from "react"
import AppRouter from "./app-router"
import SettingsScreen from "@/components/apps/settings-screen"
import GalleryScreen from "@/components/apps/gallery-screen"
import GameCenterScreen from "@/components/apps/game-center-screen"
import ContactsScreen from "@/components/apps/contacts-screen"
import MiStoreScreen from "@/components/apps/mi-store-screen"
import MiVideoScreen from "@/components/apps/mi-video-screen"
import RadioFMScreen from "@/components/apps/radio-fm-screen"
import ChatGPTScreen from "@/components/apps/chatgpt-screen"
import GoogleScreen from "@/components/apps/google-screen"
import GmailScreen from "@/components/apps/gmail-screen"
import GoogleMapsScreen from "@/components/apps/google-maps-screen"
import MiHomeScreen from "@/components/apps/mi-home-screen"
import YouTubeScreen from "@/components/apps/youtube-screen"
import FacebookScreen from "@/components/apps/facebook-screen"
import ZaloScreen from "@/components/apps/zalo-screen"
import GooglePhotosScreen from "@/components/apps/google-photos-screen"
import KeyboardScreen from "@/components/apps/keyboard-screen"

export function registerAppComponents() {
  const appRouter = AppRouter.getInstance()

  appRouter.registerApp("settings", SettingsScreen)
  appRouter.registerApp("gallery", GalleryScreen)
  appRouter.registerApp("game", GameCenterScreen)
  appRouter.registerApp("phonebook", ContactsScreen)
  appRouter.registerApp("xiaomi", MiStoreScreen)
  appRouter.registerApp("mi-video", MiVideoScreen)
  appRouter.registerApp("radio", RadioFMScreen)
  appRouter.registerApp("chatgpt", ChatGPTScreen)
  appRouter.registerApp("google", GoogleScreen)
  appRouter.registerApp("gmail", GmailScreen)
  appRouter.registerApp("google-maps", GoogleMapsScreen)
  appRouter.registerApp("mi-home", MiHomeScreen)
  appRouter.registerApp("youtube", YouTubeScreen)
  appRouter.registerApp("facebook", FacebookScreen)
  appRouter.registerApp("zalo", ZaloScreen)
  appRouter.registerApp("google-photo", GooglePhotosScreen)
  appRouter.registerApp("keyboard", KeyboardScreen)
}

export function useAppRegistration() {
  useEffect(() => {
    registerAppComponents()
  }, [])
}

export function registerApp(
  appId: string, 
  component: React.ComponentType<any>, 
  props?: Record<string, any>
) {
  const appRouter = AppRouter.getInstance()
  appRouter.registerApp(appId, component, props)
}

export function unregisterApp(appId: string) {
  const appRouter = AppRouter.getInstance()
  console.log(`Unregistering app: ${appId}`)
}
