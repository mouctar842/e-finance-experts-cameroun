
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-efinance-blue to-efinance-green flex items-center justify-center text-white font-bold text-xl">
                eF
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-800">e-Finance</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-efinance-blue inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-efinance-blue"
              >
                Accueil
              </Link>
              <Link 
                to="/search" 
                className="text-gray-700 hover:text-efinance-blue inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-efinance-blue"
              >
                Recherche
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-efinance-blue inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-efinance-blue"
              >
                À propos
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link to="/search">
              <Button variant="ghost" size="icon" className="mr-2">
                <Search size={20} />
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="outline" className="hidden md:block">
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
