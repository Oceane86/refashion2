import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow grid grid-cols-1 lg:grid-cols-[280px_1fr]">
        {/* Sidebar gauche */}
        <aside className="hidden lg:flex flex-col bg-white p-6 border-r border-gray-200 gap-6">
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

          <div className="bg-[#FF6B41] text-white rounded-xl p-4 mt-8 flex flex-col justify-between">
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
            {/* Parcours particulier */}
            <Link href="/formulaire-etape1">
              <div className="bg-[#FF6B41] rounded-2xl p-6 text-white h-full flex flex-col justify-between shadow-md transition-transform hover:scale-[1.02]">
                <div>
                  <h2 className="text-xl font-bold mb-2">Je veux réparer un vêtement</h2>
                  <p className="mb-4 text-sm">
                    Vous avez un vêtement à réparer ? Découvrez comment le faire vous-même ou trouvez un atelier près de chez vous.
                  </p>
                </div>
                <button className="bg-black text-white text-sm font-semibold py-3 px-5 rounded-full self-start mt-4">
                  Commencer
                </button>
              </div>
            </Link>

            {/* Parcours pro */}
            <Link href="/pro/creer-atelier">
              <div className="bg-black rounded-2xl p-6 text-white h-full flex flex-col justify-between shadow-md transition-transform hover:scale-[1.02]">
                <div>
                  <h2 className="text-xl font-bold mb-2">Je suis un professionnel</h2>
                  <p className="mb-4 text-sm">
                    Vous êtes un professionnel de la réparation ? Créez et gérez vos ateliers pour partager votre savoir-faire.
                  </p>
                </div>
                <button className="bg-white text-black text-sm font-semibold py-3 px-5 rounded-full self-start mt-4">
                  Espace pro
                </button>
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Card Image avec badge */}
            <div className="relative rounded-2xl overflow-hidden bg-[#FFB6C1] shadow-md h-[400px]">
              <div className="absolute top-4 left-4 bg-yellow-300 px-4 py-1 rounded-full text-sm font-medium z-10">
                On refait la mode
              </div>
              <Image
                src="https://refashion.fr/app/uploads/2025/04/portrait_1000x1500_orlm-1380x1096-c-top.webp"
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
                <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-semibold hover:scale-105 transition-transform">
                  Je découvre l’émission <span className="text-lg">→</span>
                </button>
              </div>
            </div>
          </div>





        </div>

      </main>
      {/* Filtres fixes centrés en bas avec fond autour du contenu uniquement */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-white px-4 py-2 rounded-full shadow-md border border-gray-200 max-w-[95%] w-auto overflow-x-auto">
        <div className="flex justify-center gap-2 whitespace-nowrap">
          {["Tous", "Réduire", "Réparer", "Réutiliser", "Recycler"].map((label) => (
            <button
              key={label}
              className={`border border-gray-300 rounded-full px-4 py-1 text-sm transition ${label === "Tous" ? "bg-gray-100" : "hover:bg-gray-100"
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>



    </div>
  )
}
