import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, User, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    return (
        <>
            <header className="bg-gray-950 text-white py-6 px-8">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/">
                        <h1 className="text-xl text-white font-logo"> &nbsp;&nbsp;&nbsp; the AGI Prompt</h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-5">
                        <Link
                            to="/home"
                            className={`relative group ${
                                location.pathname === '/home' ? 'text-blue-400' : 'text-gray-300'
                            }`}
                        >
                            Explore
                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                        </Link>
                        <Link
                            to="/leaderboard"
                            className={`relative group ${
                                location.pathname === '/leaderboard' ? 'text-blue-400' : 'text-gray-300'
                            }`}
                        >
                            Leaderboard
                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                        </Link>
                        
                        {/* User Icon */}
                        <Link
                            to={isAuthenticated ? "/profile" : "/login"}
                            className="p-2 hover:text-blue-400 transition-colors duration-300"
                        >
                            <User size={20} />
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden p-2 hover:text-blue-400 transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} className='background-white' /> : <Menu size={24} className='text-white' />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-40 bg-gray-950 transition-transform duration-300 ${
                isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                <div className="flex flex-col items-center justify-center h-full space-y-8">
                    <Link
                        to="/home"
                        className="text-2xl font-semibold text-gray-300 hover:text-blue-400 transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Explore
                    </Link>
                    <Link
                        to="/leaderboard"
                        className="text-2xl font-semibold text-gray-300 hover:text-blue-400 transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Leaderboard
                    </Link>
                    <Link
                        to={isAuthenticated ? "/profile" : "/login"}
                        className="text-2xl font-semibold text-gray-300 hover:text-blue-400 transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <User size={24} />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Header;