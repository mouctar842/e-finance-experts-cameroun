
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { REGIONS_CAMEROON, SPECIALIZATIONS } from "@/types";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/StarRating";
import { useExperts } from "@/context/ExpertContext";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const Search = () => {
  const location = useLocation();
  const { experts, getExpertsByRegionAndSpecialization } = useExperts();
  
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("");
  const [searchResults, setSearchResults] = useState(experts);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Parse query parameters from URL
    const params = new URLSearchParams(location.search);
    const regionParam = params.get("region");
    const specializationParam = params.get("specialization");
    
    if (regionParam) setSelectedRegion(regionParam);
    if (specializationParam) setSelectedSpecialization(specializationParam);
    
    if (regionParam && specializationParam) {
      handleSearch(regionParam, specializationParam);
    }
  }, [location.search]);

  const handleSearch = (region: string, specialization: string) => {
    if (region && specialization) {
      setIsSearching(true);
      setTimeout(() => {
        const results = getExpertsByRegionAndSpecialization(region, specialization);
        setSearchResults(results);
        setIsSearching(false);
      }, 500);
    } else {
      setSearchResults(experts);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(selectedRegion, selectedSpecialization);
  };

  return (
    <div className="min-h-screen pt-20 pb-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Rechercher un Expert Financier</h1>
          
          <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                    Région
                  </label>
                  <select
                    id="region"
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-efinance-blue focus:ring-efinance-blue p-2 border"
                    required
                  >
                    <option value="">Sélectionnez une région</option>
                    {REGIONS_CAMEROON.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
                    Spécialisation
                  </label>
                  <select
                    id="specialization"
                    value={selectedSpecialization}
                    onChange={(e) => setSelectedSpecialization(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-efinance-blue focus:ring-efinance-blue p-2 border"
                    required
                  >
                    <option value="">Sélectionnez une spécialisation</option>
                    {SPECIALIZATIONS.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-efinance-blue to-efinance-green hover:opacity-90 text-white"
                  disabled={isSearching}
                >
                  {isSearching ? "Recherche en cours..." : "Rechercher"}
                </Button>
              </div>
            </form>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {searchResults.length > 0 
                ? `${searchResults.length} expert(s) trouvé(s)` 
                : "Aucun expert trouvé"}
            </h2>
            
            {searchResults.map((expert, index) => (
              <motion.div 
                key={expert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3 bg-gray-200 md:h-auto h-48 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-efinance-blue to-efinance-green opacity-70"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-medium">{expert.specializations.join(", ")}</p>
                        <p className="text-sm">{expert.region}</p>
                      </div>
                    </div>
                    <div className="p-6 md:w-2/3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {expert.firstName} {expert.lastName}
                          </h3>
                          <div className="flex items-center mt-1">
                            <StarRating rating={expert.rating} />
                            <span className="ml-2 text-sm text-gray-600">
                              ({expert.rating.toFixed(1)})
                            </span>
                          </div>
                          <p className="text-gray-600 mt-1">
                            {expert.yearsOfExperience} ans d'expérience
                          </p>
                        </div>
                        <Link to={`/expert/${expert.id}`}>
                          <Button variant="outline">Voir profil</Button>
                        </Link>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex flex-wrap gap-2 mt-2">
                          {expert.specializations.map((spec) => (
                            <span 
                              key={spec} 
                              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                        
                        <div className="mt-4 flex gap-3">
                          <a 
                            href={`mailto:${expert.email}`} 
                            className="text-efinance-blue hover:underline text-sm flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                              <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                              <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                            </svg>
                            Email
                          </a>
                          <a 
                            href={`tel:${expert.phone}`} 
                            className="text-efinance-green hover:underline text-sm flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                              <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                            </svg>
                            Téléphone
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
            
            {selectedRegion && selectedSpecialization && searchResults.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">
                  Aucun expert trouvé pour cette région et cette spécialisation.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedRegion("");
                    setSelectedSpecialization("");
                    setSearchResults(experts);
                  }}
                >
                  Effacer les filtres
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
