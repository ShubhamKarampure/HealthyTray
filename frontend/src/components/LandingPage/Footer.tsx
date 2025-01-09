import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 text-center md:text-left">
            <h3 className="text-lg font-semibold">Hospital Food Delivery</h3>
            <p className="mt-2 text-sm">Improving patient care through efficient meal management.</p>
          </div>
          <div className="w-full md:w-1/3 mt-4 md:mt-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="text-sm">
              <li><a href="#" className="hover:text-blue-300">Home</a></li>
              <li><a href="#" className="hover:text-blue-300">Features</a></li>
              <li><a href="#" className="hover:text-blue-300">About Us</a></li>
              <li><a href="#" className="hover:text-blue-300">Contact</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 mt-4 md:mt-0 text-center md:text-right">
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <p className="text-sm">Email: info@hospitalfooddelivery.com</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          &copy; 2023 Hospital Food Delivery Management. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;