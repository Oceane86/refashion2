"use client"

import { useState, useEffect } from "react"
import { CheckCircle } from "lucide-react"

interface NotificationProps {
  show: boolean
  message: string
  onClose: () => void
}

export default function Notification({ show, message, onClose }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      // Fermer automatiquement après 3 secondes
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 300) // Attendre la fin de l'animation avant d'appeler onClose
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show && !isVisible) return null

  return (
    <div
      className={`fixed top-20 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 transition-all duration-300 z-50 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
      }`}
    >
      <CheckCircle className="h-6 w-6 text-green-400" />
      <p>{message}</p>
    </div>
  )
}
