
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-efinance-blue to-efinance-green flex items-center justify-center text-white font-bold text-sm">
                eF
              </div>
              <span className="ml-2 text-lg font-semibold text-white">e-Finance</span>
            </Link>
            <p className="text-sm">
              La plateforme qui connecte les Camerounais avec les meilleurs experts financiers du pays.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-sm hover:text-white transition-colors">
                  Rechercher un expert
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Pour les experts</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/admin" className="text-sm hover:text-white transition-colors">
                  S'inscrire comme expert
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Régions</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/search?region=Centre" className="text-sm hover:text-white transition-colors">
                  Centre
                </Link>
              </li>
              <li>
                <Link to="/search?region=Littoral" className="text-sm hover:text-white transition-colors">
                  Littoral
                </Link>
              </li>
              <li>
                <Link to="/search?region=Ouest" className="text-sm hover:text-white transition-colors">
                  Ouest
                </Link>
              </li>
              <li>
                <Link to="/search?region=Sud" className="text-sm hover:text-white transition-colors">
                  Sud
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-sm hover:text-white transition-colors">
                  Toutes les régions
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} e-Finance. Tous droits réservés.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-sm hover:text-white transition-colors">
              Conditions d'utilisation
            </a>
            <a href="#" className="text-sm hover:text-white transition-colors">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
