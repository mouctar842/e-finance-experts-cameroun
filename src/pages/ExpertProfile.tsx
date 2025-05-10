
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
import { 
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Image, X, Certificate } from "lucide-react";

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
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  
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
      <div className="min-h-screen flex items-center justify-center bg-[#0A192F]">
        <div className="cyber-glow text-white">Chargement...</div>
      </div>
    );
  }
  
  if (!expert) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A192F]">
        <p className="text-white">Expert non trouvé</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-20 pb-10 bg-[#0A192F] relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute w-96 h-96 rounded-full bg-[#9b87f5]/10 blur-3xl"
          animate={{ 
            x: ["0%", "10%", "0%"],
            y: ["0%", "-20%", "0%"]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '10%', left: '15%' }}
        />
        <motion.div 
          className="absolute w-[500px] h-[500px] rounded-full bg-[#1EAEDB]/10 blur-3xl"
          animate={{ 
            x: ["0%", "-15%", "0%"],
            y: ["0%", "20%", "0%"]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ bottom: '10%', right: '10%' }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden mb-8 holographic neo-border">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gray-200 md:h-auto h-48 relative">
                  <img 
                    src={expert.profilePhoto !== "/placeholder.svg" ? expert.profilePhoto : "/placeholder.svg"} 
                    alt={`${expert.firstName} ${expert.lastName}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#9b87f5]/70 to-[#1EAEDB]/70"></div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="absolute bottom-4 left-4 text-white"
                  >
                    <p className="font-medium">{expert.specializations.join(", ")}</p>
                    <p className="text-sm">{expert.region}</p>
                  </motion.div>
                </div>
                
                <div className="p-6 md:w-2/3">
                  <div className="flex justify-between items-start">
                    <motion.h1 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-bold text-white cyber-glow"
                    >
                      {expert.firstName} {expert.lastName}
                    </motion.h1>
                    
                    {expert.certificationPhoto && expert.certificationPhoto !== "/placeholder.svg" && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex items-center space-x-1 border-[#9b87f5]/30 text-[#9b87f5] hover-neon"
                          >
                            <Certificate size={16} />
                            <span>Voir certificat</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl holographic neo-border">
                          <div className="relative">
                            <img 
                              src={expert.certificationPhoto} 
                              alt="Certificat" 
                              className="w-full rounded-md image-card"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/placeholder.svg";
                              }}
                            />
                            <DialogClose className="absolute top-2 right-2 bg-red-500 rounded-full p-2">
                              <X size={18} className="text-white" />
                            </DialogClose>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                  
                  <div className="flex items-center mt-2">
                    <StarRating rating={expert.rating} size="lg" />
                    <span className="ml-2 text-gray-300">
                      ({expert.rating.toFixed(1)})
                    </span>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-gray-300">
                      <span className="font-medium text-white">Expérience:</span> {expert.yearsOfExperience} ans
                    </p>
                    
                    <div className="mt-3">
                      <p className="font-medium text-white">Spécialisations:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {expert.specializations.map((spec) => (
                          <motion.span 
                            key={spec} 
                            className="text-sm bg-[#9b87f5]/10 text-[#9b87f5] px-3 py-1 rounded-full border border-[#9b87f5]/30 hover:border-[#9b87f5]/60 transition-all duration-300 pulse-border"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            {spec}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <motion.a 
                        href={`mailto:${expert.email}`} 
                        className="bg-transparent border border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10 transition-colors px-4 py-2 rounded-md text-sm font-medium inline-flex items-center justify-center hover-neon"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        Contact par email
                      </motion.a>
                      <motion.a 
                        href={`tel:${expert.phone}`} 
                        className="bg-transparent border border-[#1EAEDB] text-[#1EAEDB] hover:bg-[#1EAEDB]/10 transition-colors px-4 py-2 rounded-md text-sm font-medium inline-flex items-center justify-center hover-neon"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                        Appeler
                      </motion.a>
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
            <h2 className="text-xl font-semibold mb-4 text-white cyber-glow">Commentaires et évaluations</h2>
            
            <Card className="mb-8 holographic neo-border">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4 text-white">Ajouter un commentaire</h3>
                <form onSubmit={handleCommentSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="authorName" className="block text-sm font-medium text-gray-300">
                        Votre nom
                      </label>
                      <input
                        type="text"
                        id="authorName"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-[#9b87f5]/30 shadow-sm futuristic-input text-white p-2 border bg-[#0F1729]"
                        placeholder="Entrez votre nom"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="rating" className="block text-sm font-medium text-gray-300">
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
                      <label htmlFor="comment" className="block text-sm font-medium text-gray-300">
                        Votre commentaire
                      </label>
                      <Textarea
                        id="comment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Partagez votre expérience avec cet expert..."
                        rows={4}
                        className="mt-1 futuristic-input text-white"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-[#9b87f5] to-[#1EAEDB] hover:opacity-90 text-white glow"
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
            <h3 className="text-lg font-medium mb-4 text-white">
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
                    <Card className="holographic hover:border-[#9b87f5]/30 transition-all duration-300">
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-white">{comment.authorName}</p>
                            <div className="flex items-center mt-1">
                              <StarRating rating={comment.rating} size="sm" />
                              <span className="ml-2 text-sm text-gray-400">
                                {comment.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 text-gray-300">{comment.content}</p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="holographic neo-border">
                <div className="p-6 text-center">
                  <p className="text-gray-400">
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
