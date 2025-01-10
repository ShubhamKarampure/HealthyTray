import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Array of sample patients data using Indian names
  const patientsData = [
    {
      name: 'Aarav Sharma',
      diseases: 'Diabetes',
      allergies: 'Pollen',
      roomNumber: '101',
      bedNumber: 'A1',
      floorNumber: 1,
      age: 45,
      gender: 'Male',
      contactInfo: '9876543210',
      emergencyContact: '9876123456'
    },
    {
      name: 'Saanvi Patel',
      diseases: 'Asthma',
      allergies: 'Dust',
      roomNumber: '102',
      bedNumber: 'A2',
      floorNumber: 1,
      age: 38,
      gender: 'Female',
      contactInfo: '9123456789',
      emergencyContact: '9876543210'
    },
    {
      name: 'Vihaan Reddy',
      diseases: 'Hypertension',
      allergies: 'Peanuts',
      roomNumber: '201',
      bedNumber: 'B1',
      floorNumber: 2,
      age: 50,
      gender: 'Male',
      contactInfo: '9081726354',
      emergencyContact: '9876543120'
    },
    {
      name: 'Isha Gupta',
      diseases: 'Flu',
      allergies: 'Milk',
      roomNumber: '202',
      bedNumber: 'B2',
      floorNumber: 2,
      age: 27,
      gender: 'Female',
      contactInfo: '8899776655',
      emergencyContact: '9123456790'
    },
    {
      name: 'Kabir Kumar',
      diseases: 'Malaria',
      allergies: 'Mosquitoes',
      roomNumber: '103',
      bedNumber: 'C1',
      floorNumber: 1,
      age: 34,
      gender: 'Male',
      contactInfo: '9345678901',
      emergencyContact: '9876543211'
    },
    {
      name: 'Maya Desai',
      diseases: 'Typhoid',
      allergies: 'Eggs',
      roomNumber: '104',
      bedNumber: 'C2',
      floorNumber: 1,
      age: 23,
      gender: 'Female',
      contactInfo: '9098765432',
      emergencyContact: '9876123458'
    },
    {
      name: 'Arjun Yadav',
      diseases: 'Chronic Cough',
      allergies: 'None',
      roomNumber: '301',
      bedNumber: 'D1',
      floorNumber: 3,
      age: 40,
      gender: 'Male',
      contactInfo: '9223344556',
      emergencyContact: '9998887777'
    },
    {
      name: 'Neha Mehta',
      diseases: 'Cold',
      allergies: 'Cold Drinks',
      roomNumber: '302',
      bedNumber: 'D2',
      floorNumber: 3,
      age: 31,
      gender: 'Female',
      contactInfo: '9654321098',
      emergencyContact: '9876543222'
    },
    {
      name: 'Ravi Singh',
      diseases: 'Cancer',
      allergies: 'Gluten',
      roomNumber: '401',
      bedNumber: 'E1',
      floorNumber: 4,
      age: 55,
      gender: 'Male',
      contactInfo: '9876123457',
      emergencyContact: '9333554422'
    },
    {
      name: 'Shruti Joshi',
      diseases: 'Cholesterol',
      allergies: 'Soy',
      roomNumber: '402',
      bedNumber: 'E2',
      floorNumber: 4,
      age: 28,
      gender: 'Female',
      contactInfo: '9345678765',
      emergencyContact: '9998886666'
    }
  ];

  // Insert patients into the database
  for (const patient of patientsData) {
    await prisma.patient.create({
      data: patient,
    });
  }

  console.log('Patients have been seeded');
}

// Run the seeding process
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
