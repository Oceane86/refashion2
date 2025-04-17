"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Navbar from "@/components/navbar"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle, PlayCircle } from "lucide-react"

// Tutoriels par type de défaut
const tutoriels: Record<string, any> = {
  "Bouton manquant": {
    title: "Comment recoudre un bouton",
    steps: [
      "Choisir un bouton de remplacement adapté",
      "Enfiler une aiguille avec du fil de la bonne couleur",
      "Positionner le bouton à l'emplacement souhaité",
      "Coudre en passant l'aiguille à travers les trous du bouton",
      "Faire plusieurs passages pour solidifier",
      "Nouer le fil à l'arrière du tissu",
    ],
    image: "/placeholder.svg?height=300&width=600&text=Tutoriel+Bouton",
    videoUrl: "#",
  },
  "Ourlet défait": {
    title: "Comment refaire un ourlet",
    steps: [
      "Mesurer et marquer la longueur souhaitée",
      "Épingler l'ourlet en place",
      "Choisir un point adapté (point invisible pour un résultat professionnel)",
      "Coudre l'ourlet en suivant la ligne d'origine",
      "Repasser l'ourlet pour un résultat net",
    ],
    image: "/placeholder.svg?height=300&width=600&text=Tutoriel+Ourlet",
    videoUrl: "#",
  },
  "Couture défaite": {
    title: "Comment réparer une couture défaite",
    steps: [
      "Retourner le vêtement sur l'envers",
      "Aligner les bords de la couture défaite",
      "Épingler si nécessaire pour maintenir en place",
      "Coudre en suivant la ligne de couture d'origine",
      "Renforcer les extrémités avec quelques points supplémentaires",
    ],
    image: "/placeholder.svg?height=300&width=600&text=Tutoriel+Couture",
    videoUrl: "#",
  },
  Déchirure: {
    title: "Comment réparer une déchirure",
    steps: [
      "Nettoyer les bords de la déchirure",
      "Placer un morceau de tissu de renfort derrière la déchirure",
      "Aligner les bords de la déchirure",
      "Coudre avec des points rapprochés",
      "Pour les tissus épais, utiliser un point zigzag pour plus de solidité",
    ],
    image: "/placeholder.svg?height=300&width=600&text=Tutoriel+Déchirure",
    videoUrl: "#",
  },
  Trou: {
    title: "Comment réparer un trou",
    steps: [
      "Évaluer la taille du trou",
      "Pour les petits trous, utiliser la technique du point de reprise",
      "Pour les trous plus grands, appliquer une pièce de tissu similaire",
      "Coudre la pièce en place avec des points invisibles",
      "Pour un look tendance, envisager le visible mending avec des fils colorés",
    ],
    image: "/placeholder.svg?height=300&width=600&text=Tutoriel+Trou",
    videoUrl: "#",
  },
  Tache: {
    title: "Comment éliminer une tache",
    steps: [
      "Identifier le type de tache (graisse, vin, encre, etc.)",
      "Choisir le produit détachant adapté à la tache et au tissu",
      "Tester le produit sur une zone peu visible",
      "Appliquer le produit et laisser agir selon les instructions",
      "Rincer abondamment et laver normalement",
    ],
    image: "/placeholder.svg?height=300&width=600&text=Tutoriel+Tache",
    videoUrl: "#",
  },
}

export default function Tutoriel() {
  const searchParams = useSearchParams()
  const [tutoriel, setTutoriel] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const vetement = searchParams.get("vetement")
    const defaut = searchParams.get("defaut")
    const matiere = searchParams.get("matiere")

    // Récupérer le tutoriel correspondant au défaut
    if (defaut && tutoriels[defaut]) {
      setTutoriel({
        ...tutoriels[defaut],
        vetement,
        defaut,
        matiere,
      })
    }

    setLoading(false)
  }, [searchParams])

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p>Chargement...</p>
        </div>
      </div>
    )
  }

  if (!tutoriel) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-grow px-4 py-8">
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Tutoriel non disponible</h1>
            <p className="text-gray-700 mb-6">
              Désolé, nous n'avons pas de tutoriel pour ce type de réparation. Essayez de trouver un atelier près de
              chez vous.
            </p>
            <Link href="/formulaire-etape2">
              <button className="bg-black text-white font-medium py-3 px-6 rounded-full">Trouver un atelier</button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow px-4 pb-8">
        <div className="mt-4 mb-2">
          <Link href="/formulaire-etape1" className="inline-flex items-center text-gray-600 hover:text-black">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Retour</span>
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{tutoriel.title}</h1>
          <p className="text-gray-700">
            Tutoriel pour réparer un <span className="font-medium">{tutoriel.vetement.toLowerCase()}</span> en{" "}
            <span className="font-medium">{tutoriel.matiere.toLowerCase()}</span> avec un{" "}
            <span className="font-medium">{tutoriel.defaut.toLowerCase()}</span>.
          </p>
        </div>

        <div className="relative rounded-xl overflow-hidden mb-6">
          <Image
            src={tutoriel.image || "/placeholder.svg"}
            alt={tutoriel.title}
            width={600}
            height={300}
            className="w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-black bg-opacity-70 rounded-full p-2 hover:bg-opacity-90 transition-all">
              <PlayCircle className="h-12 w-12 text-white" />
            </button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Étapes à suivre</h2>
          <ol className="space-y-4">
            {tutoriel.steps.map((step: string, index: number) => (
              <li key={index} className="flex items-start">
                <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                  {index + 1}
                </div>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-green-50 rounded-xl p-6 mb-8 border border-green-100">
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-green-800 mb-1">Vous pouvez le faire !</h3>
              <p className="text-green-700">
                Cette réparation est classée comme <span className="font-medium">facile à moyenne</span>. Avec un peu de
                patience, vous devriez pouvoir réparer votre vêtement vous-même.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <Link href="/formulaire-etape2">
            <button className="w-full bg-gray-100 text-black font-medium py-3 rounded-full border border-gray-300">
              Je préfère trouver un atelier
            </button>
          </Link>
          <Link href="/">
            <button className="w-full bg-black text-white font-medium py-3 rounded-full">Retour à l'accueil</button>
          </Link>
        </div>
      </main>
    </div>
  )
}
