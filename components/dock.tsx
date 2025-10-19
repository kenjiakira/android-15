"use client"

import Image from "next/image"

interface DockProps {
  onAppSelect: (appId: string) => void
}

export default function Dock({ onAppSelect }: DockProps) {
  const dockApps = [
    { id: "phone", name: "Phone", image: "/phone.png", color: "from-green-400 to-green-600" },
    { id: "messages", name: "Messages", image: "/messaging.png", color: "from-blue-400 to-blue-600" },
    { id: "browser", name: "Browser", image: "/web-mi.png", color: "from-orange-400 to-orange-600" },
    { id: "camera", name: "Camera", image: "/camera.png", color: "from-purple-400 to-purple-600" },
  ]

  return (
    <div className="mt-8 mb-4">
      <div className="grid grid-cols-4 gap-3 px-2">
        {dockApps.map((app, index) => (
          <button
            key={app.id}
            onClick={() => onAppSelect(app.id)}
            className="animate-slide-up active:scale-90 transition-transform cursor-pointer"
            style={{ animationDelay: `${0.02 * index}s` }}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
          >
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center text-white shadow-lg transition-all active:scale-95 relative overflow-hidden`}
              >
                <Image
                  src={app.image}
                  alt={app.name}
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
