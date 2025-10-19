"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

interface PersonalPhotoWidgetProps {
  onTap?: () => void
}

export default function PersonalPhotoWidget({ 
  onTap 
}: PersonalPhotoWidgetProps) {
  const [imageUrl, setImageUrl] = useState("")

  const landscapeImages = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop&crop=center", 
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=400&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=400&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center"
  ]

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * landscapeImages.length)
    setImageUrl(landscapeImages[randomIndex])
  }, [])

  return (
    <button
      onClick={onTap}
      className="w-full h-full bg-white/10 backdrop-blur-md rounded-3xl p-4 flex flex-col items-center justify-center space-y-3 active:scale-95 transition-transform relative overflow-hidden aspect-square"
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Landscape"
          fill
          className="object-cover rounded-3xl"
          unoptimized
        />
      )}
      {/* Subtle overlay for better touch feedback */}
      <div className="absolute inset-0 bg-black/10 hover:bg-black/5 transition-colors rounded-3xl" />
    </button>
  )
}
