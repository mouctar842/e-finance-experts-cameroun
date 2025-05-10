
export interface Expert {
  id: string;
  firstName: string;
  lastName: string;
  yearsOfExperience: number;
  specializations: string[];
  profilePhoto: string;
  certificationPhoto: string;
  region: string;
  email: string;
  phone: string;
  rating: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  authorName: string;
  content: string;
  rating: number;
  date: string;
}

export const SPECIALIZATIONS = [
  "Comptabilité",
  "Audit",
  "Fiscalité",
  "Finance d'entreprise",
  "Finance personnelle",
  "Investissement",
  "Gestion de patrimoine",
  "Analyse financière",
  "Planification financière",
  "Finance internationale",
  "Microfinance",
  "Fintech",
  "Banque et crédit",
  "Assurance"
];

export const REGIONS_CAMEROON = [
  "Adamaoua",
  "Centre",
  "Est",
  "Extrême-Nord",
  "Littoral",
  "Nord",
  "Nord-Ouest",
  "Ouest",
  "Sud",
  "Sud-Ouest"
];
