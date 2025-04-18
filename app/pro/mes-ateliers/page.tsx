"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, MapPin, Users, Edit, Trash2, Plus } from "lucide-react"
import AuthGuard from "@/components/auth-guard"
import { ateliers as allAteliers, type Atelier } from "@/lib/data"
import { getCurrentUser } from "@/lib/auth"

export default function MesAteliers() {
  const [ateliers, setAteliers] = useState<Atelier[]>([])
  const [filter, setFilter] = useState("tous")
  const [isLoading, setIsLoading] = useState(true)

  // Charger les ateliers de l'utilisateur connecté
  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      // Filtrer les ateliers de l'utilisateur
      const userAteliers = allAteliers.filter((atelier) => atelier.userId === user.id)
      setAteliers(userAteliers)
    }
    setIsLoading(false)
  }, [])

  // Filtrer les ateliers
  const filteredAteliers = ateliers.filter((atelier) => {
    if (filter === "tous") return true
    return atelier.status === filter
  })

  // Supprimer un atelier
  const deleteAtelier = (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet atelier ?")) {
      setAteliers(ateliers.filter((atelier) => atelier.id !== id))
    }
  }

  return (
    <AuthGuard requireAuth requirePro>
      <div className="flex flex-col min-h-screen bg-[#FAF4F2]">
        <Navbar />

        <main className="flex-grow px-4 pb-8">
          <div className="mt-6 mb-8 flex flex-wrap justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Mes ateliers</h1>
              <p className="text-gray-700">Gérez vos ateliers de réparation et suivez les inscriptions.</p>
            </div>
            <Link href="/pro/creer-atelier">
              <button className="bg-black text-white font-medium py-2 px-4 rounded-full flex items-center mt-4 sm:mt-0">
                <Plus className="h-4 w-4 mr-2" />
                Créer un atelier
              </button>
            </Link>
          </div>

          {/* Filtres */}
          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            <button
              onClick={() => setFilter("tous")}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                filter === "tous" ? "bg-black text-white" : "bg-gray-100 text-gray-800"
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setFilter("à venir")}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                filter === "à venir" ? "bg-black text-white" : "bg-white text-gray-800"
              }`}
            >
              À venir
            </button>
            <button
              onClick={() => setFilter("complet")}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                filter === "complet" ? "bg-black text-white" : "bg-white text-gray-800"
              }`}
            >
              Complets
            </button>
            <button
              onClick={() => setFilter("terminé")}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                filter === "terminé" ? "bg-black text-white" : "bg-white text-gray-800"
              }`}
            >
              Terminés
            </button>
          </div>

          {/* Liste des ateliers */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : filteredAteliers.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-500 mb-4">Aucun atelier ne correspond à ce filtre.</p>
              <Link href="/pro/creer-atelier">
                <button className="bg-black text-white font-medium py-2 px-6 rounded-full">Créer un atelier</button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredAteliers.map((atelier) => (
                <div key={atelier.id} className="bg-[#D2EDFF] rounded-xl shadow-md overflow-hidden border border-gray-100">
                  <div className="md:flex">
                    <div className="md:w-1/3 relative h-48 md:h-auto">
                      <Image
                        src={atelier.image || "/Photo.svg"}
                        alt={atelier.titre}
                        fill
                        className="object-cover"
                      />
                      {atelier.status === "complet" && (
                        <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1">Complet</div>
                      )}
                      {atelier.status === "terminé" && (
                        <div className="absolute top-0 right-0 bg-gray-500 text-white px-3 py-1">Terminé</div>
                      )}
                    </div>

                    <div className="p-6 md:w-2/3">
                      <div className="flex justify-between items-start">
                        <h2 className="font-bold text-xl mb-2">{atelier.titre}</h2>
                        <div className="flex space-x-2">
                          <button
                            className="text-black hover:text-black"
                            onClick={() => alert("Fonctionnalité bientôt disponible")}
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            className="text-black hover:text-red-500"
                            onClick={() => deleteAtelier(atelier.id)}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-black">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{atelier.date}</span>
                        </div>
                        <div className="flex items-center text-black">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{atelier.heure}</span>
                        </div>
                        <div className="flex items-center text-black">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{atelier.adresse}</span>
                        </div>
                        <div className="flex items-center text-black">
                          <Users className="h-4 w-4 mr-2" />
                          <span>
                            {atelier.inscrits} / {atelier.capacite} participants
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {atelier.vetementTypes.map((type, index) => (
                            <span key={index} className="bg-white text-black px-2 py-1 rounded-full">
                              {type}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {atelier.defauts.map((defaut, index) => (
                            <span key={index} className="bg-white text-black px-2 py-1 rounded-full">
                              {defaut}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="font-bold text-lg">{atelier.prix} € / personne</div>
                        <Link href={`#`}>
                          <button className="bg-black text-white px-4 py-2 rounded-full">
                            Voir les détails
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </AuthGuard>
  )
}
