
import React, { useState } from "react";
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
  };
  
  const toggleSpecialization = (specialization: string) => {
    if (selectedSpecializations.includes(specialization)) {
      setSelectedSpecializations(selectedSpecializations.filter(s => s !== specialization));
    } else {
      setSelectedSpecializations([...selectedSpecializations, specialization]);
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
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Administration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-gray-500">
                  Veuillez entrer le mot de passe pour accéder à l'administration.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input 
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez le mot de passe"
                />
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-efinance-blue to-efinance-green hover:opacity-90 text-white"
                onClick={handleLogin}
              >
                Se connecter
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-20 pb-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Administration e-Finance</h1>
          <Button variant="outline" onClick={handleLogout}>
            Déconnexion
          </Button>
        </div>
        
        <Tabs defaultValue="add" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="add">Ajouter un expert</TabsTrigger>
            <TabsTrigger value="manage">Gérer les experts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="add">
            <Card>
              <CardHeader>
                <CardTitle>Ajouter un nouvel expert</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input 
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Prénom de l'expert"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input 
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Nom de l'expert"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="yearsOfExperience">Années d'expérience *</Label>
                      <Input 
                        id="yearsOfExperience"
                        type="number"
                        min="0"
                        value={yearsOfExperience}
                        onChange={(e) => setYearsOfExperience(e.target.value)}
                        placeholder="Nombre d'années d'expérience"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="region">Région *</Label>
                      <select
                        id="region"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      >
                        <option value="">Sélectionnez une région</option>
                        {REGIONS_CAMEROON.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Adresse email professionnelle"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input 
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Numéro de téléphone"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="block mb-2">Spécialisations *</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {SPECIALIZATIONS.map((specialization) => (
                        <div key={specialization} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`specialization-${specialization}`}
                            checked={selectedSpecializations.includes(specialization)}
                            onCheckedChange={() => toggleSpecialization(specialization)}
                          />
                          <Label htmlFor={`specialization-${specialization}`}>
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
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Réinitialiser
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-gradient-to-r from-efinance-blue to-efinance-green hover:opacity-90 text-white"
                    >
                      Ajouter l'expert
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="manage">
            <Card>
              <CardHeader>
                <CardTitle>Gérer les experts</CardTitle>
              </CardHeader>
              <CardContent>
                {experts.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-gray-600 mb-4">
                      Liste des experts enregistrés ({experts.length})
                    </p>
                    
                    {experts.map((expert) => (
                      <div key={expert.id} className="border rounded-lg p-4 flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">
                            {expert.firstName} {expert.lastName}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {expert.region} • {expert.specializations.join(", ")}
                          </p>
                        </div>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => setExpertToDelete(expert.id)}
                            >
                              Supprimer
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Confirmer la suppression</DialogTitle>
                              <DialogDescription>
                                Êtes-vous sûr de vouloir supprimer cet expert ? Cette action est irréversible.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Annuler</Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button 
                                  variant="destructive" 
                                  onClick={handleDeleteExpert}
                                >
                                  Supprimer
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500">
                      Aucun expert n'a été enregistré pour le moment.
                    </p>
                    <Button 
                      className="mt-4" 
                      variant="outline"
                      onClick={() => setActiveTab("add")}
                    >
                      Ajouter un expert
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
