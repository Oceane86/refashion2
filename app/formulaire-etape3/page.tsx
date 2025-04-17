// app/formulaire-etape3.jsx/page.tsx

"use client"

import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar, Clock4 } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"

export default function FormulaireEtape3() {
  const searchParams = useSearchParams()
  const atelierTitle = searchParams.get("title") || "Retoucherie de Port-Royal"
  const date = searchParams.get("date") || "19.04.2025"
  const heure = searchParams.get("heure") || "14h00"
  const duree = searchParams.get("duree") || "1h00"
  const imageUrl = "/public/placeholder.svg?height=300&width=600&text=Atelier+Paris+Centre"

  return (
    <div className="min-h-screen bg-[#FAF4F2] flex flex-col">
      <Navbar />
      <main className="p-4 flex-grow flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">
          C’est noté ! Vous êtes inscrit à l’atelier. À très bientôt !
        </h1>

        <div className="w-full bg-[#FF6235] rounded-2xl overflow-hidden shadow-md mb-6">
          <div className="relative w-full h-48">
            <Image src={imageUrl} alt="Atelier" fill className="object-cover" />
          </div>
          <div className="p-4">
            <h2 className="font-bold text-lg text-black mb-2">{atelierTitle}</h2>
            <div className="flex gap-2 mb-2">
              <p className="bg-white px-3 py-1 rounded-lg text-sm text-black">{date}</p>
            </div>
            <div className="flex gap-2">
              <p className="bg-white px-3 py-1 rounded-lg text-sm text-black flex items-center gap-1">
                <Clock4 className="w-4 h-4" />
                Heure : {heure}
              </p>
              <p className="bg-white px-3 py-1 rounded-lg text-sm text-black flex items-center gap-1">
                <Clock4 className="w-4 h-4" />
                Durée : {duree}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <Button className="w-full rounded-full bg-black text-white py-3 text-sm font-medium">
            Ajouter au calendrier ?
          </Button>
          <Link href="/">
            <Button variant="ghost" className="w-full rounded-full bg-black text-white py-3 text-sm font-medium">
              Retour à l’accueil
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
