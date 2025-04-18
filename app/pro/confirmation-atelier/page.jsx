"use client"

import { useRouter } from "next/navigation"
import { Search, Menu } from "lucide-react"
import AuthGuard from "@/components/auth-guard"
import Navbar from "@/components/navbar"


// En-tête simple pour la page
function SimpleHeader() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between p-4 max-w-md mx-auto">
        <div className="font-bold text-xl">Re_fashion</div>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full bg-black text-white">
            <Search className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default function ConfirmationAtelier() {
  const router = useRouter()

  return (
    <AuthGuard requireAuth requirePro>
      <div className="flex flex-col min-h-screen bg-[#F9F5F0]">
        <Navbar />

        <main className="flex-grow px-4 pb-8 max-w-md mx-auto flex flex-col">
          <div className="mt-16 mb-auto">
            <h1 className="text-3xl font-bold mb-4">
              Bravo ! Votre atelier est créé, vous serez prévenu des personnes inscrites !
            </h1>
          </div>

          <div className="mb-8 space-y-4">
            <button
              onClick={() => router.push("/")}
              className="w-full font-medium py-4 rounded-full bg-black text-white"
            >
              Retour à l'accueil
            </button>

            <button
              onClick={() => router.push("/pro/mes-ateliers")}
              className="w-full font-medium py-4 rounded-full bg-white border border-black"
            >
              Voir mes ateliers
            </button>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
