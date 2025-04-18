"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import { ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import Notification from "@/components/notification"
import TagInput from "@/components/tag-input"
import AuthGuard from "@/components/auth-guard"
import { vetementTypes, defautTypes } from "@/lib/data"

export default function CreerAtelier() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    titre: "",
    date: "",
    heure: "",
    adresse: "",
    vetementTypes: [] as string[],
    matieres: [] as string[],
    defauts: [] as string[],
    capacite: "",
    prix: "",
    materielFourni: "oui" as "oui" | "non",
    materielAApporter: "",
    description: "",
  })
  const [showNotification, setShowNotification] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  // Vérifier si le formulaire est valide
  useEffect(() => {
    const { titre, date, heure, adresse, vetementTypes, defauts, capacite, prix } = formData
    const isValid =
      titre !== "" &&
      date !== "" &&
      heure !== "" &&
      adresse !== "" &&
      vetementTypes.length > 0 &&
      defauts.length > 0 &&
      capacite !== "" &&
      prix !== ""

    setIsFormValid(isValid)
  }, [formData])

  // Mettre à jour les données du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Gérer les tags
  const handleTagsChange = (field: string, tags: string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: tags,
    }))
  }

  // Soumettre le formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    // Ici, vous pourriez envoyer les données à votre API
    console.log("Données de l'atelier:", formData)

    // Au lieu d'afficher la notification, rediriger vers la page de récapitulatif
    // avec les données du formulaire en paramètres d'URL
    const params = new URLSearchParams()
    params.append("titre", formData.titre)
    params.append("date", formData.date)
    params.append("heure", formData.heure)
    params.append("adresse", formData.adresse)
    params.append("vetementTypes", formData.vetementTypes.join(","))
    params.append("defauts", formData.defauts.join(","))
    params.append("capacite", formData.capacite)
    params.append("prix", formData.prix)

    router.push(`/pro/recapitulatif-atelier?${params.toString()}`)
  }

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <AuthGuard requireAuth requirePro>
      <div className="flex flex-col min-h-screen bg-[#F9F5F0]">
        <Navbar />

        {/* Notification */}
        <Notification
          show={showNotification}
          message="Votre atelier a été créé avec succès !"
          onClose={() => setShowNotification(false)}
        />

        <main className="flex-grow px-4 pb-8 max-w-md mx-auto">
          <div className="mt-6 mb-8">
            <h1 className="text-2xl font-bold mb-2">Re_fashion</h1>
            <p className="text-black text-xl font-medium leading-tight">
              Vous avez une expertise à partager ? Dites-nous ce que vous aimeriez faire apprendre aux autres pendant
              l'atelier.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Date */}
            <div className="mb-4">
              <div className="bg-[#FFC3C3] rounded-xl p-4">
                <h3 className="text-black font-medium text-lg">Quelle date as-tu prévue ?</h3>
              </div>
              <div
                className="bg-black text-white rounded-xl p-4 mt-2 flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection("date")}
              >
                <span>Réponse à la question</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${openSections.date ? "rotate-180" : ""}`} />
              </div>
              {openSections.date && (
                <div className="p-4 border border-gray-200 rounded-xl mt-2">
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              )}
            </div>

            {/* Heure */}
            <div className="mb-4">
              <div className="bg-[#FFC3C3] rounded-xl p-4">
                <h3 className="text-black font-medium text-lg">Quelle heure as-tu prévue ?</h3>
              </div>
              <div
                className="bg-black text-white rounded-xl p-4 mt-2 flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection("heure")}
              >
                <span>Réponse à la question</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${openSections.heure ? "rotate-180" : ""}`} />
              </div>
              {openSections.heure && (
                <div className="p-4 border border-gray-200 rounded-xl mt-2">
                  <input
                    type="time"
                    id="heure"
                    name="heure"
                    value={formData.heure}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              )}
            </div>

             {/* Types de vêtements */}
             <div className="mb-4">
              <div className="bg-[#FFC3C3] rounded-xl p-4">
                <h3 className="text-black font-medium text-lg">Quels types de vêtements ?</h3>
              </div>
              <div
                className="bg-black text-white rounded-xl p-4 mt-2 flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection("vetementTypes")}
              >
                <span>Réponse à la question</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${openSections.vetementTypes ? "rotate-180" : ""}`}
                />
              </div>
              {openSections.vetementTypes && (
                <div className="p-4 border border-gray-200 rounded-xl mt-2">
                  <TagInput
                    tags={formData.vetementTypes}
                    availableTags={vetementTypes}
                    onTagsChange={(tags) => handleTagsChange("vetementTypes", tags)}
                    placeholder="Ajouter un type de vêtement..."
                  />
                </div>
              )}
            </div>

            {/* Adresse */}
            <div className="mb-4">
              <div className="bg-[#FFC3C3] rounded-xl p-4">
                <h3 className="text-black font-medium text-lg">Où se déroulera l'atelier ?</h3>
              </div>
              <div
                className="bg-black text-white rounded-xl p-4 mt-2 flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection("adresse")}
              >
                <span>Réponse à la question</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${openSections.adresse ? "rotate-180" : ""}`} />
              </div>
              {openSections.adresse && (
                <div className="p-4 border border-gray-200 rounded-xl mt-2">
                  <input
                    type="text"
                    id="adresse"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleChange}
                    placeholder="Ex: 12 rue de la Mode, 75001 Paris"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              )}
            </div>

           

            {/* Types de défauts */}
            <div className="mb-4">
              <div className="bg-[#FFC3C3] rounded-xl p-4">
                <h3 className="text-black font-medium text-lg">Quels types de défauts ?</h3>
              </div>
              <div
                className="bg-black text-white rounded-xl p-4 mt-2 flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection("defauts")}
              >
                <span>Réponse à la question</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${openSections.defauts ? "rotate-180" : ""}`} />
              </div>
              {openSections.defauts && (
                <div className="p-4 border border-gray-200 rounded-xl mt-2">
                  <TagInput
                    tags={formData.defauts}
                    availableTags={defautTypes}
                    onTagsChange={(tags) => handleTagsChange("defauts", tags)}
                    placeholder="Ajouter un type de défaut..."
                  />
                </div>
              )}
            </div>

            {/* Capacité */}
            <div className="mb-4">
              <div className="bg-[#FFC3C3] rounded-xl p-4">
                <h3 className="text-black font-medium text-lg">Combien de participants ?</h3>
              </div>
              <div
                className="bg-black text-white rounded-xl p-4 mt-2 flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection("capacite")}
              >
                <span>Réponse à la question</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${openSections.capacite ? "rotate-180" : ""}`} />
              </div>
              {openSections.capacite && (
                <div className="p-4 border border-gray-200 rounded-xl mt-2">
                  <input
                    type="number"
                    id="capacite"
                    name="capacite"
                    value={formData.capacite}
                    onChange={handleChange}
                    min="1"
                    placeholder="Ex: 10"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              )}
            </div>

            {/* Prix */}
            <div className="mb-4">
              <div className="bg-[#FFC3C3] rounded-xl p-4">
                <h3 className="text-black font-medium text-lg">Quel est le prix par personne ?</h3>
              </div>
              <div
                className="bg-black text-white rounded-xl p-4 mt-2 flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection("prix")}
              >
                <span>Réponse à la question</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${openSections.prix ? "rotate-180" : ""}`} />
              </div>
              {openSections.prix && (
                <div className="p-4 border border-gray-200 rounded-xl mt-2">
                  <input
                    type="number"
                    id="prix"
                    name="prix"
                    value={formData.prix}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="Ex: 25.00"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className={`w-full font-medium py-3 rounded-full ${
                isFormValid ? "bg-black text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!isFormValid}
            >
              Créer l'atelier
            </button>
          </form>
        </main>
      </div>
    </AuthGuard>
  )
}
