"use client"

import { useState } from "react"
import AppScreen from "@/components/app-screen"
import MyDevicesScreen from "@/components/settings/my-devices-screen"
import DeviceSpecsScreen from "@/components/settings/device-specs-screen"
import { useSettingsNavigation } from "@/hooks/use-settings-navigation"
import { 
  ArrowRightLeft, 
  User, 
  Smartphone, 
  Wifi, 
  Bluetooth, 
  Smartphone as MobileNetwork, 
  Link, 
  Palette, 
  Lock, 
  Bell, 
  Home, 
  Sun, 
  Volume2, 
  Fingerprint, 
  Shield, 
  Settings, 
  Battery, 
  Clock, 
  Bot, 
  MoreHorizontal, 
  MessageCircle 
} from "lucide-react"

interface SettingsScreenProps {
  onBack: () => void
}

interface SettingItem {
  id: string
  icon: string
  title: string
  subtitle?: string
  status?: string
  hasNotification?: boolean
  iconColor?: string
}

export default function SettingsScreen({ onBack }: SettingsScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const { currentScreen, navigateToScreen, goBack, canGoBack } = useSettingsNavigation()

  const settingsSections = [
    {
      title: "Data Migration",
      items: [
        {
          id: "migrate-data",
          icon: "ArrowRightLeft",
          title: "Migrate old device data to this device",
          subtitle: "All brands of devices support migration",
          iconColor: "bg-blue-500"
        }
      ]
    },
    {
      title: "Account & Device",
      items: [
        {
          id: "xiaomi-account",
          icon: "User",
          title: "Sign in to Xiaomi Account",
          subtitle: "Enjoy more Xiaomi services",
          hasNotification: true,
          iconColor: "bg-gray-400"
        },
        {
          id: "my-devices",
          icon: "Smartphone",
          title: "My devices",
          iconColor: "bg-gray-300"
        }
      ]
    },
    {
      title: "Connectivity",
      items: [
        {
          id: "wlan",
          icon: "Wifi",
          title: "WLAN",
          iconColor: "bg-blue-500"
        },
        {
          id: "bluetooth",
          icon: "Bluetooth",
          title: "Bluetooth",
          status: "On",
          iconColor: "bg-blue-500"
        },
        {
          id: "mobile-network",
          icon: "MobileNetwork",
          title: "Mobile network",
          iconColor: "bg-green-500"
        },
        {
          id: "more-connections",
          icon: "Link",
          title: "More connections",
          iconColor: "bg-gray-400"
        }
      ]
    },
    {
      title: "Personalization & Display",
      items: [
        {
          id: "wallpaper",
          icon: "Palette",
          title: "Wallpaper & personalization",
          iconColor: "bg-blue-500"
        },
        {
          id: "lock-screen",
          icon: "Lock",
          title: "Lock screen",
          iconColor: "bg-orange-500"
        },
        {
          id: "notifications",
          icon: "Bell",
          title: "Notifications & status bar",
          iconColor: "bg-blue-500"
        },
        {
          id: "home-screen",
          icon: "Home",
          title: "Home screen",
          iconColor: "bg-gray-400"
        },
        {
          id: "display",
          icon: "Sun",
          title: "Display & brightness",
          iconColor: "bg-yellow-500"
        },
        {
          id: "sound",
          icon: "Volume2",
          title: "Sound & haptics",
          iconColor: "bg-green-500"
        }
      ]
    },
    {
      title: "Security, Apps & Battery",
      items: [
        {
          id: "fingerprint",
          icon: "Fingerprint",
          title: "Fingerprint, face & password",
          iconColor: "bg-purple-500"
        },
        {
          id: "privacy",
          icon: "Shield",
          title: "Privacy & security",
          iconColor: "bg-blue-500"
        },
        {
          id: "app-settings",
          icon: "Settings",
          title: "App settings",
          iconColor: "bg-blue-500"
        },
        {
          id: "battery",
          icon: "Battery",
          title: "Battery saver & battery",
          iconColor: "bg-orange-500"
        }
      ]
    },
    {
      title: "Digital Wellbeing, AI & More",
      items: [
        {
          id: "screen-time",
          icon: "Clock",
          title: "Screen time management",
          iconColor: "bg-orange-500"
        },
        {
          id: "xiao-ai",
          icon: "Bot",
          title: "Xiao Ai",
          iconColor: "bg-gradient-to-r from-blue-500 to-green-500"
        },
        {
          id: "more-settings",
          icon: "MoreHorizontal",
          title: "More settings",
          iconColor: "bg-gray-400"
        }
      ]
    },
    {
      title: "Feedback",
      items: [
        {
          id: "feedback",
          icon: "MessageCircle",
          title: "Feedback",
          iconColor: "bg-blue-500"
        }
      ]
    }
  ]

  const handleSettingClick = (settingId: string) => {
    console.log(`Clicked on setting: ${settingId}`)
    
    switch (settingId) {
      case "my-devices":
        navigateToScreen("my-devices")
        break
      case "device-specs":
        navigateToScreen("device-specs")
        break
      case "wlan":
        navigateToScreen("wlan")
        break
      case "bluetooth":
        navigateToScreen("bluetooth")
        break
      case "mobile-network":
        navigateToScreen("mobile-network")
        break
      case "wallpaper":
        navigateToScreen("wallpaper")
        break
      case "lock-screen":
        navigateToScreen("lock-screen")
        break
      case "notifications":
        navigateToScreen("notifications")
        break
      case "home-screen":
        navigateToScreen("home-screen")
        break
      case "display":
        navigateToScreen("display")
        break
      case "sound":
        navigateToScreen("sound")
        break
      case "fingerprint":
        navigateToScreen("fingerprint")
        break
      case "privacy":
        navigateToScreen("privacy")
        break
      case "app-settings":
        navigateToScreen("app-settings")
        break
      case "battery":
        navigateToScreen("battery")
        break
      default:
        console.log(`Setting ${settingId} not implemented yet`)
    }
  }

  const getIconComponent = (iconName: string) => {
    const iconProps = { className: "w-5 h-5 text-white" }
    
    switch (iconName) {
      case "ArrowRightLeft": return <ArrowRightLeft {...iconProps} />
      case "User": return <User {...iconProps} />
      case "Smartphone": return <Smartphone {...iconProps} />
      case "Wifi": return <Wifi {...iconProps} />
      case "Bluetooth": return <Bluetooth {...iconProps} />
      case "MobileNetwork": return <MobileNetwork {...iconProps} />
      case "Link": return <Link {...iconProps} />
      case "Palette": return <Palette {...iconProps} />
      case "Lock": return <Lock {...iconProps} />
      case "Bell": return <Bell {...iconProps} />
      case "Home": return <Home {...iconProps} />
      case "Sun": return <Sun {...iconProps} />
      case "Volume2": return <Volume2 {...iconProps} />
      case "Fingerprint": return <Fingerprint {...iconProps} />
      case "Shield": return <Shield {...iconProps} />
      case "Settings": return <Settings {...iconProps} />
      case "Battery": return <Battery {...iconProps} />
      case "Clock": return <Clock {...iconProps} />
      case "Bot": return <Bot {...iconProps} />
      case "MoreHorizontal": return <MoreHorizontal {...iconProps} />
      case "MessageCircle": return <MessageCircle {...iconProps} />
      default: return <Settings {...iconProps} />
    }
  }

  if (currentScreen === "my-devices") {
    return <MyDevicesScreen onBack={canGoBack ? goBack : onBack} />
  }

  if (currentScreen === "device-specs") {
    return <DeviceSpecsScreen onBack={canGoBack ? goBack : onBack} />
  }

  return (
    <AppScreen 
      onBack={onBack}
      showSearch={true}
      searchPlaceholder="Search system settings items"
      onSearch={setSearchQuery}
    >
      {/* Settings Title */}
      <div className="mb-6">
        <h1 className="text-white text-2xl font-semibold">Settings</h1>
      </div>
      
      {settingsSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            {section.items.map((item, itemIndex) => (
              <div
                key={item.id}
                onClick={() => handleSettingClick(item.id)}
                className="flex items-center py-4 px-4 bg-gray-800 rounded-lg mb-2 cursor-pointer hover:bg-gray-700 transition-colors"
              >

                {/* Icon */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${item.iconColor}`}>
                  {getIconComponent(item.icon)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <h3 className="text-white font-medium text-base truncate">{item.title}</h3>
                    {'hasNotification' in item && item.hasNotification && (
                      <div className="w-2 h-2 bg-red-500 rounded-full ml-2"></div>
                    )}
                  </div>
                  {'subtitle' in item && item.subtitle && (
                    <p className="text-gray-400 text-sm mt-1 truncate">{item.subtitle}</p>
                  )}
                </div>

                {/* Status or Arrow */}
                <div className="flex items-center">
                  {'status' in item && item.status && (
                    <span className="text-gray-400 text-sm mr-2">{item.status}</span>
                  )}
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        ))}
    </AppScreen>
  )
}
