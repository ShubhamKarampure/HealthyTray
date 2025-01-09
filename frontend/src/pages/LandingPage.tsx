import React, { useState } from 'react';
import Hero from '../components/LandingPage/Hero';
import Features from '../components/LandingPage/Features';
import Footer from '../components/LandingPage/Footer';
import HomeNavbar from '../components/LandingPage/NavBar';
import Login from '../components/Login'; 

const LandingPage: React.FC = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);

  const onLoginOpen = () => setLoginOpen(true);
  const onLoginClose = () => setLoginOpen(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <HomeNavbar onLoginOpen={onLoginOpen} />
      <Hero />
      <Features />
      <Footer />
      {/* Modals */}
      <Login isOpen={isLoginOpen} onClose={onLoginClose} />
    </div>
  );
};

export default LandingPage;
