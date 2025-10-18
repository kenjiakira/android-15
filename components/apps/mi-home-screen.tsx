"use client"

import { useState, useEffect } from "react"
import { 
  Home, 
  Plus, 
  Settings, 
  Menu, 
  Camera, 
  Play, 
  Leaf,
  Pause, 
  Microwave, 
  Lightbulb, 
  Tv, 
  Thermometer,  
  Star, 
  Trash2,
  Sun,
  Moon,
  DoorOpen,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from "lucide-react"
import AppScreen from "@/components/app-screen"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

interface MiHomeScreenProps {
  onBack: () => void
}

interface Device {
  id: string
  name: string
  type: string
  room: string
  status: string
  value?: number
  isOn: boolean
  icon: React.ReactNode
}

interface Room {
  id: string
  name: string
  deviceCount: number
}

const rooms: Room[] = [
  { id: "all", name: "Smart home", deviceCount: 8 },
  { id: "bedroom", name: "Bedroom", deviceCount: 3 },
  { id: "living", name: "Living room", deviceCount: 4 },
  { id: "kitchen", name: "Kitchen", deviceCount: 2 },
  { id: "toilet", name: "Toilet", deviceCount: 1 }
]

const scenarios = [
  { id: "return", name: "Return home", icon: Home },
  { id: "exit", name: "Exit home", icon: DoorOpen },
  { id: "morning", name: "Good morning", icon: Sun },
  { id: "night", name: "Good night", icon: Moon }
]

const devices: Device[] = [
  {
    id: "1",
    name: "Xiaomi smart camera",
    type: "camera",
    room: "Bedroom",
    status: "Live",
    isOn: true,
    icon: <Camera size={24} />
  },
  {
    id: "2",
    name: "Xiaomi smart camera",
    type: "camera",
    room: "Living room",
    status: "Live",
    isOn: true,
    icon: <Camera size={24} />
  },
  {
    id: "3",
    name: "Vacuum",
    type: "vacuum",
    room: "Living room",
    status: "Sweeping",
    isOn: true,
    icon: <Leaf size={24} />
  },
  {
    id: "4",
    name: "Microwave",
    type: "appliance",
    room: "Kitchen",
    status: "Off",
    isOn: false,
    icon: <Microwave size={24} />
  },
  {
    id: "5",
    name: "Bedside lamp",
    type: "light",
    room: "Bedroom",
    status: "50%",
    value: 50,
    isOn: true,
    icon: <Lightbulb size={24} />
  },
  {
    id: "6",
    name: "Mi TV",
    type: "tv",
    room: "Living room",
    status: "Off",
    isOn: false,
    icon: <Tv size={24} />
  },
  {
    id: "7",
    name: "Air-conditioning",
    type: "ac",
    room: "Living room",
    status: "Cool 23°",
    value: 23,
    isOn: true,
    icon: <Thermometer size={24} />
  },
  {
    id: "8",
    name: "Environment",
    type: "sensor",
    room: "Living room",
    status: "1 devices are on",
    value: 1,
    isOn: true,
    icon: <Leaf size={24} />
  }
]

export default function MiHomeScreen({ onBack }: MiHomeScreenProps) {
  const [activeRoom, setActiveRoom] = useState("all")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [selectedHome, setSelectedHome] = useState("My home")
  
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('miHomeAppDarkMode')
    if (savedDarkMode !== null) {
      setIsDarkMode(savedDarkMode === 'true')
    } else {
      localStorage.setItem('miHomeAppDarkMode', 'true')
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newValue = !prev
      localStorage.setItem('miHomeAppDarkMode', String(newValue))
      return newValue
    })
  }

  const filteredDevices = activeRoom === "all" 
    ? devices 
    : devices.filter(device => device.room.toLowerCase().replace(" ", "") === activeRoom)

  const handleDeviceToggle = (deviceId: string) => {
    // Simulate device toggle
    console.log(`Toggling device ${deviceId}`)
  }

  const handleScenario = (scenarioId: string) => {
    // Simulate scenario execution
    console.log(`Executing scenario ${scenarioId}`)
  }

  return (
    <AppScreen onBack={onBack} variant={isDarkMode ? "dark" : "light"} hideDefaultHeader={true} allowContentScroll={false} noPadding={true}>
      <div className={`flex flex-col h-full ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header */}
        <div className={`px-4 py-3 flex items-center justify-between ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex items-center">
            <button 
              onClick={onBack}
              className={`p-2 rounded-full ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              <ChevronLeft size={20} />
            </button>
             <DropdownMenu.Root>
               <DropdownMenu.Trigger asChild>
                 <button className={`ml-2 flex items-center space-x-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                   <span>{selectedHome}</span>
                   <ChevronDown size={16} />
                 </button>
               </DropdownMenu.Trigger>
               <DropdownMenu.Portal>
                 <DropdownMenu.Content 
                   className={`min-w-[160px] ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-md shadow-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-1`}
                   sideOffset={5}
                 >
                   <DropdownMenu.Item 
                     className={`px-3 py-2 text-sm rounded-sm cursor-pointer ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'}`}
                     onSelect={() => setSelectedHome("My home")}
                   >
                     My home
                   </DropdownMenu.Item>
                   <DropdownMenu.Item 
                     className={`px-3 py-2 text-sm rounded-sm cursor-pointer ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'}`}
                     onSelect={() => setSelectedHome("Office")}
                   >
                     Office
                   </DropdownMenu.Item>
                   <DropdownMenu.Item 
                     className={`px-3 py-2 text-sm rounded-sm cursor-pointer ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'}`}
                     onSelect={() => setSelectedHome("Vacation home")}
                   >
                     Vacation home
                   </DropdownMenu.Item>
                 </DropdownMenu.Content>
               </DropdownMenu.Portal>
             </DropdownMenu.Root>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
            >
              <Plus size={20} className={isDarkMode ? "text-gray-300" : "text-gray-700"} />
            </button>
            <button className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <Settings size={20} className={isDarkMode ? "text-gray-300" : "text-gray-700"} />
            </button>
          </div>
        </div>

        {/* Room Navigation */}
        <div className={`px-4 py-3 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
            {rooms.map(room => (
              <button
                key={room.id}
                onClick={() => setActiveRoom(room.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap ${
                  activeRoom === room.id
                    ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
                    : isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}
              >
                <span className="text-sm font-medium">{room.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activeRoom === room.id
                    ? isDarkMode ? 'bg-blue-500' : 'bg-blue-200'
                    : isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  {room.deviceCount}
                </span>
              </button>
            ))}
            <button className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <Menu size={20} className={isDarkMode ? "text-gray-300" : "text-gray-700"} />
            </button>
          </div>
        </div>

        {/* Quick Status */}
        <div className="px-4 py-3">
          <div className="flex space-x-3">
            <div className={`flex-1 p-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center space-x-2">
                <Thermometer size={16} className={isDarkMode ? "text-blue-400" : "text-blue-600"} />
                <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>22°</span>
              </div>
            </div>
            <div className={`flex-1 p-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center space-x-2">
                <Leaf size={16} className={isDarkMode ? "text-green-400" : "text-green-600"} />
                <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>40%</span>
              </div>
            </div>
            <div className={`flex-1 p-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center space-x-2">
                <Leaf size={16} className={isDarkMode ? "text-amber-400" : "text-amber-600"} />
                <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>155</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scenarios */}
        <div className="px-4 py-3">
          <div className="flex space-x-3">
            {scenarios.map(scenario => (
              <button
                key={scenario.id}
                onClick={() => handleScenario(scenario.id)}
                className={`flex-1 p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <scenario.icon size={24} className={isDarkMode ? "text-blue-400" : "text-blue-600"} />
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {scenario.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Device Cards */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-20">
          <div className="grid grid-cols-2 gap-4">
            {/* Camera Cards */}
            {filteredDevices.filter(d => d.type === "camera").map(device => (
              <div key={device.id} className={`col-span-2 rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="relative">
                  <div className={`h-32 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
                    <Camera size={32} className={isDarkMode ? "text-gray-500" : "text-gray-400"} />
                  </div>
                  <div className="absolute top-2 left-2 flex items-center space-x-2">
                    <div className={`px-2 py-1 rounded-full ${isDarkMode ? 'bg-black/50' : 'bg-white/50'}`}>
                      <span className={`text-xs ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{device.status}</span>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <button className={`p-2 rounded-full ${isDarkMode ? 'bg-black/50' : 'bg-white/50'}`}>
                      {device.isOn ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white" />}
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{device.name}</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{device.room}</p>
                </div>
              </div>
            ))}

            {/* Other Device Cards */}
            {filteredDevices.filter(d => d.type !== "camera").map(device => (
              <div key={device.id} className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      {device.icon}
                    </div>
                    <div>
                      <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{device.name}</h4>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{device.room}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{device.status}</p>
                  
                  {device.value !== undefined && (
                    <div className="flex items-center space-x-2">
                      <div className={`flex-1 h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <div 
                          className={`h-2 rounded-full ${isDarkMode ? 'bg-blue-500' : 'bg-blue-500'}`}
                          style={{ width: `${device.value}%` }}
                        ></div>
                      </div>
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{device.value}%</span>
                    </div>
                  )}
                  
                  {device.type === "ac" && (
                    <div className="flex items-center justify-between">
                      <button className={`p-1 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <ChevronLeft size={16} className={isDarkMode ? "text-gray-300" : "text-gray-600"} />
                      </button>
                      <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{device.value}°</span>
                      <button className={`p-1 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <ChevronRight size={16} className={isDarkMode ? "text-gray-300" : "text-gray-600"} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className={`absolute bottom-0 left-0 right-0 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex items-center justify-around py-3">
            <button className={`flex flex-col items-center ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              <Home size={20} />
              <span className="text-xs mt-1">Mi home</span>
            </button>
            <button className={`flex flex-col items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Settings size={20} />
              <span className="text-xs mt-1">Automation</span>
            </button>
            <button className={`flex flex-col items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Settings size={20} />
              <span className="text-xs mt-1">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </AppScreen>
  )
}
