import React, { useState, useEffect } from "react";
import { FaUserPlus, FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { getAllPatients, createPatient, updatePatient,deletePatient } from "@/api/patientApi";

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

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeletePatient = async (patientId: string) => {
    try {
      // Call API to delete the patient
      await deletePatient(patientId);

      // Remove the deleted patient from the state
      setPatients((prevPatients) =>
        prevPatients.filter((patient) => patient.id !== patientId)
      );
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

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

  const handleAddPatient = () => {
    setCurrentPatient({
      name: "",
      diseases: "",
      allergies: "",
      roomNumber: "",
      bedNumber: "",
      floorNumber: 0,
      age: 0,
      gender: "",
      contactInfo: "",
      emergencyContact: "",
    });
    setIsModalOpen(true);
  };

  const handleUpdatePatient = (patient: Patient) => {
    setCurrentPatient(patient);
    setIsModalOpen(true);
  };
  

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (currentPatient) {
    try {
      if (currentPatient.id) {
        // Update patient if id exists
        await updatePatient(currentPatient);
      } else {
        // Create a new patient (no id required)
        await createPatient(currentPatient);
      }
    } catch (error) {
      console.error("Error saving patient:", error);
    }
  }
  setIsModalOpen(false);
  setCurrentPatient(null);  
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
};

// Ensuring currentPatient is never null when handling inputs
const handleInputChange = (field: keyof Patient, value: string) => {
  setCurrentPatient((prevPatient) => ({
    ...prevPatient!,
    [field]: value,
  }));
};

// Form Inputs
<input
  type="text"
  value={currentPatient?.name || ""}
  onChange={(e) => handleInputChange("name", e.target.value)}
  className="p-2 border border-blue-200 rounded-md w-full"
  required
/>

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
              {patients.length === 0 ? (
                <div className="text-center text-lg text-blue-600">
                  No patient added yet
                </div>
              ) : (
                <table className="min-w-full divide-y divide-blue-100">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                        Age
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                        Room
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                        Gender
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                        Update
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-blue-50">
                    {filteredPatients.map((patient) => (
                      <tr
                        key={patient.id}
                        className="hover:bg-blue-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-blue-900">
                          {patient.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-700">
                          {patient.age}
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-700">
                          {patient.roomNumber}
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-700">
                          {patient.gender}
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-700">
                          {patient.contactInfo}
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-700">
                          <button
                            onClick={() => handleUpdatePatient(patient)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FaEdit />
                          </button>
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-700">
                          <button
                             onClick={() => handleDeletePatient(patient.id!)}
                            className="text-red-600 hover:text-blue-800"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="mt-12 bg-white rounded-lg shadow-xl p-8 w-1/2">
                <h3 className="text-lg text-blue-800 mb-4">
                  {currentPatient?.id ? "Update Patient" : "Add Patient"}
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-blue-600 mb-2">
                        Patient Name
                      </label>
                      <input
                        type="text"
                        value={currentPatient?.name || ""}
                        onChange={(e) =>
                          setCurrentPatient({
                            ...currentPatient,
                            name: e.target.value,
                          } as Patient)
                        }
                        className="p-2 border border-blue-200 rounded-md w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-blue-600 mb-2">
                        Age
                      </label>
                      <input
                        type="number"
                        value={currentPatient?.age || ""}
                        onChange={(e) =>
                          setCurrentPatient({
                            ...currentPatient,
                            age: +e.target.value,
                          } as Patient)
                        }
                        className="p-2 border border-blue-200 rounded-md w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-blue-600 mb-2">
                        Diseases
                      </label>
                      <input
                        type="text"
                        value={currentPatient?.diseases || ""}
                        onChange={(e) =>
                          setCurrentPatient({
                            ...currentPatient,
                            diseases: e.target.value,
                          } as Patient)
                        }
                        className="p-2 border border-blue-200 rounded-md w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-blue-600 mb-2">
                        Allergies
                      </label>
                      <input
                        type="text"
                        value={currentPatient?.allergies || ""}
                        onChange={(e) =>
                          setCurrentPatient({
                            ...currentPatient,
                            allergies: e.target.value,
                          } as Patient)
                        }
                        className="p-2 border border-blue-200 rounded-md w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-blue-600 mb-2">
                        Room Number
                      </label>
                      <input
                        type="text"
                        value={currentPatient?.roomNumber || ""}
                        onChange={(e) =>
                          setCurrentPatient({
                            ...currentPatient,
                            roomNumber: e.target.value,
                          } as Patient)
                        }
                        className="p-2 border border-blue-200 rounded-md w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-blue-600 mb-2">
                        Bed Number
                      </label>
                      <input
                        type="text"
                        value={currentPatient?.bedNumber || ""}
                        onChange={(e) =>
                          setCurrentPatient({
                            ...currentPatient,
                            bedNumber: e.target.value,
                          } as Patient)
                        }
                        className="p-2 border border-blue-200 rounded-md w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-blue-600 mb-2">
                        Floor Number
                      </label>
                      <input
                        type="number"
                        value={currentPatient?.floorNumber || ""}
                        onChange={(e) =>
                          setCurrentPatient({
                            ...currentPatient,
                            floorNumber: +e.target.value,
                          } as Patient)
                        }
                        className="p-2 border border-blue-200 rounded-md w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-blue-600 mb-2">
                        Gender
                      </label>
                      <input
                        type="text"
                        value={currentPatient?.gender || ""}
                        onChange={(e) =>
                          setCurrentPatient({
                            ...currentPatient,
                            gender: e.target.value,
                          } as Patient)
                        }
                        className="p-2 border border-blue-200 rounded-md w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-blue-600 mb-2">
                        Contact Information
                      </label>
                      <input
                        type="text"
                        value={currentPatient?.contactInfo || ""}
                        onChange={(e) =>
                          setCurrentPatient({
                            ...currentPatient,
                            contactInfo: e.target.value,
                          } as Patient)
                        }
                        className="p-2 border border-blue-200 rounded-md w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-blue-600 mb-2">
                        Emergency Contact
                      </label>
                      <input
                        type="text"
                        value={currentPatient?.emergencyContact || ""}
                        onChange={(e) =>
                          setCurrentPatient({
                            ...currentPatient,
                            emergencyContact: e.target.value,
                          } as Patient)
                        }
                        className="p-2 border border-blue-200 rounded-md w-full"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md"
                    >
                      {currentPatient?.id ? "Update" : "Add"} Patient
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
