import React, { useState, useEffect } from "react";
import { FaClipboardList, FaExclamationTriangle, FaUserPlus } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { getAllPatients } from "@/api/patientApi";

const PantryAnalysis = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const pantryData = [
    { name: 'Prepared', value: 70 },
    { name: 'Pending', value: 30 },
  ];
  const COLORS = ['#93c5fd', '#bfdbfe'];

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getAllPatients();
        if (response) {
          setPatients(response);
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  return (
    <div className="min-h-screen">
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl text-blue-800 mb-8">Pantry Task Analysis</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FaClipboardList className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-blue-600">Total Pantry Tasks</p>
                  <p className="text-2xl text-blue-900 font-semibold">102</p> {/* Display total pantry tasks */}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FaExclamationTriangle className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-blue-600">Pending Tasks</p>
                  <p className="text-2xl text-blue-900 font-semibold">30</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FaUserPlus className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-blue-600">New Tasks Assigned Today</p>
                  <p className="text-2xl text-blue-900 font-semibold">8</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
              <h3 className="text-lg text-blue-800 mb-4">Pantry Task Status</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pantryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pantryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-300 rounded-full mr-2"></div>
                  <span className="text-sm text-blue-600">Prepared</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-200 rounded-full mr-2"></div>
                  <span className="text-sm text-blue-600">Pending</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
              <h3 className="text-lg text-blue-800 mb-4">Recent Alerts</h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <FaExclamationTriangle className="text-blue-600 mr-3" />
                  <p className="text-sm text-blue-800">Meal deliveries delayed in Ward A</p>
                </div>
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <FaExclamationTriangle className="text-blue-600 mr-3" />
                  <p className="text-sm text-blue-800">New task assigned to Pantry staff</p>
                </div>
              </div>
            </div>
          </div>

          {/* Patient List */}
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
            <div className="p-6 border-b border-blue-100">
              <h3 className="text-lg text-blue-800">Patient List</h3>

              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search by name"
                className="mt-4 p-2 border border-blue-200 rounded-md w-full"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <PatientList searchTerm={searchTerm} />
          </div>
        </div>
      </main>
    </div>
  );
};

interface Patient {
  id?: string;
  name: string;
  diseases: string;
  allergies: string;
  roomNumber: string;
  bedNumber: string;
  floorNumber: number;
  age: number;
  gender: string;
  contactInfo: string;
  emergencyContact: string;
}

const PatientList: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getAllPatients();
        if (response) {
          setPatients(response);
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-blue-100">
        <thead className="bg-blue-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Age</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Gender</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Room</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Bed Number</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-blue-50">
          {filteredPatients.map((patient) => (
            <tr key={patient.id} className="hover:bg-blue-50 transition-colors">
              <td className="px-6 py-4 text-sm text-blue-800">{patient.name}</td>
              <td className="px-6 py-4 text-sm text-blue-800">{patient.age}</td>
              <td className="px-6 py-4 text-sm text-blue-800">{patient.gender}</td>
              <td className="px-6 py-4 text-sm text-blue-800">{patient.roomNumber}</td>
              <td className="px-6 py-4 text-sm text-blue-800">{patient.bedNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PantryAnalysis;
