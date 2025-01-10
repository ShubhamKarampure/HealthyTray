import React, { useState } from 'react';
import { FaEdit, FaSearch } from 'react-icons/fa';

interface Patient {
  id: number;
  name: string;
  mealStatus: 'Not Assigned' | 'In Pantry' | 'Delivered';
  age: number;
  roomNumber: string;
  contactInformation: string;
}

const initialPatients: Patient[] = [
  { id: 1, name: 'John Doe', mealStatus: 'Not Assigned', age: 45, roomNumber: '101A', contactInformation: '123-456-7890' },
  { id: 2, name: 'Jane Smith', mealStatus: 'In Pantry', age: 32, roomNumber: '203B', contactInformation: '234-567-8901' },
  { id: 3, name: 'Robert Brown', mealStatus: 'Delivered', age: 50, roomNumber: '305C', contactInformation: '345-678-9012' },
];

const MealManagement: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Sorting patients by meal status: Not Assigned -> In Pantry -> Delivered
  const sortedPatients = patients
    .filter(patient => patient.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const statusOrder = { 'Not Assigned': 1, 'In Pantry': 2, 'Delivered': 3 };
      return statusOrder[a.mealStatus] - statusOrder[b.mealStatus];
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl text-blue-800 mb-8">Meal Management</h1>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search by patient name"
                className="p-2 border border-blue-200 rounded-md"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="text-blue-600" />
            </div>
           
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
            <div className="p-6 border-b border-blue-100">
              <h3 className="text-lg text-blue-800">Patient Meal Status</h3>
            </div>
            <div className="overflow-x-auto p-6">
              <table className="min-w-full divide-y divide-blue-100">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Age</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Room</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Meal Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Update</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-50">
                  {sortedPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className={`hover:bg-blue-50 transition-colors ${
                        patient.mealStatus === 'Not Assigned' ? 'bg-red-50' :
                        patient.mealStatus === 'In Pantry' ? 'bg-yellow-50' :
                        'bg-green-50'
                      }`}
                    >
                      <td className="px-6 py-4 text-sm text-blue-900">{patient.name}</td>
                      <td className="px-6 py-4 text-sm text-blue-700">{patient.age}</td>
                      <td className="px-6 py-4 text-sm text-blue-700">{patient.roomNumber}</td>
                      <td className="px-6 py-4 text-sm text-blue-700">{patient.mealStatus}</td>
                      <td className="px-6 py-4 text-sm text-blue-700">{patient.contactInformation}</td>
                      <td className="px-6 py-4 text-sm text-blue-700">
                        <button className="text-blue-600 hover:text-blue-800">
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MealManagement;
