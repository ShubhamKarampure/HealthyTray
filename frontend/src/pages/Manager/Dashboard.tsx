import React from 'react';
import { FaUserInjured, FaClipboardList, FaExclamationTriangle, FaUserPlus } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const pantryData = [
    { name: 'Prepared', value: 70 },
    { name: 'Pending', value: 30 },
  ];
  const COLORS = ['#93c5fd', '#bfdbfe'];
  
  return (
    <div className="min-h-screen">
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl text-blue-800 mb-8">Hospital Dashboard</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FaUserInjured className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-blue-600">Total Patients</p>
                  <p className="text-2xl text-blue-900 font-semibold">347</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FaClipboardList className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-blue-600">Pending Deliveries</p>
                  <p className="text-2xl text-blue-900 font-semibold">42</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FaExclamationTriangle className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-blue-600">Overdue Deliveries</p>
                  <p className="text-2xl text-blue-900 font-semibold">8</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FaUserPlus className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-blue-600">New Patients Today</p>
                  <p className="text-2xl text-blue-900 font-semibold">12</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
              <h3 className="text-lg text-blue-800 mb-4">Pantry Performance</h3>
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
              <h3 className="text-lg text-blue-800 mb-4">Meal Plan Compliance</h3>
              <div className="mt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-blue-600">Overall Compliance</span>
                  <span className="text-sm font-semibold text-blue-800">85%</span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-sm text-blue-600 mt-4">
                  85% of patients are following their prescribed meal plans
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
              <h3 className="text-lg text-blue-800 mb-4">Recent Alerts</h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <FaExclamationTriangle className="text-blue-600 mr-3" />
                  <p className="text-sm text-blue-800">3 meal deliveries delayed in Ward A</p>
                </div>
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <FaExclamationTriangle className="text-blue-600 mr-3" />
                  <p className="text-sm text-blue-800">New patient with severe nut allergy admitted</p>
                </div>
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <FaExclamationTriangle className="text-blue-600 mr-3" />
                  <p className="text-sm text-blue-800">Pantry staff shortage for evening shift</p>
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
  id: number;
  name: string;
  age: number;
  gender: string;
  roomNumber: string;
  mealPlan: string;
  allergies: string;
}

const patients: Patient[] = [
  { id: 1, name: "John Doe", age: 45, gender: "Male", roomNumber: "101A", mealPlan: "Low Sodium", allergies: "Peanuts" },
  { id: 2, name: "Jane Smith", age: 32, gender: "Female", roomNumber: "203B", mealPlan: "Diabetic", allergies: "Lactose" },
  { id: 3, name: "Bob Johnson", age: 58, gender: "Male", roomNumber: "305C", mealPlan: "Regular", allergies: "None" },
  { id: 4, name: "Alice Brown", age: 27, gender: "Female", roomNumber: "102A", mealPlan: "Vegetarian", allergies: "Soy" },
  { id: 5, name: "Charlie Davis", age: 63, gender: "Male", roomNumber: "204B", mealPlan: "Soft", allergies: "Shellfish" },
];

const PatientList: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
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
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Meal Plan</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Allergies</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-blue-50">
          {filteredPatients.map((patient) => (
            <tr key={patient.id} className="hover:bg-blue-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">{patient.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700">{patient.age}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700">{patient.gender}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700">{patient.roomNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700">{patient.mealPlan}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700">{patient.allergies}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
