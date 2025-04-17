"use client"

import { users, type User } from "@/lib/data"

// Clé de stockage local
const AUTH_STORAGE_KEY = "re_fashion_auth"

// Fonction pour simuler la connexion
export function login(email: string, password: string): User | null {
  const user = users.find((u) => u.email === email && u.password === password)

  if (user) {
    // Ne pas stocker le mot de passe dans le localStorage
    const { password: _, ...userWithoutPassword } = user
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userWithoutPassword))
    return user
  }

  return null
}

// Fonction pour simuler l'inscription
export function register(name: string, email: string, password: string, role: "user" | "pro"): User | null {
  // Vérifier si l'email existe déjà
  const existingUser = users.find((u) => u.email === email)
  if (existingUser) {
    return null
  }

  // Créer un nouvel utilisateur
  const newUser: User = {
    id: (users.length + 1).toString(),
    name,
    email,
    password,
    role,
    createdAt: new Date().toISOString(),
  }

  // Dans une vraie application, on ajouterait l'utilisateur à la base de données
  // Ici, on simule juste la connexion
  const { password: _, ...userWithoutPassword } = newUser
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userWithoutPassword))

  return newUser
}

// Fonction pour récupérer l'utilisateur connecté
export function getCurrentUser(): Omit<User, "password"> | null {
  if (typeof window === "undefined") {
    return null
  }

  const userJson = localStorage.getItem(AUTH_STORAGE_KEY)
  if (!userJson) {
    return null
  }

  try {
    return JSON.parse(userJson)
  } catch (error) {
    console.error("Error parsing user from localStorage:", error)
    return null
  }
}

// Fonction pour déconnecter l'utilisateur
export function logout(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}

// Fonction pour vérifier si l'utilisateur est connecté
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

// Fonction pour vérifier si l'utilisateur est un pro
export function isPro(): boolean {
  const user = getCurrentUser()
  return user !== null && user.role === "pro"
}
