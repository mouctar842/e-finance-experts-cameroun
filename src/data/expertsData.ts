
import { Expert } from "../types";

// Initial mock data for experts
export const experts: Expert[] = [
  {
    id: "1",
    firstName: "Jean",
    lastName: "Kamga",
    yearsOfExperience: 10,
    specializations: ["Comptabilité", "Fiscalité"],
    profilePhoto: "/placeholder.svg",
    certificationPhoto: "/placeholder.svg",
    region: "Centre",
    email: "jean.kamga@example.com",
    phone: "+237 655 123 456",
    rating: 4.5,
    comments: [
      {
        id: "c1",
        authorName: "Sophie Mbala",
        content: "Excellent service, très professionnel et rapide.",
        rating: 5,
        date: "2023-11-15"
      },
      {
        id: "c2",
        authorName: "Paul Ndong",
        content: "Bons conseils en fiscalité d'entreprise.",
        rating: 4,
        date: "2023-10-22"
      }
    ]
  },
  {
    id: "2",
    firstName: "Marie",
    lastName: "Ekotto",
    yearsOfExperience: 8,
    specializations: ["Finance d'entreprise", "Analyse financière"],
    profilePhoto: "/placeholder.svg",
    certificationPhoto: "/placeholder.svg",
    region: "Littoral",
    email: "marie.ekotto@example.com",
    phone: "+237 699 234 567",
    rating: 4.8,
    comments: [
      {
        id: "c3",
        authorName: "Robert Meka",
        content: "Aide précieuse pour notre restructuration financière.",
        rating: 5,
        date: "2023-12-05"
      }
    ]
  },
  {
    id: "3",
    firstName: "Thomas",
    lastName: "Ondoa",
    yearsOfExperience: 15,
    specializations: ["Investissement", "Gestion de patrimoine"],
    profilePhoto: "/placeholder.svg",
    certificationPhoto: "/placeholder.svg",
    region: "Ouest",
    email: "thomas.ondoa@example.com",
    phone: "+237 677 345 678",
    rating: 4.2,
    comments: [
      {
        id: "c4",
        authorName: "Jeanne Kamdem",
        content: "Stratégies d'investissement efficaces, mais communication parfois lente.",
        rating: 4,
        date: "2023-11-30"
      }
    ]
  }
];

export const addExpert = (expert: Expert): void => {
  experts.push(expert);
};

export const deleteExpert = (id: string): void => {
  const index = experts.findIndex(expert => expert.id === id);
  if (index !== -1) {
    experts.splice(index, 1);
  }
};

export const getExpertsByRegionAndSpecialization = (
  region: string,
  specialization: string
): Expert[] => {
  return experts.filter(
    (expert) =>
      expert.region === region &&
      expert.specializations.includes(specialization)
  );
};

export const getAllExperts = (): Expert[] => {
  return [...experts];
};

export const getExpertById = (id: string): Expert | undefined => {
  return experts.find(expert => expert.id === id);
};

export const addCommentToExpert = (
  expertId: string,
  comment: Omit<Comment, "id" | "date">
): void => {
  const expert = experts.find((e) => e.id === expertId);
  if (expert) {
    const newComment = {
      id: `c${Date.now()}`,
      ...comment,
      date: new Date().toISOString().split("T")[0]
    };
    
    expert.comments.push(newComment);
    
    // Update expert rating based on all comments
    const totalRating = expert.comments.reduce((sum, comment) => sum + comment.rating, 0);
    expert.rating = parseFloat((totalRating / expert.comments.length).toFixed(1));
  }
};
