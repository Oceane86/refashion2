"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import { ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"

// Types de vêtements
const vetementTypes = [
  "Pantalon",
  "Jeans",
  "Short",
  "Chemise",
  "T-shirt",
  "Pull",
  "Sweat",
  "Veste",
  "Manteau",
  "Robe",
  "Jupe",
  "Chaussures",
  "Autre",
]

// Types de défauts
const defautTypes = [
  "Bouton manquant",
  "Déchirure",
  "Trou",
  "Fermeture éclair cassée",
  "Ourlet défait",
  "Tache",
  "Couture défaite",
  "Usure",
  "Autre",
]

// Types de matières
const matiereTypes = [
  "Coton",
  "Laine",
  "Lin",
  "Soie",
  "Polyester",
  "Nylon",
  "Cuir",
  "Daim",
  "Denim",
  "Velours",
  "Autre",
]

// Difficulté des réparations
const difficulteReparations: Record<string, Record<string, string>> = {
  "Bouton manquant": { difficulte: "facile", tutoriel: true },
  "Ourlet défait": { difficulte: "facile", tutoriel: true },
  "Couture défaite": { difficulte: "facile", tutoriel: true },
  Déchirure: { difficulte: "moyenne", tutoriel: true },
  Trou: { difficulte: "moyenne", tutoriel: true },
  "Fermeture éclair cassée": { difficulte: "difficile", tutoriel: false },
  Tache: { difficulte: "variable", tutoriel: true },
  Usure: { difficulte: "difficile", tutoriel: false },
  Autre: { difficulte: "variable", tutoriel: false },
}

export default function FormulaireEtape1() {
  const router = useRouter()
  const [vetement, setVetement] = useState("")
  const [defaut, setDefaut] = useState("")
  const [matiere, setMatiere] = useState("")
  const [showButton, setShowButton] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  // Vérifier si le formulaire est valide
  useEffect(() => {
    setIsFormValid(vetement !== "" && defaut !== "" && matiere !== "")
  }, [vetement, defaut, matiere])

  // Gérer le défilement pour afficher le bouton
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Soumettre le formulaire
  const handleSubmit = () => {
    if (!isFormValid) return

    // Déterminer le parcours en fonction de la difficulté de réparation
    const reparationInfo = difficulteReparations[defaut] || { difficulte: "difficile", tutoriel: false }

    if (reparationInfo.tutoriel) {
      // Rediriger vers un tutoriel
      router.push(`/tutoriel?vetement=${vetement}&defaut=${defaut}&matiere=${matiere}`)
    } else {
      // Rediriger vers la recherche d'ateliers
      router.push(`/formulaire-etape2?vetement=${vetement}&defaut=${defaut}&matiere=${matiere}`)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF4F2]">
      <Navbar />

      <main className="flex-grow px-4 pb-20">
        <div className="mt-6 mb-8">
          <h1 className="text-2xl font-bold mb-4">On vous pose quelques questions pour trouver ensemble la solution la plus adaptée !</h1>
        </div>

        <div className="space-y-6">
          {/* Type de vêtement */}
          <div className="bg-[#FF6235] rounded-xl shadow-md p-4">
            <h3 className="text-xl font-semibold mb-3">Quel est ton produit ?</h3>
            <p className="text-sm text-black mb-3">Répondre à la question</p>

            <div className="relative">
              <select
                className="w-full p-3 rounded-lg appearance-none pr-10 bg-black text-white"
                value={vetement}
                onChange={(e) => setVetement(e.target.value)}
              >
                <option value="" disabled>
                  Répondre à la question
                </option>
                {vetementTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <ChevronDown className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          {/* Type de matière */}
          <div className="bg-[#FF6235] rounded-xl shadow-md p-4">
            <h3 className="text-xl font-semibold mb-3">Quel est la matière de ton produit ?</h3>
            <p className="text-sm text-black mb-3">Répondre à la question</p>
            <div className="relative">
              <select
                className="w-full p-3 rounded-lg appearance-none pr-10 bg-black text-white"
                value={matiere}
                onChange={(e) => setMatiere(e.target.value)}
              >
                <option value="" disabled>
                  Répondre à la question
                </option>
                {matiereTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <ChevronDown className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          {/* Type de défaut */}
          <div className="bg-[#FF6235] rounded-xl shadow-md p-4">
            <h3 className="text-xl font-semibold text-black mb-1">
              Quel est le défaut que vous souhaitez réparer ?
            </h3>
            <p className="text-sm text-black mb-3">Répondre à la question</p>

            <div className="relative">
              <select
                className="w-full p-3 rounded-lg appearance-none pr-10 bg-black text-white"
                value={defaut}
                onChange={(e) => setDefaut(e.target.value)}
              >
                <option value="" disabled>
                  Répondre à la question
                </option>
                {defautTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <ChevronDown className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>


        </div>
      </main>

      {/* Bouton de validation fixe en bas */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md z-50`}
      >
        <button
          onClick={handleSubmit}
          className={`w-full font-medium py-3 rounded-full ${isFormValid ? "bg-black text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
          disabled={!isFormValid}
        >
          Valider
        </button>
      </div>




    </div>
  )
}
