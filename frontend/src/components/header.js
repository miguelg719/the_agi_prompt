import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { isAuthenticated } = useAuth();

    return (
      <header className="bg-gray-950 text-white py-4 px-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/"><h1 className="text-xl text-white font-logo"> &nbsp;&nbsp;&nbsp; the AGI Prompt</h1></Link>
          </div>
          <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-4">
                  <Link to="/home" className="transition-colors duration-300 flex items-center text-base">
                      Explore
                  </Link>
                  <Link to="/leaderboard" className="transition-colors duration-300 flex items-center">
                      Leaderboard
                  </Link>
              </nav>
            <button className="hover:text-blue-400 transition-colors duration-300 hidden md:flex">
              <Link to={isAuthenticated ? "/profile" : "/login"} className="transition-colors duration-300 flex items-center">
                <User size={20} />
              </Link>
            </button>
            <button className="md:hidden">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>
    );
}

export default Header;