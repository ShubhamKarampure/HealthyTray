import React, { useState } from 'react';
import { FaUserPlus, FaEdit, FaSearch } from 'react-icons/fa';

interface Patient {
  id: number;
  name: string;
  diseases: string;
  allergies: string;
  roomNumber: string;
  bedNumber: string;
  floorNumber: string;
  age: number;
  gender: string;
  contactInformation: string;
  emergencyContact: string;
}

const initialPatients: Patient[] = [
  { id: 1, name: 'John Doe', diseases: 'Hypertension', allergies: 'Peanuts', roomNumber: '101A', bedNumber: '1', floorNumber: '1', age: 45, gender: 'Male', contactInformation: '123-456-7890', emergencyContact: '987-654-3210' },
  { id: 2, name: 'Jane Smith', diseases: 'Diabetes', allergies: 'Lactose', roomNumber: '203B', bedNumber: '2', floorNumber: '2', age: 32, gender: 'Female', contactInformation: '234-567-8901', emergencyContact: '876-543-2109' },
];

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPatient = () => {
    setCurrentPatient({
      id: patients.length + 1,
      name: '',
      diseases: '',
      allergies: '',
      roomNumber: '',
      bedNumber: '',
      floorNumber: '',
      age: 0,
      gender: '',
      contactInformation: '',
      emergencyContact: '',
    });
    setIsModalOpen(true);
  };

  const handleUpdatePatient = (patient: Patient) => {
    setCurrentPatient(patient);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPatient) {
      if (patients.some((p) => p.id === currentPatient.id)) {
        setPatients(patients.map((patient) =>
          patient.id === currentPatient.id ? currentPatient : patient
        ));
      } else {
        setPatients([...patients, currentPatient]);
      }
    }
    setIsModalOpen(false);
    setCurrentPatient(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl text-blue-800 mb-8">Patient Details</h1>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search by name"
                className="p-2 border border-blue-200 rounded-md"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="text-blue-600" />
            </div>
            <button
              onClick={handleAddPatient}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <FaUserPlus />
              <span>Add Patient</span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
            <div className="p-6 border-b border-blue-100">
              <h3 className="text-lg text-blue-800">Patient List</h3>
            </div>
            <div className="overflow-x-auto p-6">
              <table className="min-w-full divide-y divide-blue-100">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Age</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Room</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Gender</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Update</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-50">
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-blue-900">{patient.name}</td>
                      <td className="px-6 py-4 text-sm text-blue-700">{patient.age}</td>
                      <td className="px-6 py-4 text-sm text-blue-700">{patient.roomNumber}</td>
                      <td className="px-6 py-4 text-sm text-blue-700">{patient.gender}</td>
                      <td className="px-6 py-4 text-sm text-blue-700">{patient.contactInformation}</td>
                      <td className="px-6 py-4 text-sm text-blue-700">
                        <button
                          onClick={() => handleUpdatePatient(patient)}
                          className="text-blue-600 hover:text-blue-800"
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

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="mt-12 bg-white rounded-lg shadow-xl p-8 w-1/2">
                <h3 className="text-lg text-blue-800 mb-4">{currentPatient?.id ? 'Update Patient' : 'Add Patient'}</h3>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-blue-600 mb-2">Patient Name</label>
                      <input
                        type="text"
                        value={currentPatient?.name || ''}
                        onChange={(e) => setCurrentPatient({ ...currentPatient, name: e.target.value } as Patient)}
                        className="p-2 border border-blue-200 rounded-md w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-blue-600 mb-2">Age</label>
                      <input
                        type="number"
                        value={currentPatient?.age || ''}
                        onChange={(e) => setCurrentPatient({ ...currentPatient, age: +e.target.value } as Patient)}
                        className="p-2 border border-blue-200 rounded-md w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-blue-600 mb-2">Diseases</label>
                      <input
                        type="text"
                        value={currentPatient?.diseases || ''}
                        onChange={(e) => setCurrentPatient({ ...currentPatient, diseases: e.target.value } as Patient)}
                        className="p-2 border border-blue-200 rounded-md w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-blue-600 mb-2">Allergies</label>
                      <input
                        type="text"
                        value={currentPatient?.allergies || ''}
                        onChange={(e) => setCurrentPatient({ ...currentPatient, allergies: e.target.value } as Patient)}
                        className="p-2 border border-blue-200 rounded-md w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-blue-600 mb-2">Room Number</label>
                      <input
                        type="text"
                        value={currentPatient?.roomNumber || ''}
                        onChange={(e) => setCurrentPatient({ ...currentPatient, roomNumber: e.target.value } as Patient)}
                        className="p-2 border border-blue-200 rounded-md w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-blue-600 mb-2">Bed Number</label>
                      <input
                        type="text"
                        value={currentPatient?.bedNumber || ''}
                        onChange={(e) => setCurrentPatient({ ...currentPatient, bedNumber: e.target.value } as Patient)}
                        className="p-2 border border-blue-200 rounded-md w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-blue-600 mb-2">Floor Number</label>
                      <input
                        type="text"
                        value={currentPatient?.floorNumber || ''}
                        onChange={(e) => setCurrentPatient({ ...currentPatient, floorNumber: e.target.value } as Patient)}
                        className="p-2 border border-blue-200 rounded-md w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-blue-600 mb-2">Gender</label>
                      <input
                        type="text"
                        value={currentPatient?.gender || ''}
                        onChange={(e) => setCurrentPatient({ ...currentPatient, gender: e.target.value } as Patient)}
                        className="p-2 border border-blue-200 rounded-md w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-blue-600 mb-2">Contact Information</label>
                      <input
                        type="text"
                        value={currentPatient?.contactInformation || ''}
                        onChange={(e) => setCurrentPatient({ ...currentPatient, contactInformation: e.target.value } as Patient)}
                        className="p-2 border border-blue-200 rounded-md w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-blue-600 mb-2">Emergency Contact</label>
                      <input
                        type="text"
                        value={currentPatient?.emergencyContact || ''}
                        onChange={(e) => setCurrentPatient({ ...currentPatient, emergencyContact: e.target.value } as Patient)}
                        className="p-2 border border-blue-200 rounded-md w-full"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setCurrentPatient(null);
                      }}
                      className="px-4 py-2 mr-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PatientList;
