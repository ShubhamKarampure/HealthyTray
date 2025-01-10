import React, { useState } from 'react';

interface PatientInfo {
  name: string;
  diseases: string;
  allergies: string;
  roomNumber: string;
  bedNumber: string;
  floorNumber: string;
  age: string;
  gender: string;
  contactInformation: string;
}

const PatientDetails: React.FC = () => {
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    name: '',
    diseases: '',
    allergies: '',
    roomNumber: '',
    bedNumber: '',
    floorNumber: '',
    age: '',
    gender: '',
    contactInformation: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientInfo(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Patient Info:', patientInfo);
    // Here you would typically send this data to your backend
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Patient Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={patientInfo.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="diseases" className="block text-sm font-medium text-gray-700">Diseases</label>
          <input
            type="text"
            id="diseases"
            name="diseases"
            value={patientInfo.diseases}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">Allergies</label>
          <input
            type="text"
            id="allergies"
            name="allergies"
            value={patientInfo.allergies}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700">Room Number</label>
          <input
            type="text"
            id="roomNumber"
            name="roomNumber"
            value={patientInfo.roomNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="bedNumber" className="block text-sm font-medium text-gray-700">Bed Number</label>
          <input
            type="text"
            id="bedNumber"
            name="bedNumber"
            value={patientInfo.bedNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="floorNumber" className="block text-sm font-medium text-gray-700">Floor Number</label>
          <input
            type="text"
            id="floorNumber"
            name="floorNumber"
            value={patientInfo.floorNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="text"
            id="age"
            name="age"
            value={patientInfo.age}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={patientInfo.gender}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="contactInformation" className="block text-sm font-medium text-gray-700">Contact Information</label>
          <input
            type="text"
            id="contactInformation"
            name="contactInformation"
            value={patientInfo.contactInformation}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Save Patient Information
      </button>
    </form>
  );
};

export default PatientDetails;
