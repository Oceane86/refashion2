"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { register } from "@/lib/auth"
import Navbar from "@/components/navbar"
import { Eye, EyeOff, UserPlus, User, Briefcase, Building, Phone } from "lucide-react"

export default function Register() {
  const router = useRouter()

  const [activeTab, setActiveTab] = useState<"user" | "pro">("user")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    phoneNumber: "",
    siret: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Vérifier que les mots de passe correspondent
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return
    }

    // Vérifier les champs spécifiques pour les professionnels
    if (activeTab === "pro") {
      if (!formData.companyName.trim()) {
        setError("Le nom de l'entreprise est requis")
        return
      }
      if (!formData.phoneNumber.trim()) {
        setError("Le numéro de téléphone est requis")
        return
      }
      if (!formData.siret.trim()) {
        setError("Le numéro SIRET est requis")
        return
      }
    }

    setIsLoading(true)

    try {
      const { name, email, password } = formData
      const role = activeTab as "user" | "pro"
      const user = register(name, email, password, role)

      if (user) {
        // Rediriger vers la page d'accueil ou le tableau de bord
        if (role === "pro") {
          router.push("/pro/mes-ateliers")
        } else {
          router.push("/")
        }
      } else {
        setError("Cet email est déjà utilisé")
      }
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Créer un compte</h1>
            <p className="text-gray-600 mt-2">Rejoignez la communauté Re_fashion</p>
          </div>

          {/* Onglets */}
          <div className="flex mb-6 border-b border-gray-200">
            <button
              className={`flex-1 py-3 font-medium text-center transition-colors ${
                activeTab === "user" ? "text-black border-b-2 border-black" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("user")}
            >
              <div className="flex items-center justify-center">
                <User className="h-4 w-4 mr-2" />
                Particulier
              </div>
            </button>
            <button
              className={`flex-1 py-3 font-medium text-center transition-colors ${
                activeTab === "pro" ? "text-black border-b-2 border-black" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("pro")}
            >
              <div className="flex items-center justify-center">
                <Briefcase className="h-4 w-4 mr-2" />
                Professionnel
              </div>
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block font-medium mb-1">
                {activeTab === "user" ? "Nom complet" : "Nom du responsable"}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={activeTab === "user" ? "Votre nom et prénom" : "Nom du responsable"}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {activeTab === "pro" && (
              <>
                <div>
                  <label htmlFor="companyName" className="block font-medium mb-1 flex items-center">
                    <Building className="h-4 w-4 mr-2" />
                    Nom de l'entreprise
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Nom de votre entreprise"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required={activeTab === "pro"}
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block font-medium mb-1 flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    Numéro de téléphone
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Numéro de téléphone professionnel"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required={activeTab === "pro"}
                  />
                </div>

                <div>
                  <label htmlFor="siret" className="block font-medium mb-1">
                    Numéro SIRET
                  </label>
                  <input
                    type="text"
                    id="siret"
                    name="siret"
                    value={formData.siret}
                    onChange={handleChange}
                    placeholder="Numéro SIRET de votre entreprise"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required={activeTab === "pro"}
                  />
                </div>
              </>
            )}

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
              <label htmlFor="password" className="block font-medium mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Votre mot de passe"
                  className="w-full p-3 border border-gray-300 rounded-lg pr-10"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block font-medium mb-1">
                Confirmer le mot de passe
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirmez votre mot de passe"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
                minLength={8}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white font-medium py-3 rounded-full flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
              ) : (
                <>
                  Créer un compte {activeTab === "pro" ? "professionnel" : "particulier"}
                  <UserPlus className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Vous avez déjà un compte ?{" "}
              <Link href="/auth/login" className="text-black font-medium hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
