// app/formulaire-etape3/page.tsx

"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Notification from "@/components/notification"
import { useRouter } from "next/navigation"
import { CheckCircle, Tag, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

// Types d'interface
interface Atelier {
  id: number
  title: string
  image: string
  date: string
  heure: string
  duree: number
  participant: number
  address: string
  acceptedTypes: string[]
  acceptedDefauts: string[]
  acceptedMatieres: string[]
  description: string
  prix: number
}

// Données des ateliers
const ateliers: Atelier[] = [
  {
    id: 1,
    title: "Retoucherie de Port-Royal",
    image: "/Photo.svg?height=300&width=600&text=Atelier+Paris+Centre",
    date: "Samedi 15 juin 2024",
    heure: "10h00 - 17h00",
    duree: 1,
    participant: 10,
    address: "12 rue de Port-Royal, 75013, Paris",
    acceptedTypes: ["Pantalon", "Jeans", "Short"],
    acceptedDefauts: ["Déchirure", "Ourlet défait", "Fermeture éclair cassée"],
    acceptedMatieres: ["Denim", "Coton", "Polyester"],
    description:
      "Spécialisé dans la réparation de pantalons et jeans. Apprenez à réparer les déchirures et à remplacer les fermetures éclair.",
    prix: 25,
  },
  {
    id: 2,
    title: "Atelier Couture Express",
    image: "/Photo.svg?height=300&width=600&text=Atelier+Couture+Express",
    date: "Dimanche 16 juin 2024, 10h00 - 13h00",
    heure: "10h00 - 13h00",
    duree: 3,
    participant: 5,
    address: "45 avenue des Tissus, 75011 Paris",
    acceptedTypes: ["Chemise", "T-shirt", "Blouse"],
    acceptedDefauts: ["Bouton manquant", "Couture défaite", "Trou"],
    acceptedMatieres: ["Coton", "Lin", "Soie"],
    description:
      "Atelier spécialisé dans les vêtements du haut. Apprenez à recoudre des boutons et à réparer des coutures défaites.",
    prix: 20,
  },
  {
    id: 3,
    title: "Atelier Chaussures Nouvelles",
    image: "/Photo.svg?height=300&width=600&text=Atelier+Chaussures",
    date: "Mercredi 19 juin 2024",
    heure: "18h00 - 20h00",
    duree: 2,
    participant: 8,
    address: "8 boulevard du Cuir, 75015 Paris",
    acceptedTypes: ["Chaussures", "Bottes", "Sandales"],
    acceptedDefauts: ["Usure", "Déchirure"],
    acceptedMatieres: ["Cuir", "Daim", "Synthétique"],
    description:
      "Spécialiste de la réparation de chaussures. Venez apprendre à réparer vos semelles et à entretenir votre cuir.",
    prix: 35,
  },
  {
    id: 4,
    title: "Atelier Vestes & Manteaux",
    image: "/Photo.svg?height=300&width=600&text=Atelier+Vestes",
    date: "Samedi 22 juin 2024",
    heure: "14h00 - 17h00",
    duree: 4,
    participant: 12,
    address: "23 rue du Textile, 75004 Paris",
    acceptedTypes: ["Veste", "Manteau", "Blouson"],
    acceptedDefauts: ["Bouton manquant", "Doublure déchirée", "Fermeture éclair cassée"],
    acceptedMatieres: ["Laine", "Cuir", "Polyester"],
    description:
      "Atelier spécialisé dans les vêtements d'extérieur. Apprenez à réparer les doublures et à remplacer les boutons.",
    prix: 30,
  },
  {
    id: 5,
    title: "Atelier Tous Textiles",
    image: "/Photo.svg?height=300&width=600&text=Atelier+Tous+Textiles",
    date: "Dimanche 23 juin 2024",
    heure: "10h00 - 13h00",
    duree: 3,
    participant: 15,
    address: "56 avenue de la Couture, 75009 Paris",
    acceptedTypes: ["Robe", "Jupe", "Écharpe", "Autre"],
    acceptedDefauts: ["Trou", "Déchirure", "Ourlet défait", "Autre"],
    acceptedMatieres: ["Coton", "Laine", "Soie", "Autre"],
    description:
      "Atelier polyvalent pour tous types de vêtements. Nos experts vous aideront à réparer tous vos textiles.",
    prix: 25,
  },
]

export default function FormulaireEtape2() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showNotification, setShowNotification] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [selectedAtelier, setSelectedAtelier] = useState<Atelier | null>(null)
  const [filteredAteliers, setFilteredAteliers] = useState<Atelier[]>([])
  const [noAtelierFound, setNoAtelierFound] = useState(false)

  // Récupérer les paramètres de l'URL
  const vetement = searchParams.get("vetement") || ""
  const defaut = searchParams.get("defaut") || ""
  const matiere = searchParams.get("matiere") || ""

  // Filtrer les ateliers en fonction des paramètres
  useEffect(() => {
    // Filtrer les ateliers qui correspondent aux critères
    const filtered = ateliers.filter((atelier) => {
      const typeMatch = atelier.acceptedTypes.some((type) => type === vetement || type === "Autre")
      const defautMatch = atelier.acceptedDefauts.some((d) => d === defaut || d === "Autre")
      const matiereMatch = atelier.acceptedMatieres.some((m) => m === matiere || m === "Autre")

      return typeMatch && defautMatch && matiereMatch
    })

    setFilteredAteliers(filtered)

    // Si aucun atelier ne correspond, afficher un message
    if (filtered.length === 0) {
      setNoAtelierFound(true)
    }
  }, [vetement, defaut, matiere])

  const handleParticipate = () => {
    if (!selectedAtelier) return

    // Afficher l'animation de confirmation
    setShowConfirmation(true)

    // Afficher la notification après un court délai
    setTimeout(() => {
    setShowConfirmation(false);
    setShowNotification(true);

    router.push(`/formulaire-etape3`);
  }, 800); 
  }

  const handleNotificationClose = () => {
    setShowNotification(false)
    // Rediriger vers la page d'accueil après la fermeture de la notification
    router.push("/")
  }

  const handleDecline = () => {
    // Rediriger vers la page de contact pro
    router.push("/contact-pro")
  }

  const selectAtelier = (atelier: Atelier) => {
    setSelectedAtelier(atelier)
    // Faire défiler jusqu'aux boutons
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      })
    }, 100)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF4F2]">
      <Navbar />

      {/* Notification */}
      <Notification
        show={showNotification}
        message="Votre participation a été enregistrée !"
        onClose={handleNotificationClose}
      />

      <main className="flex-grow px-4 pb-8">
        <div className="mt-6 mb-8">
          <h1 className="text-2xl font-bold mb-4">On a pensé à vous : un atelier sympa pour apprendre à réparer votre vêtement, sans stress !</h1>
          <p className="text-gray-700 mb-4">
            {noAtelierFound
              ? "Nous n'avons pas trouvé d'atelier correspondant exactement à vos critères."
              : `Nous avons trouvé ${filteredAteliers.length} atelier(s) qui correspondent à vos besoins.`}
          </p>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2">Votre demande :</h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-black text-white px-3 py-1 rounded-full text-sm">{vetement}</span>
              <span className="bg-black text-white px-3 py-1 rounded-full text-sm">{defaut}</span>
              <span className="bg-black text-white px-3 py-1 rounded-full text-sm">{matiere}</span>
            </div>
          </div>
        </div>

        {/* Liste des ateliers */}
        {noAtelierFound ? (
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 mb-8">
            <h2 className="text-xl font-bold mb-4">Aucun atelier disponible</h2>
            <p className="text-gray-700 mb-6">
              Nous n'avons pas trouvé d'atelier correspondant à vos critères. Nous vous recommandons de contacter un
              professionnel.
            </p>
            <Link href="/contact-pro">
              <button className="w-full bg-black text-white font-medium py-3 rounded-full flex items-center justify-center">
                Contacter un professionnel
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6 mb-8">
            {filteredAteliers.map((atelier) => (
              <div
                key={atelier.id}
                className={`bg-[#2BB673] rounded-xl shadow-md overflow-hidden border transition-all ${selectedAtelier?.id === atelier.id ? "border-black" : "border-gray-100 hover:border-gray-300"
                  }`}
                onClick={() => selectAtelier(atelier)}
              >
                <div className="relative h-48 w-full">
                  <Image src={atelier.image || "/placeholder.svg"} alt={atelier.title} fill className="object-cover" />
                  {selectedAtelier?.id === atelier.id && (
                    <div className="absolute top-3 right-3 bg-black text-white px-3 py-1 rounded-full">
                      <span className="text-sm font-medium">Sélectionné</span>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h2 className="font-bold text-xl mb-2">{atelier.title}</h2>

                  <div className="mb-3">
                    <p className="bg-white text-black border border-white p-2 inline-block rounded-lg mr-8">
                      {atelier.date}
                    </p>
                    <p className="bg-white text-black border border-white p-2 inline-block rounded-lg">
                      {atelier.heure}
                    </p>
                  </div>


                  <div>
                    <p className="text-black font-medium flex items-center mb-3">
                      <Tag className="h-4 w-4 mr-2" />
                      Types de vêtements acceptés:
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {atelier.acceptedTypes.map((type, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-sm ${type === vetement ? "bg-black text-white" : "bg-white text-black"
                            }`}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3 mt-4">
                    <p className="bg-white text-black border border-white p-2 rounded-lg w-full block text-left">
                      {atelier.participant} personnes
                    </p>
                  </div>



                  <div className="mb-3">
                    <p className="bg-white text-black border border-white p-2 rounded-lg w-full block text-left">{atelier.prix} € par personne</p>
                  </div>

                  <div className="mb-3">
                    <p className="bg-white text-black border border-white p-2 rounded-lg w-full block text-left">{atelier.description}</p>
                  </div>



                  <div className="mb-3">
                    <p className="bg-white text-black border border-white p-2 rounded-lg w-full block text-left font-medium flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{atelier.address}</span>
                    </p>
                  </div>






                </div>
              </div>
            ))}
          </div>
        )}

        {/* Boutons d'action */}
        {!noAtelierFound && (
          <div className="flex flex-col space-y-3">
            <button
              onClick={handleParticipate}
              className="relative w-full bg-black text-white font-medium py-3 rounded-full overflow-hidden"
              disabled={showConfirmation || !selectedAtelier}
            >
              {showConfirmation ? (
                <div className="flex items-center justify-center">
                  <span className="opacity-0">Je participe</span>
                  <CheckCircle className="absolute h-6 w-6 text-green-400 animate-ping" />
                  <CheckCircle className="absolute h-6 w-6 text-green-400" />
                </div>
              ) : selectedAtelier ? (
                "Je participe"

              ) : (
                "Sélectionnez un atelier"
              )}
            </button>
            <button
              onClick={handleDecline}
              className="w-full bg-white text-black font-medium py-3 rounded-full border border-gray-300"
            >
              Cela ne me concerne pas
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
