
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useExperts } from "@/context/ExpertContext";
import { REGIONS_CAMEROON, SPECIALIZATIONS } from "@/types";
import { motion } from "framer-motion";
import { Upload, Image, FileImage, X, Camera, CheckCircle2 } from "lucide-react";

const PASSWORD = "MOUHAMEDMOUCTARBENOUSMAN@2003";

const Admin = () => {
  const { toast } = useToast();
  const { experts, addExpert, deleteExpert } = useExperts();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("add");
  
  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);
  const [profilePhoto, setProfilePhoto] = useState("/placeholder.svg");
  const [certificationPhoto, setCertificationPhoto] = useState("/placeholder.svg");
  
  // Upload states
  const [isProfileUploading, setIsProfileUploading] = useState(false);
  const [isCertUploading, setIsCertUploading] = useState(false);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [certPreview, setCertPreview] = useState<string | null>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const certInputRef = useRef<HTMLInputElement>(null);
  
  // Delete expert state
  const [expertToDelete, setExpertToDelete] = useState("");
  
  const handleLogin = () => {
    if (password === PASSWORD) {
      setIsAuthenticated(true);
      toast({
        title: "Authentification réussie",
        description: "Vous êtes maintenant connecté à l'interface d'administration.",
      });
    } else {
      toast({
        title: "Erreur d'authentification",
        description: "Le mot de passe est incorrect.",
        variant: "destructive",
      });
    }
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    resetForm();
  };
  
  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setYearsOfExperience("");
    setEmail("");
    setPhone("");
    setRegion("");
    setSelectedSpecializations([]);
    setProfilePhoto("/placeholder.svg");
    setCertificationPhoto("/placeholder.svg");
    setExpertToDelete("");
    setProfilePreview(null);
    setCertPreview(null);
  };
  
  const toggleSpecialization = (specialization: string) => {
    if (selectedSpecializations.includes(specialization)) {
      setSelectedSpecializations(selectedSpecializations.filter(s => s !== specialization));
    } else {
      setSelectedSpecializations([...selectedSpecializations, specialization]);
    }
  };
  
  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProfileUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfilePreview(result);
        setProfilePhoto(result); // Sauvegarde l'URL data pour le stockage
        setTimeout(() => setIsProfileUploading(false), 1000); // Simulation de chargement
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleCertPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsCertUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCertPreview(result);
        setCertificationPhoto(result); // Sauvegarde l'URL data pour le stockage
        setTimeout(() => setIsCertUploading(false), 1000); // Simulation de chargement
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !yearsOfExperience || !email || !phone || !region || selectedSpecializations.length === 0) {
      toast({
        title: "Erreur de formulaire",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }
    
    // Create new expert
    addExpert({
      firstName,
      lastName,
      yearsOfExperience: parseInt(yearsOfExperience),
      specializations: selectedSpecializations,
      email,
      phone,
      region,
      profilePhoto,
      certificationPhoto,
    });
    
    resetForm();
  };
  
  const handleDeleteExpert = () => {
    if (expertToDelete) {
      deleteExpert(expertToDelete);
      setExpertToDelete("");
    }
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-[#0A192F] bg-opacity-90">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="w-full max-w-md holographic neo-border">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white cyber-glow">Administration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <p className="text-gray-300">
                    Veuillez entrer le mot de passe pour accéder à l'administration.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Mot de passe</Label>
                  <Input 
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Entrez le mot de passe"
                    className="futuristic-input text-white"
                  />
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-[#9b87f5] to-[#1EAEDB] hover:opacity-90 text-white glow hover-neon mt-4"
                  onClick={handleLogin}
                >
                  Se connecter
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-20 pb-10 bg-[#0A192F]">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-between items-center mb-6"
        >
          <h1 className="text-2xl font-bold text-white cyber-glow">Administration e-Finance</h1>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="hover-neon text-white border-[#9b87f5]"
          >
            Déconnexion
          </Button>
        </motion.div>
        
        <Tabs defaultValue="add" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 bg-[#162A45] border border-[#9b87f5]/20">
            <TabsTrigger value="add" className="data-text text-white">Ajouter un expert</TabsTrigger>
            <TabsTrigger value="manage" className="data-text text-white">Gérer les experts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="add">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="holographic neo-border">
                <CardHeader>
                  <CardTitle className="text-white cyber-glow">Ajouter un nouvel expert</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName" className="text-white">Prénom *</Label>
                        <Input 
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Prénom de l'expert"
                          required
                          className="futuristic-input text-white"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="lastName" className="text-white">Nom *</Label>
                        <Input 
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Nom de l'expert"
                          required
                          className="futuristic-input text-white"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="yearsOfExperience" className="text-white">Années d'expérience *</Label>
                        <Input 
                          id="yearsOfExperience"
                          type="number"
                          min="0"
                          value={yearsOfExperience}
                          onChange={(e) => setYearsOfExperience(e.target.value)}
                          placeholder="Nombre d'années d'expérience"
                          required
                          className="futuristic-input text-white"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="region" className="text-white">Région *</Label>
                        <select
                          id="region"
                          value={region}
                          onChange={(e) => setRegion(e.target.value)}
                          className="flex h-10 w-full rounded-md border border-[#9b87f5]/30 bg-[#0F1729] px-3 py-2 text-sm text-white futuristic-input"
                          required
                        >
                          <option value="">Sélectionnez une région</option>
                          {REGIONS_CAMEROON.map((r) => (
                            <option key={r} value={r} className="bg-[#0F1729]">
                              {r}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email" className="text-white">Email *</Label>
                        <Input 
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Adresse email professionnelle"
                          required
                          className="futuristic-input text-white"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone" className="text-white">Téléphone *</Label>
                        <Input 
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Numéro de téléphone"
                          required
                          className="futuristic-input text-white"
                        />
                      </div>
                    </div>
                    
                    {/* Photos upload section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div>
                        <Label className="block mb-2 text-white">Photo de profil</Label>
                        <div 
                          className={`p-4 border-2 border-dashed rounded-md cursor-pointer hover-neon file-upload-animation ${isProfileUploading ? 'uploading' : ''}`}
                          style={{ borderColor: '#9b87f5' }}
                          onClick={() => profileInputRef.current?.click()}
                        >
                          <input 
                            type="file" 
                            ref={profileInputRef}
                            className="hidden" 
                            accept="image/*"
                            onChange={handleProfilePhotoChange}
                          />
                          
                          {profilePreview ? (
                            <div className="relative">
                              <img 
                                src={profilePreview} 
                                alt="Aperçu du profil" 
                                className="w-full h-48 object-cover rounded-md image-card"
                              />
                              <button
                                type="button"
                                className="absolute top-2 right-2 bg-red-500 rounded-full p-1"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setProfilePreview(null);
                                  setProfilePhoto("/placeholder.svg");
                                }}
                              >
                                <X size={16} className="text-white" />
                              </button>
                              {!isProfileUploading && (
                                <div className="absolute bottom-2 right-2 bg-green-500 rounded-full p-1">
                                  <CheckCircle2 size={16} className="text-white" />
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-48 space-y-2">
                              {isProfileUploading ? (
                                <div className="animate-pulse">
                                  <Upload className="h-10 w-10 text-[#9b87f5]" />
                                  <p className="text-sm text-center text-gray-300 mt-2">Chargement...</p>
                                </div>
                              ) : (
                                <>
                                  <Camera className="h-10 w-10 text-[#9b87f5]" />
                                  <p className="text-sm text-center text-gray-300">
                                    Cliquez pour télécharger la photo de profil
                                  </p>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <Label className="block mb-2 text-white">Photo du certificat</Label>
                        <div 
                          className={`p-4 border-2 border-dashed rounded-md cursor-pointer hover-neon file-upload-animation ${isCertUploading ? 'uploading' : ''}`}
                          style={{ borderColor: '#1EAEDB' }}
                          onClick={() => certInputRef.current?.click()}
                        >
                          <input 
                            type="file" 
                            ref={certInputRef}
                            className="hidden" 
                            accept="image/*"
                            onChange={handleCertPhotoChange}
                          />
                          
                          {certPreview ? (
                            <div className="relative">
                              <img 
                                src={certPreview} 
                                alt="Aperçu du certificat" 
                                className="w-full h-48 object-cover rounded-md image-card"
                              />
                              <button
                                type="button"
                                className="absolute top-2 right-2 bg-red-500 rounded-full p-1"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCertPreview(null);
                                  setCertificationPhoto("/placeholder.svg");
                                }}
                              >
                                <X size={16} className="text-white" />
                              </button>
                              {!isCertUploading && (
                                <div className="absolute bottom-2 right-2 bg-green-500 rounded-full p-1">
                                  <CheckCircle2 size={16} className="text-white" />
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-48 space-y-2">
                              {isCertUploading ? (
                                <div className="animate-pulse">
                                  <Upload className="h-10 w-10 text-[#1EAEDB]" />
                                  <p className="text-sm text-center text-gray-300 mt-2">Chargement...</p>
                                </div>
                              ) : (
                                <>
                                  <FileImage className="h-10 w-10 text-[#1EAEDB]" />
                                  <p className="text-sm text-center text-gray-300">
                                    Cliquez pour télécharger le certificat
                                  </p>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="block mb-2 text-white">Spécialisations *</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {SPECIALIZATIONS.map((specialization) => (
                          <div key={specialization} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`specialization-${specialization}`}
                              checked={selectedSpecializations.includes(specialization)}
                              onCheckedChange={() => toggleSpecialization(specialization)}
                              className="border-[#9b87f5]"
                            />
                            <Label 
                              htmlFor={`specialization-${specialization}`}
                              className="text-gray-300"
                            >
                              {specialization}
                            </Label>
                          </div>
                        ))}
                      </div>
                      {selectedSpecializations.length === 0 && (
                        <p className="text-sm text-red-500 mt-1">
                          Veuillez sélectionner au moins une spécialisation.
                        </p>
                      )}
                    </div>
                    
                    <div className="mt-6 flex justify-end space-x-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={resetForm}
                        className="border-[#9b87f5]/50 text-white hover-neon"
                      >
                        Réinitialiser
                      </Button>
                      <Button 
                        type="submit" 
                        className="bg-gradient-to-r from-[#9b87f5] to-[#1EAEDB] hover:opacity-90 text-white glow"
                      >
                        Ajouter l'expert
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="manage">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="holographic neo-border">
                <CardHeader>
                  <CardTitle className="text-white cyber-glow">Gérer les experts</CardTitle>
                </CardHeader>
                <CardContent>
                  {experts.length > 0 ? (
                    <div className="space-y-4">
                      <p className="text-gray-300 mb-4">
                        Liste des experts enregistrés ({experts.length})
                      </p>
                      
                      {experts.map((expert, index) => (
                        <motion.div 
                          key={expert.id} 
                          className="border border-[#9b87f5]/30 rounded-lg p-4 flex justify-between items-center holographic hover:border-[#9b87f5]/60 transition-all duration-300"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full overflow-hidden mr-4 image-card">
                              <img 
                                src={expert.profilePhoto} 
                                alt={`${expert.firstName} ${expert.lastName}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                                }}
                              />
                            </div>
                            <div>
                              <h3 className="font-medium text-white">
                                {expert.firstName} {expert.lastName}
                              </h3>
                              <p className="text-sm text-gray-300">
                                {expert.region} • {expert.specializations.join(", ")}
                              </p>
                            </div>
                          </div>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => setExpertToDelete(expert.id)}
                                className="bg-gradient-to-r from-red-600 to-red-700 hover:opacity-90 hover-neon"
                              >
                                Supprimer
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="holographic neo-border">
                              <DialogHeader>
                                <DialogTitle className="text-white cyber-glow">Confirmer la suppression</DialogTitle>
                                <DialogDescription className="text-gray-300">
                                  Êtes-vous sûr de vouloir supprimer cet expert ? Cette action est irréversible.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="flex items-center space-x-4 p-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden image-card">
                                  <img 
                                    src={expert.profilePhoto} 
                                    alt={`${expert.firstName} ${expert.lastName}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                                    }}
                                  />
                                </div>
                                <div>
                                  <p className="text-white font-medium">{expert.firstName} {expert.lastName}</p>
                                  <p className="text-sm text-gray-300">{expert.email}</p>
                                </div>
                              </div>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button 
                                    variant="outline"
                                    className="border-[#9b87f5]/50 text-white hover-neon"
                                  >
                                    Annuler
                                  </Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button 
                                    variant="destructive" 
                                    onClick={handleDeleteExpert}
                                    className="bg-gradient-to-r from-red-600 to-red-700 hover:opacity-90 glow"
                                  >
                                    Supprimer
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-300">
                        Aucun expert n'a été enregistré pour le moment.
                      </p>
                      <Button 
                        className="mt-4 bg-gradient-to-r from-[#9b87f5] to-[#1EAEDB] hover:opacity-90 text-white glow hover-neon" 
                        variant="outline"
                        onClick={() => setActiveTab("add")}
                      >
                        Ajouter un expert
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
