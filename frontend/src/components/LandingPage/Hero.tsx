import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="bg-blue-600 text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Hospital Food Delivery Management System
        </h1>
        <p className="text-xl mb-8">
          Streamline patient meal planning, preparation, and delivery with our comprehensive solution.
        </p>
        <button className="bg-white text-blue-600 font-bold py-2 px-4 rounded-full hover:bg-gray-100">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;

