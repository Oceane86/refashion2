"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import { Calendar, Clock, Tag, Users, DollarSign, PenToolIcon as Tool, Info } from "lucide-react"
import { useRouter } from "next/navigation"
import Notification from "@/components/notification"
import TagInput from "@/components/tag-input"
import AuthGuard from "@/components/auth-guard"
import { vetementTypes, matiereTypes, defautTypes } from "@/lib/data"

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

    // Afficher la notification
    setShowNotification(true)
  }

  const handleNotificationClose = () => {
    setShowNotification(false)
    // Rediriger vers la page d'accueil
    router.push("/pro/mes-ateliers")
  }

  return (
    <AuthGuard requireAuth requirePro>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />

        {/* Notification */}
        <Notification
          show={showNotification}
          message="Votre atelier a été créé avec succès !"
          onClose={handleNotificationClose}
        />

        <main className="flex-grow px-4 pb-8">
          <div className="mt-6 mb-8">
            <h1 className="text-2xl font-bold mb-4">Créer un atelier de réparation</h1>
            <p className="text-gray-700">
              Partagez votre expertise en créant un atelier de réparation. Remplissez le formulaire ci-dessous pour
              proposer votre atelier aux utilisateurs.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations générales */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold mb-4">Informations générales</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="titre" className="block font-medium mb-1">
                    Titre de l'atelier
                  </label>
                  <input
                    type="text"
                    id="titre"
                    name="titre"
                    value={formData.titre}
                    onChange={handleChange}
                    placeholder="Ex: Atelier de réparation de jeans"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block font-medium mb-1 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Date
                    </label>
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

                  <div>
                    <label htmlFor="heure" className="block font-medium mb-1 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Heure
                    </label>
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
                </div>

                <div>
                  <label htmlFor="adresse" className="block font-medium mb-1">
                    Adresse complète
                  </label>
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

                <div>
                  <label htmlFor="description" className="block font-medium mb-1">
                    Description de l'atelier
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Décrivez votre atelier, votre expertise, ce que les participants vont apprendre..."
                    className="w-full p-3 border border-gray-300 rounded-lg min-h-[100px]"
                  />
                </div>
              </div>
            </div>

            {/* Types de réparations */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold mb-4">Types de réparations proposées</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="vetementTypes" className="block font-medium mb-1 flex items-center">
                    <Tag className="h-4 w-4 mr-1" />
                    Types de vêtements
                  </label>
                  <TagInput
                    tags={formData.vetementTypes}
                    availableTags={vetementTypes}
                    onTagsChange={(tags) => handleTagsChange("vetementTypes", tags)}
                    placeholder="Ajouter un type de vêtement..."
                  />
                </div>

                <div>
                  <label htmlFor="matieres" className="block font-medium mb-1">
                    Matières
                  </label>
                  <TagInput
                    tags={formData.matieres}
                    availableTags={matiereTypes}
                    onTagsChange={(tags) => handleTagsChange("matieres", tags)}
                    placeholder="Ajouter une matière..."
                  />
                </div>

                <div>
                  <label htmlFor="defauts" className="block font-medium mb-1">
                    Types de défauts
                  </label>
                  <TagInput
                    tags={formData.defauts}
                    availableTags={defautTypes}
                    onTagsChange={(tags) => handleTagsChange("defauts", tags)}
                    placeholder="Ajouter un type de défaut..."
                  />
                </div>
              </div>
            </div>

            {/* Informations pratiques */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold mb-4">Informations pratiques</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="capacite" className="block font-medium mb-1 flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Capacité (nombre de personnes)
                    </label>
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

                  <div>
                    <label htmlFor="prix" className="block font-medium mb-1 flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Prix par personne (€)
                    </label>
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
                </div>

                <div>
                  <label className="block font-medium mb-1 flex items-center">
                    <Tool className="h-4 w-4 mr-1" />
                    Matériel fourni
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="materielFourni"
                        value="oui"
                        checked={formData.materielFourni === "oui"}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Oui, tout le matériel est fourni
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="materielFourni"
                        value="non"
                        checked={formData.materielFourni === "non"}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Non, les participants doivent apporter du matériel
                    </label>
                  </div>
                </div>

                {formData.materielFourni === "non" && (
                  <div>
                    <label htmlFor="materielAApporter" className="block font-medium mb-1 flex items-center">
                      <Info className="h-4 w-4 mr-1" />
                      Matériel à apporter
                    </label>
                    <textarea
                      id="materielAApporter"
                      name="materielAApporter"
                      value={formData.materielAApporter}
                      onChange={handleChange}
                      placeholder="Précisez le matériel que les participants doivent apporter"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required={formData.materielFourni === "non"}
                    />
                  </div>
                )}
              </div>
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
