
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Expert, Comment } from "../types";
import { 
  experts as initialExperts, 
  addExpert as addExpertToData,
  deleteExpert as deleteExpertFromData,
  addCommentToExpert as addCommentToExpertInData
} from "../data/expertsData";
import { useToast } from "@/components/ui/use-toast";

interface ExpertContextType {
  experts: Expert[];
  addExpert: (expert: Omit<Expert, "id" | "rating" | "comments">) => void;
  deleteExpert: (id: string) => void;
  getExpertsByRegionAndSpecialization: (region: string, specialization: string) => Expert[];
  addComment: (expertId: string, comment: Omit<Comment, "id" | "date">) => void;
}

const ExpertContext = createContext<ExpertContextType | undefined>(undefined);

export const ExpertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [experts, setExperts] = useState<Expert[]>(initialExperts);
  const { toast } = useToast();

  const addExpert = (expertData: Omit<Expert, "id" | "rating" | "comments">) => {
    const newExpert: Expert = {
      ...expertData,
      id: `exp${Date.now()}`,
      rating: 0,
      comments: []
    };

    addExpertToData(newExpert);
    // Récupérer les données mises à jour plutôt que de copier l'ancien état
    const updatedExperts = [...initialExperts]; 
    setExperts(updatedExperts);
    
    toast({
      title: "Expert ajouté",
      description: `${expertData.firstName} ${expertData.lastName} a été ajouté avec succès.`,
      duration: 3000,
    });
  };

  const deleteExpert = (id: string) => {
    deleteExpertFromData(id);
    // Récupérer les données mises à jour après suppression
    const updatedExperts = [...initialExperts]; 
    setExperts(updatedExperts);
    
    toast({
      title: "Expert supprimé",
      description: "L'expert a été supprimé avec succès.",
      duration: 3000,
    });
  };

  const getExpertsByRegionAndSpecialization = (region: string, specialization: string) => {
    return experts.filter(
      (expert) =>
        expert.region === region &&
        expert.specializations.includes(specialization)
    );
  };

  const addComment = (expertId: string, comment: Omit<Comment, "id" | "date">) => {
    addCommentToExpertInData(expertId, comment);
    // Récupérer les données mises à jour après l'ajout du commentaire
    const updatedExperts = [...initialExperts]; 
    setExperts(updatedExperts);
    
    toast({
      title: "Commentaire ajouté",
      description: "Votre commentaire a été ajouté avec succès.",
      duration: 3000,
    });
  };

  return (
    <ExpertContext.Provider
      value={{
        experts,
        addExpert,
        deleteExpert,
        getExpertsByRegionAndSpecialization,
        addComment,
      }}
    >
      {children}
    </ExpertContext.Provider>
  );
};

export const useExperts = () => {
  const context = useContext(ExpertContext);
  if (context === undefined) {
    throw new Error("useExperts must be used within an ExpertProvider");
  }
  return context;
};
