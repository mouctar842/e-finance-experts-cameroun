
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { REGIONS_CAMEROON, SPECIALIZATIONS } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight, ChevronRight, Search, Star, User, Zap } from "lucide-react";

const Index = () => {
  const isMobile = useIsMobile();
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("");
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [animateBackground, setAnimateBackground] = useState(false);

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
  };

  // Dynamic particles for background effect
  const Particles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 md:w-2 md:h-2 bg-white rounded-full opacity-60"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            scale: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.6 + 0.2
          }}
          animate={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            scale: [Math.random() * 1 + 0.5, Math.random() * 2 + 1, Math.random() * 1 + 0.5],
            opacity: [Math.random() * 0.3 + 0.2, Math.random() * 0.7 + 0.3, Math.random() * 0.3 + 0.2],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );

  // Background components
  const HexGrid = () => (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4NCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDg0IDQ4Ij48cGF0aCBkPSJNMCAwaDg0djQ4SDBWMHptNDIgNDhhMjQgMjQgMCAxIDAgMC00OCAyNCAyNCAwIDAgMCAwIDQ4eiIgb3BhY2l0eT0iLjE1IiBmaWxsPSIjOWI4N2Y1IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] bg-center" />
    </div>
  );

  const DataStreams = () => (
    <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-full bg-gradient-to-b from-transparent via-[#1EAEDB] to-transparent"
          style={{
            left: `${Math.random() * 100}%`,
          }}
          initial={{ y: '-100%' }}
          animate={{ y: '200%' }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHeroVisible(true);
    }, 500);

    // Start background animation after page load
    const bgTimer = setTimeout(() => {
      setAnimateBackground(true);
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(bgTimer);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with simplified content */}
      <div className="relative min-h-screen flex items-center bg-gradient-to-br from-[#0A192F] via-[#162A45] to-[#0B2135] overflow-hidden">
        <Particles />
        <HexGrid />
        <DataStreams />
        
        {/* Animated gradient orbs in background */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-[#9b87f5]/10 blur-3xl" 
          animate={{
            scale: animateBackground ? [1, 1.2, 1] : 1,
            opacity: animateBackground ? [0.1, 0.2, 0.1] : 0.1
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-[#1EAEDB]/10 blur-3xl" 
          animate={{
            scale: animateBackground ? [1, 1.3, 1] : 1,
            opacity: animateBackground ? [0.1, 0.15, 0.1] : 0.1
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        <AnimatePresence>
          {isHeroVisible && (
            <div className="container mx-auto px-4 z-10">
              <motion.div 
                className="max-w-3xl mx-auto text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="mb-6 inline-block"
                >
                  <div className="text-center flex items-center justify-center space-x-2 mb-2">
                    <Zap className="text-[#9b87f5] w-8 h-8" />
                    <span className="text-2xl font-bold text-white">e-Finance</span>
                  </div>
                </motion.div>

                <motion.h1 
                  className="text-3xl md:text-5xl font-bold text-white mb-4 cyber-glow"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Experts Financiers au Cameroun
                </motion.h1>
                
                <motion.div
                  className="p-6 holographic rounded-xl neo-border shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="relative">
                      <select 
                        value={selectedRegion} 
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="w-full p-3 rounded-lg border border-white/20 bg-white/5 text-white focus:ring-2 focus:ring-[#9b87f5] transition-all duration-300 outline-none"
                      >
                        <option value="">Choisir une région</option>
                        {REGIONS_CAMEROON.map((region) => (
                          <option key={region} value={region} className="text-black">
                            {region}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#9b87f5]">
                        <ChevronRight size={16} />
                      </div>
                    </div>
                    <div className="relative">
                      <select 
                        value={selectedSpecialization} 
                        onChange={(e) => setSelectedSpecialization(e.target.value)}
                        className="w-full p-3 rounded-lg border border-white/20 bg-white/5 text-white focus:ring-2 focus:ring-[#1EAEDB] transition-all duration-300 outline-none"
                      >
                        <option value="">Choisir une spécialisation</option>
                        {SPECIALIZATIONS.map((spec) => (
                          <option key={spec} value={spec} className="text-black">
                            {spec}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#1EAEDB]">
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                  <Link 
                    to={
                      selectedRegion && selectedSpecialization 
                        ? `/search?region=${selectedRegion}&specialization=${selectedSpecialization}` 
                        : "/search"
                    }
                  >
                    <Button className="w-full bg-gradient-to-r from-[#9b87f5] to-[#1EAEDB] hover:opacity-90 text-white border-none transition-all duration-300 transform hover:scale-[1.02] glow">
                      Rechercher <ArrowRight className="ml-2" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Animated mesh gradient overlay for texture */}
        <div className="absolute inset-0 rotating-bg" style={{ opacity: 0.4 }} />
      </div>

      {/* Features Section - Simplified */}
      <section className="py-12 bg-[#0F1729] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDxkZWZzPgogICAgPHBhdHRlcm4gaWQ9InBhdHQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+CiAgICAgIDxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzlCODdGNSIgZmlsbC1vcGFjaXR5PSIwLjAyIi8+CiAgICA8L3BhdHRlcm4+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dCkiLz4KPC9zdmc+')]" style={{ opacity: 0.2 }} />
        
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div 
              className="holographic p-6 rounded-2xl hover:border-[#9b87f5]/30 transition-all duration-500 floating"
              variants={itemVariants}
              whileHover={{ scale: 1.03, boxShadow: "0 20px 50px rgba(155, 135, 245, 0.1)" }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] text-white flex items-center justify-center rounded-full mb-4 mx-auto shadow-lg glow">
                <Search size={20} />
              </div>
              <h3 className="text-lg font-semibold text-center mb-2 text-white">Région</h3>
            </motion.div>
            
            <motion.div 
              className="holographic p-6 rounded-2xl hover:border-[#1EAEDB]/30 transition-all duration-500 floating"
              variants={itemVariants}
              whileHover={{ scale: 1.03, boxShadow: "0 20px 50px rgba(30, 174, 219, 0.1)" }}
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#1EAEDB] to-[#33C3F0] text-white flex items-center justify-center rounded-full mb-4 mx-auto shadow-lg glow">
                <User size={20} />
              </div>
              <h3 className="text-lg font-semibold text-center mb-2 text-white">Spécialisation</h3>
            </motion.div>
            
            <motion.div 
              className="holographic p-6 rounded-2xl hover:border-[#9b87f5]/30 transition-all duration-500 floating"
              variants={itemVariants}
              whileHover={{ scale: 1.03, boxShadow: "0 20px 50px rgba(155, 135, 245, 0.1)" }}
              style={{ animationDelay: "0.4s" }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#9b87f5] to-[#1EAEDB] text-white flex items-center justify-center rounded-full mb-4 mx-auto shadow-lg glow">
                <Star size={20} />
              </div>
              <h3 className="text-lg font-semibold text-center mb-2 text-white">Contact</h3>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Simplified */}
      <section className="py-10 relative bg-gradient-to-br from-[#1A1F2C] to-[#0F1729] overflow-hidden">
        {/* Animated geometric shapes */}
        <motion.div 
          className="absolute w-64 h-64 rounded-full bg-[#9b87f5]/10 blur-3xl"
          animate={{ 
            x: ["0%", "10%", "0%"],
            y: ["0%", "-30%", "0%"]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '10%', left: '15%' }}
        />
        <motion.div 
          className="absolute w-96 h-96 rounded-full bg-[#1EAEDB]/10 blur-3xl"
          animate={{ 
            x: ["0%", "-20%", "0%"],
            y: ["0%", "20%", "0%"]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ bottom: '10%', right: '15%' }}
        />
        
        <DataStreams />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="holographic p-8 rounded-3xl neo-border text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Link to="/admin">
                  <Button className="bg-gradient-to-r from-[#9b87f5] to-[#1EAEDB] hover:opacity-90 text-white text-lg px-8 py-3 h-auto shadow-xl glow">
                    Inscription Expert
                    <ChevronRight className="ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
