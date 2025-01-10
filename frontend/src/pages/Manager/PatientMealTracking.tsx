import React from 'react';
import PatientDetails from '@/components/ManagerPage/PatientDetails';
import DietChart from '@/components/ManagerPage/DietChart';

const PatientManagement: React.FC = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-semibold text-blue-600 mb-6">Patient Management</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-3 border-b">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Patient Details
          </h2>
        </div>
        <div className="p-4">
          <PatientDetails />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-3 border-b">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Diet Chart
          </h2>
        </div>
        <div className="p-4">
          <DietChart />
        </div>
      </div>
    </div>
  );
};

export default PatientManagement;
