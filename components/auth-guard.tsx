"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { isAuthenticated, isPro } from "@/lib/auth"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  requirePro?: boolean
}

export default function AuthGuard({ children, requireAuth = false, requirePro = false }: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Vérifier l'authentification
    if (requireAuth && !isAuthenticated()) {
      router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`)
      return
    }

    // Vérifier si l'utilisateur est un pro
    if (requirePro && !isPro()) {
      router.push("/")
      return
    }

    setIsLoading(false)
  }, [requireAuth, requirePro, router, pathname])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    )
  }

  return <>{children}</>
}
