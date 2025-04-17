"use client"

import type React from "react"

import { useState } from "react"
import Navbar from "@/components/navbar"
import { useSearchParams, useRouter } from "next/navigation"
import { ArrowLeft, Send } from "lucide-react"
import Link from "next/link"
import Notification from "@/components/notification"

export default function ContactPro() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    adresse: "",
    message: "",
  })
  const [showNotification, setShowNotification] = useState(false)

  // Récupérer les paramètres de l'URL
  const vetement = searchParams.get("vetement") || ""
  const defaut = searchParams.get("defaut") || ""
  const matiere = searchParams.get("matiere") || ""

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici, vous pourriez envoyer les données à votre API
    console.log("Données du formulaire:", formData)

    // Afficher la notification
    setShowNotification(true)
  }

  const handleNotificationClose = () => {
    setShowNotification(false)
    // Rediriger vers la page d'accueil
    router.push("/")
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* Notification */}
      <Notification
        show={showNotification}
        message="Votre demande a été envoyée avec succès !"
        onClose={handleNotificationClose}
      />

      <main className="flex-grow px-4 pb-8">
        <div className="mt-4 mb-2">
          <Link href="/formulaire-etape2" className="inline-flex items-center text-gray-600 hover:text-black">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Retour</span>
          </Link>
        </div>

        <div className="mt-4 mb-8">
          <h1 className="text-2xl font-bold mb-4">Contacter un professionnel</h1>
          <p className="text-gray-700">
            Nous allons vous mettre en relation avec un professionnel de la réparation qui pourra vous aider à réparer
            votre vêtement.
          </p>
        </div>

        {vetement && defaut && matiere && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2">Votre demande :</h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-black text-white px-3 py-1 rounded-full text-sm">{vetement}</span>
              <span className="bg-black text-white px-3 py-1 rounded-full text-sm">{defaut}</span>
              <span className="bg-black text-white px-3 py-1 rounded-full text-sm">{matiere}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h2 className="text-lg font-bold mb-4">Vos coordonnées</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="nom" className="block font-medium mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Votre nom et prénom"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre.email@exemple.com"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label htmlFor="telephone" className="block font-medium mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="Votre numéro de téléphone"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label htmlFor="adresse" className="block font-medium mb-1">
                  Adresse
                </label>
                <input
                  type="text"
                  id="adresse"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleChange}
                  placeholder="Votre adresse complète"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h2 className="text-lg font-bold mb-4">Détails de votre demande</h2>

            <div>
              <label htmlFor="message" className="block font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Décrivez en détail votre vêtement et le problème à réparer..."
                className="w-full p-3 border border-gray-300 rounded-lg min-h-[150px]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-medium py-3 rounded-full flex items-center justify-center"
          >
            Envoyer ma demande
            <Send className="ml-2 h-4 w-4" />
          </button>
        </form>
      </main>
    </div>
  )
}
