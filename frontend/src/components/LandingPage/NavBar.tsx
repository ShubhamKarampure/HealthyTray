import React from 'react';

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
          <div className="text-xl font-semibold text-gray-700">
            NutriTray
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-500">Home</a>
            <a href="#" className="text-gray-600 hover:text-blue-500">Features</a>
            <a href="#" className="text-gray-600 hover:text-blue-500">About</a>
            <a href="#" className="text-gray-600 hover:text-blue-500">Contact</a>
          </div>
          <button   onClick={handleLoginClick} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Login
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

