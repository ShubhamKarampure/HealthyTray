import React, { useEffect, useState } from 'react';
import { FaEdit, FaSearch } from 'react-icons/fa';
import { getAllPatients } from '@/api/patientApi';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

interface Patient {
  id: string;
  name: string;
  age: number;
  roomNumber: string;
  contactInfo: string;
  dietPlans: [];
}

const MealManagement: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchPatients = async () => {
      const data = await getAllPatients();
      if (data) {
        const formattedData = data.map((patient: any) => ({
          ...patient,
          mealStatus: patient.dietPlans.length > 0 ? 'Assigned' : 'Not Assigned',
        }));
        setPatients(formattedData);
      }
    };
    fetchPatients();
  }, []);

  const handleUpdateClick = (id: string) => {
    navigate(`/home/pantry/meals/${id}`); // Navigate to the patient's update page
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  {filteredPatients.map(patient => (
                    <tr
                      key={patient.id}
                    >
                      <td className="px-6 py-4 text-sm text-blue-900">{patient.name}</td>
                      <td className="px-6 py-4 text-sm text-blue-700">{patient.age}</td>
                      <td className="px-6 py-4 text-sm text-blue-700">{patient.roomNumber}</td>
                      <td className="px-6 py-4 text-sm text-blue-700">{patient.mealStatus}</td>
                      <td className="px-6 py-4 text-sm text-blue-700">{patient.contactInfo}</td>
                      <td className="px-6 py-4 text-sm text-blue-700">
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => handleUpdateClick(patient.id)}
                        >
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
