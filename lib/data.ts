// Types
export interface User {
  id: string
  name: string
  email: string
  password: string
  role: "user" | "pro"
  createdAt: string
}

export interface Atelier {
  id: number
  userId: string
  titre: string
  date: string
  heure: string
  adresse: string
  vetementTypes: string[]
  matieres: string[]
  defauts: string[]
  capacite: number
  prix: number
  materielFourni: "oui" | "non"
  materielAApporter: string
  description: string
  image: string
  status: "à venir" | "complet" | "terminé"
  inscrits: number
  createdAt: string
}

// Données utilisateurs
export const users: User[] = [
  {
    id: "1",
    name: "Jean Dupont",
    email: "jean@example.com",
    password: "password123",
    role: "pro",
    createdAt: "2023-01-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Marie Martin",
    email: "marie@example.com",
    password: "password123",
    role: "pro",
    createdAt: "2023-02-20T14:45:00Z",
  },
  {
    id: "3",
    name: "Pierre Durand",
    email: "pierre@example.com",
    password: "password123",
    role: "user",
    createdAt: "2023-03-10T09:15:00Z",
  },
]

// Données ateliers
export const ateliers: Atelier[] = [
  {
    id: 1,
    userId: "1",
    titre: "Atelier de réparation de jeans",
    date: "2024-06-15",
    heure: "14:00",
    adresse: "12 rue de la Mode, 75001 Paris",
    vetementTypes: ["Pantalon", "Jeans"],
    matieres: ["Denim", "Coton"],
    defauts: ["Déchirure", "Ourlet défait", "Fermeture éclair cassée"],
    capacite: 10,
    prix: 25,
    materielFourni: "oui",
    materielAApporter: "",
    description: "Apprenez à réparer vos jeans et pantalons avec des techniques professionnelles.",
    image: "/placeholder.svg?height=200&width=400&text=Atelier+Jeans",
    status: "à venir",
    inscrits: 4,
    createdAt: "2024-05-01T10:30:00Z",
  },
  {
    id: 2,
    userId: "1",
    titre: "Réparer vos vêtements d'été",
    date: "2024-06-22",
    heure: "10:00",
    adresse: "45 avenue des Tissus, 75011 Paris",
    vetementTypes: ["T-shirt", "Robe", "Short"],
    matieres: ["Coton", "Lin"],
    defauts: ["Trou", "Couture défaite", "Bouton manquant"],
    capacite: 8,
    prix: 20,
    materielFourni: "oui",
    materielAApporter: "",
    description: "Un atelier spécial pour préparer vos vêtements d'été et leur donner une seconde vie.",
    image: "/placeholder.svg?height=200&width=400&text=Atelier+Été",
    status: "à venir",
    inscrits: 2,
    createdAt: "2024-05-05T14:45:00Z",
  },
  {
    id: 3,
    userId: "2",
    titre: "Atelier cuir et daim",
    date: "2024-05-10",
    heure: "14:00",
    adresse: "8 boulevard du Cuir, 75015 Paris",
    vetementTypes: ["Veste", "Chaussures"],
    matieres: ["Cuir", "Daim"],
    defauts: ["Usure", "Déchirure"],
    capacite: 6,
    prix: 35,
    materielFourni: "oui",
    materielAApporter: "",
    description: "Spécialiste du cuir et du daim, je vous apprendrai à entretenir et réparer vos articles en cuir.",
    image: "/placeholder.svg?height=200&width=400&text=Atelier+Cuir",
    status: "complet",
    inscrits: 6,
    createdAt: "2024-04-10T09:15:00Z",
  },
  {
    id: 4,
    userId: "2",
    titre: "Réparation de vêtements d'hiver",
    date: "2024-04-01",
    heure: "14:00",
    adresse: "23 rue du Textile, 75004 Paris",
    vetementTypes: ["Pull", "Manteau"],
    matieres: ["Laine", "Polyester"],
    defauts: ["Trou", "Bouton manquant"],
    capacite: 12,
    prix: 30,
    materielFourni: "non",
    materielAApporter: "Aiguilles à laine, ciseaux, fil assorti à votre vêtement",
    description: "Préparez vos vêtements d'hiver pour la saison prochaine en les réparant dès maintenant.",
    image: "/placeholder.svg?height=200&width=400&text=Atelier+Hiver",
    status: "terminé",
    inscrits: 10,
    createdAt: "2024-03-15T11:30:00Z",
  },
]

// Données pour les sélections
export const vetementTypes = [
  "Pantalon",
  "Jeans",
  "Short",
  "Chemise",
  "T-shirt",
  "Pull",
  "Sweat",
  "Veste",
  "Manteau",
  "Blouson",
  "Robe",
  "Jupe",
  "Chaussures",
  "Bottes",
  "Sandales",
  "Écharpe",
  "Gants",
  "Chapeau",
  "Sac",
  "Autre",
]

export const matiereTypes = [
  "Coton",
  "Laine",
  "Lin",
  "Soie",
  "Polyester",
  "Nylon",
  "Acrylique",
  "Viscose",
  "Cuir",
  "Daim",
  "Denim",
  "Velours",
  "Cachemire",
  "Mohair",
  "Élasthanne",
  "Synthétique",
  "Autre",
]

export const defautTypes = [
  "Bouton manquant",
  "Déchirure",
  "Trou",
  "Fermeture éclair cassée",
  "Ourlet défait",
  "Tache",
  "Couture défaite",
  "Usure",
  "Doublure déchirée",
  "Accroc",
  "Décoloration",
  "Rétrécissement",
  "Élastique détendu",
  "Autre",
]
