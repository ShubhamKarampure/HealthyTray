// controllers/mealController.js
const { PrismaClient, MealType, PreparationStatus, DeliveryStatus } = require('@prisma/client');
const { get } = require('../routes/patientRoutes');
const prisma = new PrismaClient();
// Get all meals for a patient
async function getPatientMeals(req, res) {
    const { id } = req.params;
    try {
        const dietPlan = await prisma.dietPlan.findFirst({
            where: { patientId: id },  // Ensure we query by the patientId
            include: {
                morningMeal: {
                    include: {
                        pantryStaff: true,
                        deliveryPersonnel: true,
                    },
                },
                eveningMeal: {
                    include: {
                        pantryStaff: true,
                        deliveryPersonnel: true,
                    },
                },
                nightMeal: {
                    include: {
                        pantryStaff: true,
                        deliveryPersonnel: true,
                    },
                },
            },
        });

        // Ensure dietPlan is found before responding
        if (!dietPlan) {
            return res.status(404).json({ error: 'Diet plan not found' });
        }

        res.json(dietPlan);
    } catch (error) {
        console.error('Error fetching patient meals:', error);
        res.status(500).json({ error: 'Failed to fetch patient meals' });
    }
}

async function createOrUpdateMeal(req, res) {
    const { id: patientId } = req.params;
    const { mealType, ingredients, instructions, pantryStaffId } = req.body;

    try {
        // Input validation
        if (!patientId) {
            return res.status(400).json({ error: 'Patient ID is required' });
        }

        const validMealTypes = ['Morning', 'Evening', 'Night'];
        if (!validMealTypes.includes(mealType)) {
            return res.status(400).json({ error: 'Invalid meal type' });
        }

        // Start a transaction to ensure data consistency
        const result = await prisma.$transaction(async (prisma) => {
            // 1. Create new meal detail
            const mealDetail = await prisma.mealDetail.create({
                data: {
                    mealType,
                    ingredients,
                    instructions,
                    preparationStatus: 'Pending',
                    deliveryStatus: 'Pending',
                    pantryStaffId,
                },
                include: {
                    pantryStaff: {
                        select: {
                            name: true,
                        },
                    },
                },
            });

            // 2. Find existing diet plan for the patient
            const existingDietPlan = await prisma.dietPlan.findFirst({
                where: {
                    patientId,
                },
            });

            if (existingDietPlan) {
                // 3a. Update existing diet plan
                const updateData = {
                    [`${mealType.toLowerCase()}MealId`]: mealDetail.id,
                };

                await prisma.dietPlan.update({
                    where: {
                        id: existingDietPlan.id,
                    },
                    data: updateData,
                });
            } else {
                // 3b. Create new diet plan
                const mealData = {
                    [`${mealType.toLowerCase()}MealId`]: mealDetail.id,
                     morningMealId: mealType === 'Morning' ? mealDetail.id : null,
                    eveningMealId: mealType === 'Evening' ? mealDetail.id : null,
                    nightMealId: mealType === 'Night' ? mealDetail.id : null,
                };

                await prisma.dietPlan.create({
                    data: {
                        patientId,
                        ...mealData,
                    },
                });
            }

            return mealDetail;
        });

        // Send response with the created/updated meal detail
        res.json(result);
    } catch (error) {
        console.error('Error occurred:', error);
        
        // Provide more specific error messages based on the error type
        if (error.code === 'P2002') {
            return res.status(409).json({ 
                error: 'A meal with these details already exists' 
            });
        }
        
        if (error.code === 'P2025') {
            return res.status(404).json({ 
                error: 'Patient or Pantry Staff not found' 
            });
        }

        res.status(500).json({ 
            error: 'Failed to create/update meal',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}


// Update meal status
async function updateMealStatus(req, res) {
    const { mealId } = req.params;
    const { preparationStatus, deliveryStatus, deliveryPersonnelId, deliveryNotes } = req.body;

    try {
        const updatedMeal = await prisma.mealDetail.update({
            where: { id: mealId },
            data: {
                preparationStatus,
                deliveryStatus,
                deliveryPersonnelId,
                deliveryNotes,
                ...(deliveryStatus === DeliveryStatus.Delivered && {
                    deliveredAt: new Date(),
                }),
            },
            include: {
                pantryStaff: true,
                deliveryPersonnel: true,
            },
        });

        res.json(updatedMeal);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update meal status' });
    }
}

// Get available pantry staff
async function getAvailablePantryStaff(req, res) {
    try {
        console.log('Fetching pantry staff with role: Pantry'); // Debug log
        const pantryStaff = await prisma.user.findMany({
            where: { role: 'Pantry' },
            select: {
                id: true,
                name: true,
                contactInfo: true,
            },
        });

        console.log('Pantry staff:', pantryStaff); // Debug log

        if (!pantryStaff || pantryStaff.length === 0) {
            return res.status(404).json({ error: 'No pantry staff found' });
        }

        res.json(pantryStaff);
    } catch (error) {
        console.error('Error fetching pantry staff:', error); // Log the error
        res.status(500).json({ error: 'Failed to fetch pantry staff' });
    }
}

// Get available delivery staff
async function getAvailableDeliveryStaff(req, res) {
    try {
        console.log('Fetching delivery staff with role: Delivery'); // Debug log
        const deliveryStaff = await prisma.user.findMany({
            where: { role: 'Delivery' },
            select: {
                id: true,
                name: true,
                contactInfo: true,
            },
        });

        console.log('Delivery staff:', deliveryStaff); // Debug log

        if (!deliveryStaff || deliveryStaff.length === 0) {
            return res.status(404).json({ error: 'No delivery staff found' });
        }

        res.json(deliveryStaff);
    } catch (error) {
        console.error('Error fetching delivery staff:', error); // Log the error
        res.status(500).json({ error: 'Failed to fetch delivery staff' });
    }
}

module.exports = {
    getPatientMeals,
    createOrUpdateMeal,
    updateMealStatus,
    getAvailablePantryStaff,
    getAvailableDeliveryStaff,
};
