import React from 'react';
import logo from '@/assets/logo.png';

interface NavbarProps {
  onLoginOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginOpen }) => {
  // Handle login click
  const handleLoginClick = () => {
    onLoginOpen();
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-10 h-10" />
            <span className="text-xl font-bold text-gray-900">NutriTray</span>
          </div>

          {/* Navigation links */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-200">Home</a>
            <a href="#" className="text-gray-600 hover:text-blue-200">Features</a>
            <a href="#" className="text-gray-600 hover:text-blue-200">About</a>
            <a href="#" className="text-gray-600 hover:text-blue-200">Contact</a>
          </div>

          {/* Login button */}
          <button
            onClick={handleLoginClick}
            className="bg-blue-400 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
