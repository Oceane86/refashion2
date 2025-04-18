"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Calendar, Search, Menu } from "lucide-react"
import AuthGuard from "@/components/auth-guard"
import Image from "next/image"
import Navbar from "@/components/navbar"


interface AtelierData {
    titre: string
    date: string
    heure: string
    adresse: string
    vetementTypes: string[]
    defauts: string[]
    capacite: string
    prix: string
    duree?: string
}

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

export default function RecapitulatifAtelier() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [atelierData, setAtelierData] = useState<AtelierData | null>(null)

    useEffect(() => {

        const data: AtelierData = {
            titre: searchParams.get("titre") || "Retoucherie de Port-Royal",
            date: searchParams.get("date") || "19.04.2025",
            heure: searchParams.get("heure") || "14:00",
            adresse: searchParams.get("adresse") || "12 rue de Port-Royal, 75005 Paris",
            vetementTypes: searchParams.get("vetementTypes")?.split(",") || ["Un tee-shirt"],
            defauts: searchParams.get("defauts")?.split(",") || ["Un trou"],
            capacite: searchParams.get("capacite") || "10",
            prix: searchParams.get("prix") || "15",
            duree: "1h00",
        }

        setAtelierData(data)
    }, [searchParams])

    const formatDate = (dateString: string) => {
        if (!dateString) return ""

        if (dateString.includes(".")) return dateString

        try {
            const [year, month, day] = dateString.split("-")
            return `${day}.${month}.${year}`
        } catch (e) {
            return dateString
        }
    }

    if (!atelierData) return <div className="p-8">Chargement...</div>

    return (
        <AuthGuard requireAuth requirePro>
            <div className="flex flex-col min-h-screen bg-[#F9F5F0]">
                <Navbar />

                <main className="flex-grow px-4 pb-8 max-w-md mx-auto">
                    <div className="mt-6 mb-4">
                        <h1 className="text-2xl font-bold">Voici un récapitulatif de votre événement !</h1>
                    </div>

                    <div className="rounded-xl overflow-hidden bg-[#FF7A5A] shadow-md">
                        {/* Image de l'atelier */}
                        <div className="relative h-48 w-full">
                            <Image
                                src="/Photo.svg?height=400&width=800"
                                alt={atelierData.titre}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-30 p-2">
                                <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center mx-auto">
                                    <Calendar className="h-4 w-4 text-white" />
                                </div>
                            </div>
                        </div>

                        {/* Titre de l'atelier */}
                        <div className="p-4 font-bold text-xl">{atelierData.titre}</div>

                        {/* Date */}
                        <div className="mx-4 mb-2 rounded-xl p-3">{formatDate(atelierData.date)}</div>

                        {/* Heure et durée */}
                        <div className="mx-4 mb-2 flex gap-2">
                            <div className="flex-1 bg-white rounded-xl p-3 flex items-center justify-center">
                                <span className="font-medium">Heure : {atelierData.heure}</span>
                            </div>
                            <div className="flex-1 bg-white rounded-xl p-3 flex items-center justify-center">
                                <span className="font-medium">Durée : {atelierData.duree}</span>
                            </div>
                        </div>

                        {/* Type de vêtement */}
                        <div className="mx-4 mb-2 bg-white rounded-xl p-3">{atelierData.vetementTypes[0]}</div>

                        {/* Type de défaut */}
                        <div className="mx-4 mb-2 bg-white rounded-xl p-3">{atelierData.defauts[0]}</div>

                        {/* Capacité */}
                        <div className="mx-4 mb-2 bg-white rounded-xl p-3">{atelierData.capacite} personnes</div>

                        {/* Prix */}
                        <div className="mx-4 mb-4 bg-white rounded-xl p-3">{atelierData.prix}€/personne</div>
                    </div>

                    <div className="mt-6 space-y-4">
                        <button
                            onClick={() => router.push("/pro/confirmation-atelier")}
                            className="w-full font-medium py-3 rounded-full bg-black text-white"
                        >
                            Valider
                        </button>

                        <button
                            onClick={() => router.push("/pro/creer-atelier")}
                            className="w-full font-medium py-3 rounded-full bg-white border border-black"
                        >
                            Créer un autre atelier
                        </button>
                    </div>
                </main>
            </div>
        </AuthGuard>
    )
}
