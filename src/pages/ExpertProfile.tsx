
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useExperts } from "@/context/ExpertContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import StarRating from "@/components/StarRating";
import { ArrowLeft, Image as ImageIcon, X } from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Image, X as CloseIcon } from "lucide-react";

const ExpertProfile = () => {
  const { id } = useParams();
  const { experts, addComment } = useExperts();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const expert = experts.find((expert) => expert.id === id);

  if (!expert) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500 text-center">Expert non trouvé!</p>
        <Button className="mt-4 mx-auto block" asChild>
          <Link to="/search">Retourner à la recherche</Link>
        </Button>
      </div>
    );
  }

  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim() && rating > 0) {
      addComment(expert.id, {
        rating,
        text: comment,
      });
      setComment("");
      setRating(0);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="container mx-auto px-4 py-8 bg-gradient-to-br from-[#0A192F] via-[#162A45] to-[#0B2135] min-h-screen text-white"
    >
      <Link to="/search" className="flex items-center mb-8 text-[#9b87f5] hover:text-[#1EAEDB]">
        <ArrowLeft className="mr-2" />
        Retour aux résultats
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Profile Info Card */}
        <div className="md:col-span-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="holographic rounded-xl p-6 neo-border h-full"
          >
            <div className="flex flex-col items-center">
              {expert.profilePhoto ? (
                <div className="mb-4 w-40 h-40 rounded-full overflow-hidden image-card">
                  <img 
                    src={expert.profilePhoto} 
                    alt={`${expert.firstName} ${expert.lastName}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="mb-4 w-40 h-40 rounded-full bg-[#1A1F2C] flex items-center justify-center border border-[#9b87f5]/30">
                  <span className="text-4xl text-[#9b87f5]">
                    {expert.firstName.charAt(0)}
                    {expert.lastName.charAt(0)}
                  </span>
                </div>
              )}
              <h1 className="text-2xl font-bold mb-2 cyber-glow">
                {expert.firstName} {expert.lastName}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <StarRating rating={expert.rating} />
                <span>({expert.comments.length} avis)</span>
              </div>
              <div className="bg-[#9b87f5]/10 text-[#9b87f5] rounded-full px-4 py-1 text-sm mb-4">
                {expert.region}
              </div>
              <div className="flex flex-wrap gap-2 mb-4 justify-center">
                {expert.specializations.map((spec) => (
                  <span
                    key={spec}
                    className="bg-[#1EAEDB]/10 text-[#1EAEDB] text-xs rounded-full px-3 py-1"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {expert.certificatePhoto && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mt-2 bg-[#1A1F2C] text-white hover:bg-[#9b87f5]/80 glow">
                      <ImageIcon size={16} className="mr-2" /> Voir le certificat
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Certificat de {expert.firstName} {expert.lastName}</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 relative">
                      <img 
                        src={expert.certificatePhoto} 
                        alt="Certificat" 
                        className="w-full h-auto rounded-md"
                      />
                    </div>
                    <DialogClose className="absolute top-2 right-2">
                      <Button variant="ghost" size="icon">
                        <CloseIcon className="h-4 w-4" />
                      </Button>
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </motion.div>
        </div>

        {/* Expert Details */}
        <div className="md:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="holographic rounded-xl p-6 neo-border mb-8"
          >
            <h2 className="text-xl font-semibold mb-4 cyber-glow">À propos</h2>
            <p className="text-gray-300 mb-6">{expert.bio || "Aucune biographie disponible."}</p>

            <h3 className="text-md font-semibold mb-2">Contact:</h3>
            <p className="text-[#1EAEDB] mb-6">{expert.email}</p>

            <h3 className="text-md font-semibold mb-2">Expérience:</h3>
            <p className="text-gray-300">{expert.experience} ans</p>
          </motion.div>

          {/* Comments Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="holographic rounded-xl p-6 neo-border"
          >
            <h2 className="text-xl font-semibold mb-6 cyber-glow">Commentaires et évaluations</h2>

            {/* Add Comment Form */}
            <form onSubmit={handleSubmitComment} className="mb-8 p-4 border border-white/10 rounded-lg">
              <h3 className="text-md font-medium mb-4">Ajouter un commentaire</h3>
              <div className="mb-4">
                <label className="block text-sm mb-1">Votre évaluation</label>
                <StarRating editable rating={rating} onChange={setRating} />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1">Votre commentaire</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-2 bg-[#1A1F2C] border border-[#9b87f5]/20 rounded-md text-white focus:border-[#9b87f5] focus:ring-1 focus:ring-[#9b87f5] outline-none"
                  rows={4}
                />
              </div>
              <Button
                type="submit"
                className="bg-gradient-to-r from-[#9b87f5] to-[#1EAEDB] hover:opacity-90 text-white"
                disabled={!comment.trim() || rating === 0}
              >
                Soumettre
              </Button>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {expert.comments.length > 0 ? (
                expert.comments.map((comment) => (
                  <Card
                    key={comment.id}
                    className="p-4 bg-[#1A1F2C]/50 border border-[#9b87f5]/10 rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <StarRating rating={comment.rating} />
                        <p className="text-gray-300 mt-2">{comment.text}</p>
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(comment.date).toLocaleDateString()}
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-center text-gray-400">Aucun commentaire pour le moment.</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExpertProfile;
