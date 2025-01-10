const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createPatient(req, res) {
  try {
    const patient = await prisma.patient.create({ data: req.body });
    res.status(201).json({ message: 'Patient created', patient });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create patient', details: error.message });
  }
}

async function getPatients(req, res) {
    const userId = req.user.id;
    const userRole = req.user.role;
    console.log('Fetching patients for user:', userId, 'with role:', userRole);

    try {
        let patients;

        if (userRole === 'Pantry') {
            // Fetch patients where the logged-in pantry staff is assigned to morning, evening, or night meals
            patients = await prisma.patient.findMany({
                where: {
                    dietPlans: {
                        some: {
                            OR: [
                                { morningMeal: { pantryStaffId: userId } },
                                { eveningMeal: { pantryStaffId: userId } },
                                { nightMeal: { pantryStaffId: userId } },
                            ],
                        },
                    },
                },
                include: {
                    dietPlans: {
                        include: {
                            morningMeal: true,
                            eveningMeal: true,
                            nightMeal: true,
                        },
                    },
                },
            });
        } else if (userRole === 'Delivery') {
            // Fetch patients where the logged-in delivery personnel is assigned to morning, evening, or night meals
            patients = await prisma.patient.findMany({
                where: {
                    dietPlans: {
                        some: {
                            OR: [
                                { morningMeal: { deliveryPersonnelId: userId } },
                                { eveningMeal: { deliveryPersonnelId: userId } },
                                { nightMeal: { deliveryPersonnelId: userId } },
                            ],
                        },
                    },
                },
                include: {
                    dietPlans: {
                        include: {
                            morningMeal: true,
                            eveningMeal: true,
                            nightMeal: true,
                        },
                    },
                },
            });
        } else if (userRole === 'Manager') {
            // Fetch all patients if the user is a Manager
            patients = await prisma.patient.findMany({
                include: {
                    dietPlans: {
                        include: {
                            morningMeal: true,
                            eveningMeal: true,
                            nightMeal: true,
                        },
                    },
                },
            });
        } else {
            // If the user is not Pantry, Delivery, or Manager role, return unauthorized
            return res.status(403).json({ error: 'Unauthorized access' });
        }

        console.log('Fetched patients:', patients);
        res.json(patients);
    } catch (error) {
        console.error('Error fetching patients data:', error);
        res.status(500).json({ error: 'Error fetching patients data' });
    }
}


async function getSinglePatient(req, res) {
  try {
    const { id } = req.params; // Get patient ID from URL parameters
    const patient = await prisma.patient.findUnique({
      where: { id }, // Find the patient by ID
      include: {
        dietPlans: {
          include: {
            morningMeal: true,
            eveningMeal: true,
            nightMeal: true,
          },
        },
      },
    });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json(patient); // Return the patient details
  } catch (error) {
    res.status(500).json({ error: 'Error fetching patient data', details: error.message });
  }
}


async function updatePatient(req, res) {
  try {
    const { id } = req.params;
    const patient = await prisma.patient.update({ where: { id }, data: req.body });
    res.json({ message: 'Patient updated', patient });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update patient', details: error.message });
  }
}

async function deletePatient(req, res) {
  try {
    const { id } = req.params;
    await prisma.patient.delete({ where: { id } });
    res.json({ message: 'Patient deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete patient', details: error.message });
  }
}

module.exports = { createPatient, getPatients, updatePatient, deletePatient,getSinglePatient };
