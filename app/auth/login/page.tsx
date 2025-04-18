"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/lib/auth";
import Navbar from "@/components/navbar";
import { Eye, EyeOff, LogIn, User, Briefcase } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [activeTab, setActiveTab] = useState<"user" | "pro">("user");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { email, password } = formData;
      const user = login(email, password);

      if (user) {
        // Vérifier si le type de compte correspond à l'onglet sélectionné
        if ((activeTab === "pro" && user.role !== "pro") || (activeTab === "user" && user.role !== "user")) {
          setError(`Ce compte n'est pas un compte ${activeTab === "pro" ? "professionnel" : "particulier"}`);
          setIsLoading(false);
          return;
        }

        // Rediriger vers la page demandée ou la page d'accueil
        if (user.role === "pro") {
          router.push("/pro/mes-ateliers");
        } else {
          router.push(redirect);
        }
      } else {
        setError("Email ou mot de passe incorrect");
      }
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF4F2]">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Connexion</h1>
            <p className="text-gray-600 mt-2">Connectez-vous à votre compte Re_fashion</p>
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

            <button
              type="submit"
              className="w-full bg-black text-white font-medium py-3 rounded-full flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
              ) : (
                <>
                  Se connecter
                  <LogIn className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Vous n'avez pas de compte ?{" "}
              <Link href="/auth/register" className="text-black font-medium hover:underline">
                S'inscrire
              </Link>
            </p>
          </div>

          
        </div>
      </main>
    </div>
  );
}
