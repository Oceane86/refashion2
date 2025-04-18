"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"

export default function Home() {
  const [activeTab, setActiveTab] = useState<'particulier' | 'pro'>('particulier')

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF4F2]">
      <Navbar onSelectTab={setActiveTab} />

      <main className="flex-grow grid grid-cols-1 lg:grid-cols-[280px_1fr]">
        {/* Sidebar gauche */}
        <aside className="hidden lg:flex flex-col bg-[#FAF4F2] p-6 border-r border-gray-200 gap-6">
          <ul className="space-y-4 text-sm font-medium">
            <li className="flex items-center gap-2">
              <span>📍</span>
              <span>Points de collecte</span>
            </li>
            <li className="flex items-center gap-2">
              <span>🛠</span>
              <span>Réparateurs</span>
            </li>
            <li className="flex items-center gap-2">
              <span>❓</span>
              <span>FAQ</span>
            </li>
          </ul>

          <div className="bg-[#D2EDFF] text-black rounded-xl p-4 mt-8 flex flex-col justify-between">
            <h3 className="text-lg font-bold mb-3 leading-snug">
              Rien ne se jette, tout se transforme
            </h3>
            <button className="bg-black text-white text-sm font-medium py-2 px-4 rounded-full self-start">
              Je démarre mon tri
            </button>
          </div>
        </aside>

        {/* Contenu principal */}
        <div className="px-4 lg:px-8 pb-12">
          {/* Titre principal */}
          <div className="mt-6 mb-6">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight">
              Donnez une deuxième vie à vos vêtements, linge de maison et chaussures.
            </h1>
          </div>

          {/* Choix de parcours */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {activeTab === 'particulier' && (
              <>
                {/* Parcours de tri */}
                <Link href="https://refashion.fr/trier-mes-vetements">
                  <div className="bg-[#D2EDFF] rounded-2xl p-6 text-black h-full flex flex-col justify-between shadow-md transition-transform hover:scale-[1.02]">
                    <div className="flex items-center justify-between gap-4">
                      <h2 className="text-lg font-bold max-w-[60%]">Rien ne se jette, tout se transforme !</h2>
                      <button className="bg-black text-white text-sm font-semibold py-2 px-6 rounded-full whitespace-nowrap">
                        Je démarre mon tri
                      </button>
                    </div>
                  </div>
                </Link>

                {/* Parcours particulier */}
                <Link href="/formulaire-etape1">
                  <div className="bg-[#D2EDFF] rounded-2xl p-6 text-black h-full flex flex-col justify-between shadow-md transition-transform hover:scale-[1.02]">
                    <div className="flex items-center justify-between gap-4">
                      <h2 className="text-lg font-bold max-w-[60%]">Rien ne se jette, tout se répare</h2>
                      <button className="bg-black text-white text-sm font-semibold py-2 px-6 rounded-full whitespace-nowrap">
                        Je répare
                      </button>
                    </div>
                  </div>
                </Link>

              </>
            )}


            {/* Parcours pro — affiché uniquement si tab actif = pro */}
            {activeTab === 'pro' && (
              <Link href="/auth/login">
                <div className="bg-[#2BB673] rounded-2xl p-6 text-black h-full flex flex-col justify-between shadow-md transition-transform hover:scale-[1.02]">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-xl font-bold max-w-[60%]">Créer mon évènement !</h2>
                    <button className="bg-black text-white text-sm font-semibold py-3 px-5 rounded-full">
                      Créer
                    </button>
                  </div>
                </div>
              </Link>

            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Card Image avec badge */}
            <div className="relative rounded-2xl overflow-hidden bg-[#FFB6C1] shadow-md h-[400px]">
              <div className="absolute top-4 left-4 bg-white px-4 py-1 rounded-full text-sm font-medium z-10">
                On refait la mode
              </div>
              <Image
                src="/Pictures.webp"
                alt="On refait la mode"
                fill
                className="object-cover"
              />
            </div>

            {/* Card Texte */}
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold leading-tight mb-4">
                On Refait La Mode : pour une mode plus responsable !
              </h2>
              <p className="text-sm text-gray-700">
                L'émission dédiée à une mode plus responsable est de retour pour une Saison 2 ! Rien ne se jette, tout se transforme :
                découvrez comment nos experts réinventent la mode grâce à la réparation, la réutilisation et le recyclage.
              </p>

              {/* CTA émission */}
              <div>
                <a
                  href="https://refashion.fr/on-refait-la-mode"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="flex items-center gap-2 mt-3 bg-black text-white px-6 py-3 rounded-full text-sm font-semibold hover:scale-105 transition-transform">
                    Je découvre l’émission <span className="text-lg">→</span>
                  </button>
                </a>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Filtres fixes en bas */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-white px-3 py-1.5 rounded-full shadow-md border border-gray-200">
        <div className="flex justify-center gap-1.5">
          {["Tous", "Réduire", "Réparer", "Réutiliser", "Recycler"].map((label) => (
            <button
              key={label}
              className={`border border-gray-300 rounded-full px-2 py-0.5 text-xs transition ${label === "Tous" ? "bg-gray-100" : "hover:bg-gray-100"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
