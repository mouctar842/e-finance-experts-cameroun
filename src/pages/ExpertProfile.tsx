
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { getExpertById } from "@/data/expertsData";
import { Expert, Comment } from "@/types";
import StarRating from "@/components/StarRating";
import { useExperts } from "@/context/ExpertContext";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const ExpertProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addComment } = useExperts();
  const { toast } = useToast();
  
  const [expert, setExpert] = useState<Expert | null>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [rating, setRating] = useState(0);
  
  useEffect(() => {
    if (id) {
      const expertData = getExpertById(id);
      if (expertData) {
        setExpert(expertData);
      } else {
        navigate("/not-found");
      }
    }
    setLoading(false);
  }, [id, navigate]);
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!authorName || !newComment || rating === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs et attribuer une note.",
        variant: "destructive",
      });
      return;
    }
    
    if (id) {
      addComment(id, {
        authorName,
        content: newComment,
        rating,
      });
      
      setNewComment("");
      setAuthorName("");
      setRating(0);
      
      // Refresh expert data
      const updatedExpert = getExpertById(id);
      if (updatedExpert) {
        setExpert(updatedExpert);
      }
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }
  
  if (!expert) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Expert non trouvé</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-20 pb-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden mb-8">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gray-200 md:h-auto h-48 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-efinance-blue to-efinance-green opacity-70"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-medium">{expert.specializations.join(", ")}</p>
                    <p className="text-sm">{expert.region}</p>
                  </div>
                </div>
                <div className="p-6 md:w-2/3">
                  <h1 className="text-2xl font-bold">
                    {expert.firstName} {expert.lastName}
                  </h1>
                  
                  <div className="flex items-center mt-2">
                    <StarRating rating={expert.rating} size="lg" />
                    <span className="ml-2 text-gray-600">
                      ({expert.rating.toFixed(1)})
                    </span>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-gray-600">
                      <span className="font-medium">Expérience:</span> {expert.yearsOfExperience} ans
                    </p>
                    
                    <div className="mt-3">
                      <p className="font-medium">Spécialisations:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {expert.specializations.map((spec) => (
                          <span 
                            key={spec} 
                            className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <a 
                        href={`mailto:${expert.email}`} 
                        className="bg-white border border-efinance-blue text-efinance-blue hover:bg-efinance-blue hover:text-white transition-colors px-4 py-2 rounded-md text-sm font-medium inline-flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        Contact par email
                      </a>
                      <a 
                        href={`tel:${expert.phone}`} 
                        className="bg-white border border-efinance-green text-efinance-green hover:bg-efinance-green hover:text-white transition-colors px-4 py-2 rounded-md text-sm font-medium inline-flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                        Appeler
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-xl font-semibold mb-4">Commentaires et évaluations</h2>
            
            <Card className="mb-8">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Ajouter un commentaire</h3>
                <form onSubmit={handleCommentSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="authorName" className="block text-sm font-medium text-gray-700">
                        Votre nom
                      </label>
                      <input
                        type="text"
                        id="authorName"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-efinance-blue focus:ring-efinance-blue p-2 border"
                        placeholder="Entrez votre nom"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                        Votre évaluation
                      </label>
                      <div className="mt-1">
                        <StarRating 
                          rating={rating} 
                          size="lg" 
                          editable={true} 
                          onChange={setRating} 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                        Votre commentaire
                      </label>
                      <Textarea
                        id="comment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Partagez votre expérience avec cet expert..."
                        rows={4}
                        className="mt-1"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-efinance-blue to-efinance-green hover:opacity-90 text-white"
                    >
                      Soumettre
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-medium mb-4">
              {expert.comments.length > 0 ? `${expert.comments.length} commentaire(s)` : "Aucun commentaire"}
            </h3>
            
            {expert.comments.length > 0 ? (
              <div className="space-y-4">
                {expert.comments.map((comment, index) => (
                  <motion.div 
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <Card>
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{comment.authorName}</p>
                            <div className="flex items-center mt-1">
                              <StarRating rating={comment.rating} size="sm" />
                              <span className="ml-2 text-sm text-gray-500">
                                {comment.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 text-gray-700">{comment.content}</p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card>
                <div className="p-6 text-center">
                  <p className="text-gray-500">
                    Aucun commentaire pour le moment. Soyez le premier à évaluer cet expert !
                  </p>
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ExpertProfile;
