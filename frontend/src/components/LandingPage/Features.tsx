import React from 'react';
import { FaClipboardList, FaUsers, FaTruck } from 'react-icons/fa';

const features = [
  {
    title: 'Hospital Food Manager',
    description: 'Manage patient details, create diet charts, and oversee food preparation and delivery.',
    icon: FaClipboardList,
  },
  {
    title: 'Inner Pantry Management',
    description: 'Efficiently manage food preparation tasks and coordinate with delivery personnel.',
    icon: FaUsers,
  },
  {
    title: 'Delivery Tracking',
    description: 'Real-time tracking of meal deliveries and easy status updates for delivery personnel.',
    icon: FaTruck,
  },
];

const Features: React.FC = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
