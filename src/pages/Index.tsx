
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { REGIONS_CAMEROON, SPECIALIZATIONS } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const isMobile = useIsMobile();
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center animated-gradient overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
        </div>
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Trouvez les Meilleurs Experts Financiers au Cameroun
            </motion.h1>
            <motion.p 
              className="text-xl text-white/90 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              e-Finance vous connecte avec les experts financiers qualifiés dans toutes les régions du Cameroun.
            </motion.p>
            
            <motion.div
              className="p-4 md:p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h2 className="text-white text-xl mb-4">Rechercher un expert</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <select 
                    value={selectedRegion} 
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full p-2 rounded border border-white/20 bg-white/10 text-white"
                  >
                    <option value="">Choisir une région</option>
                    {REGIONS_CAMEROON.map((region) => (
                      <option key={region} value={region} className="text-black">
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <select 
                    value={selectedSpecialization} 
                    onChange={(e) => setSelectedSpecialization(e.target.value)}
                    className="w-full p-2 rounded border border-white/20 bg-white/10 text-white"
                  >
                    <option value="">Choisir une spécialisation</option>
                    {SPECIALIZATIONS.map((spec) => (
                      <option key={spec} value={spec} className="text-black">
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <Link 
                to={
                  selectedRegion && selectedSpecialization 
                    ? `/search?region=${selectedRegion}&specialization=${selectedSpecialization}` 
                    : "/search"
                }
              >
                <Button className="w-full bg-gradient-to-r from-efinance-blue to-efinance-green hover:opacity-90 text-white">
                  Rechercher <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating elements for futuristic animation */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {!isMobile && (
            <>
              <motion.div 
                className="absolute w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm"
                initial={{ x: "10%", y: "20%" }}
                animate={{ 
                  x: ["10%", "15%", "10%"],
                  y: ["20%", "25%", "20%"],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute w-24 h-24 rounded-full bg-white/5 backdrop-blur-sm"
                initial={{ x: "80%", y: "40%" }}
                animate={{ 
                  x: ["80%", "75%", "80%"],
                  y: ["40%", "45%", "40%"],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute w-32 h-32 rounded-full bg-white/5 backdrop-blur-sm"
                initial={{ x: "30%", y: "70%" }}
                animate={{ 
                  x: ["30%", "35%", "30%"],
                  y: ["70%", "65%", "70%"],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              />
            </>
          )}
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comment fonctionne e-Finance</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Notre plateforme vous aide à trouver rapidement des experts financiers qualifiés au Cameroun, adaptés à vos besoins spécifiques.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-100"
              whileHover={{ y: -5, boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-efinance-blue to-efinance-lightblue text-white flex items-center justify-center rounded-full mb-4 mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Sélectionnez votre région</h3>
              <p className="text-gray-600 text-center">Choisissez votre région au Cameroun pour trouver des experts près de chez vous.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-100"
              whileHover={{ y: -5, boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-efinance-green to-efinance-lightgreen text-white flex items-center justify-center rounded-full mb-4 mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Choisissez une spécialisation</h3>
              <p className="text-gray-600 text-center">Précisez le domaine d'expertise financière dont vous avez besoin.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-100"
              whileHover={{ y: -5, boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-efinance-blue to-efinance-green text-white flex items-center justify-center rounded-full mb-4 mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Contactez l'expert</h3>
              <p className="text-gray-600 text-center">Consultez les profils, les évaluations et contactez directement l'expert de votre choix.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experts Showcase */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Experts Financiers</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Des professionnels qualifiés dans divers domaines de la finance, prêts à vous servir.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white rounded-xl overflow-hidden shadow-md"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-efinance-blue to-efinance-green opacity-70"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">Comptabilité & Fiscalité</p>
                  <p className="text-xs">Centre</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">Jean Kamga</h3>
                <div className="flex items-center mt-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={i < 4 ? "currentColor" : "none"} stroke="currentColor" 
                        className={`w-4 h-4 ${i < 4 ? "text-yellow-500" : "text-gray-300"}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-1">10 ans d'expérience</span>
                </div>
                <Link to="/search">
                  <Button variant="outline" className="w-full mt-2">
                    Voir profil
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl overflow-hidden shadow-md"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-efinance-blue to-efinance-green opacity-70"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">Finance d'entreprise</p>
                  <p className="text-xs">Littoral</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">Marie Ekotto</h3>
                <div className="flex items-center mt-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={i < 5 ? "currentColor" : "none"} stroke="currentColor" 
                        className={`w-4 h-4 ${i < 5 ? "text-yellow-500" : "text-gray-300"}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-1">8 ans d'expérience</span>
                </div>
                <Link to="/search">
                  <Button variant="outline" className="w-full mt-2">
                    Voir profil
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl overflow-hidden shadow-md"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-efinance-blue to-efinance-green opacity-70"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">Investissement</p>
                  <p className="text-xs">Ouest</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">Thomas Ondoa</h3>
                <div className="flex items-center mt-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={i < 4 ? "currentColor" : "none"} stroke="currentColor" 
                        className={`w-4 h-4 ${i < 4 ? "text-yellow-500" : "text-gray-300"}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-1">15 ans d'expérience</span>
                </div>
                <Link to="/search">
                  <Button variant="outline" className="w-full mt-2">
                    Voir profil
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/search">
              <Button className="bg-gradient-to-r from-efinance-blue to-efinance-green hover:opacity-90 text-white">
                Voir tous les experts <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-efinance-blue to-efinance-green text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Vous êtes un expert financier?</h2>
            <p className="text-lg mb-8">Rejoignez notre réseau et développez votre clientèle partout au Cameroun.</p>
            <Link to="/admin">
              <Button className="bg-white text-efinance-blue hover:bg-gray-100">
                S'inscrire comme expert
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
