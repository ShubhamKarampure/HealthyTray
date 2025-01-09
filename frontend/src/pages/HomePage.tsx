// src/pages/HomePage.tsx
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <h1>Welcome to the Home Page</h1>
      <p>This page is protected. Only authenticated users can access it.</p>
    </div>
  );
};

export default HomePage;
