"use client"

import { useState, useEffect } from "react"
import { Search, Menu, User, LogOut } from "lucide-react"
import Link from "next/link"
import { getCurrentUser, logout, isPro, isAuthenticated } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [auth, setAuth] = useState(false)
  const [isProfessional, setIsProfessional] = useState(false)
  const [userName, setUserName] = useState("")

  useEffect(() => {
    // Vérifier l'authentification
    const authStatus = isAuthenticated()
    setAuth(authStatus)

    if (authStatus) {
      // Récupérer les informations de l'utilisateur
      const user = getCurrentUser()
      if (user) {
        setUserName(user.name)
        setIsProfessional(isPro())
      }
    }
  }, [])

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
    router.push("/")
    // Recharger la page pour mettre à jour l'état d'authentification
    window.location.reload()
  }

  return (
    <header className="sticky top-0 z-10 bg-white px-4 py-4 flex justify-between items-center shadow-sm">
      <Link href="/" className="font-bold text-xl">
        <span className="font-sans">Re_fashion</span>
      </Link>

      <div className="flex items-center space-x-2">
        <button className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
          <Search className="w-5 h-5 text-white" />
        </button>
        <div className="relative">
          <button className="w-10 h-10 flex items-center justify-center" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-6 h-6" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
              {auth ? (
                <>
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium">{userName}</p>
                    <p className="text-xs text-gray-500">{isProfessional ? "Professionnel" : "Particulier"}</p>
                  </div>
                  {isProfessional && (
                    <>
                      <Link href="/pro/mes-ateliers">
                        <div
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Mes ateliers
                        </div>
                      </Link>
                      <Link href="/pro/creer-atelier">
                        <div
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Créer un atelier
                        </div>
                      </Link>
                    </>
                  )}
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    <div className="flex items-center">
                      <LogOut className="h-4 w-4 mr-2" />
                      Se déconnecter
                    </div>
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login">
                    <div
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Se connecter
                      </div>
                    </div>
                  </Link>
                  <Link href="/auth/register">
                    <div
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      S'inscrire
                    </div>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
