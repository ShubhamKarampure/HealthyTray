const { PrismaClient, MealType, PreparationStatus, DeliveryStatus } = require('@prisma/client');

const prisma = new PrismaClient();

class MealController {
    // Create a single meal detail
    async createMealDetail(data) {
        try {
            // Verify pantry staff exists
            const pantryStaff = await prisma.user.findUnique({
                where: { id: data.pantryStaffId }
            });

            if (!pantryStaff || pantryStaff.role !== 'Pantry') {
                throw new Error('Invalid pantry staff ID');
            }

            const meal = await prisma.mealDetail.create({
                data: {
                    mealType: data.mealType,
                    ingredients: data.ingredients,
                    instructions: data.instructions,
                    pantryStaffId: data.pantryStaffId,
                    preparationStatus: PreparationStatus.Pending,
                    deliveryStatus: DeliveryStatus.Pending,
                }
            });

            return meal;
        } catch (error) {
            throw new Error(`Failed to create meal: ${error.message}`);
        }
    }

    // Create complete diet plan with all meals
    async createDietPlan(data) {
        try {
            // Verify patient exists
            const patient = await prisma.patient.findUnique({
                where: { id: data.patientId }
            });

            if (!patient) {
                throw new Error('Patient not found');
            }

            // Create all meals in a transaction
            const dietPlan = await prisma.$transaction(async (prisma) => {
                // Create morning meal
                const morningMeal = await prisma.mealDetail.create({
                    data: {
                        mealType: MealType.Morning,
                        ingredients: data.morningMeal.ingredients,
                        instructions: data.morningMeal.instructions,
                        pantryStaffId: data.morningMeal.pantryStaffId,
                        preparationStatus: PreparationStatus.Pending,
                        deliveryStatus: DeliveryStatus.Pending,
                    }
                });

                // Create evening meal
                const eveningMeal = await prisma.mealDetail.create({
                    data: {
                        mealType: MealType.Evening,
                        ingredients: data.eveningMeal.ingredients,
                        instructions: data.eveningMeal.instructions,
                        pantryStaffId: data.eveningMeal.pantryStaffId,
                        preparationStatus: PreparationStatus.Pending,
                        deliveryStatus: DeliveryStatus.Pending,
                    }
                });

                // Create night meal
                const nightMeal = await prisma.mealDetail.create({
                    data: {
                        mealType: MealType.Night,
                        ingredients: data.nightMeal.ingredients,
                        instructions: data.nightMeal.instructions,
                        pantryStaffId: data.nightMeal.pantryStaffId,
                        preparationStatus: PreparationStatus.Pending,
                        deliveryStatus: DeliveryStatus.Pending,
                    }
                });

                // Create diet plan linking all meals
                const dietPlan = await prisma.dietPlan.create({
                    data: {
                        patientId: data.patientId,
                        morningMealId: morningMeal.id,
                        eveningMealId: eveningMeal.id,
                        nightMealId: nightMeal.id,
                    },
                    include: {
                        patient: true,
                        morningMeal: true,
                        eveningMeal: true,
                        nightMeal: true,
                    }
                });

                return dietPlan;
            });

            return dietPlan;
        } catch (error) {
            throw new Error(`Failed to create diet plan: ${error.message}`);
        }
    }

    // Update meal preparation status
    async updateMealPreparationStatus(mealId, status, pantryStaffId) {
        try {
            const meal = await prisma.mealDetail.findUnique({
                where: { id: mealId }
            });

            if (!meal) {
                throw new Error('Meal not found');
            }

            if (meal.pantryStaffId !== pantryStaffId) {
                throw new Error('Unauthorized to update this meal');
            }

            const updatedMeal = await prisma.mealDetail.update({
                where: { id: mealId },
                data: { preparationStatus: status }
            });

            return updatedMeal;
        } catch (error) {
            throw new Error(`Failed to update meal preparation status: ${error.message}`);
        }
    }

    // Assign delivery personnel to meal
    async assignDeliveryPersonnel(mealId, deliveryPersonnelId) {
        try {
            // Verify delivery personnel exists and has correct role
            const deliveryPerson = await prisma.user.findUnique({
                where: { id: deliveryPersonnelId }
            });

            if (!deliveryPerson || deliveryPerson.role !== 'Delivery') {
                throw new Error('Invalid delivery personnel ID');
            }

            const updatedMeal = await prisma.mealDetail.update({
                where: { id: mealId },
                data: { 
                    deliveryPersonnelId,
                    deliveryStatus: DeliveryStatus.Pending
                }
            });

            return updatedMeal;
        } catch (error) {
            throw new Error(`Failed to assign delivery personnel: ${error.message}`);
        }
    }

    // Mark meal as delivered
    async markMealDelivered(mealId, deliveryPersonnelId, notes) {
        try {
            const meal = await prisma.mealDetail.findUnique({
                where: { id: mealId }
            });

            if (!meal || meal.deliveryPersonnelId !== deliveryPersonnelId) {
                throw new Error('Unauthorized to update this delivery');
            }

            const updatedMeal = await prisma.mealDetail.update({
                where: { id: mealId },
                data: {
                    deliveryStatus: DeliveryStatus.Delivered,
                    deliveredAt: new Date(),
                    deliveryNotes: notes
                }
            });

            return updatedMeal;
        } catch (error) {
            throw new Error(`Failed to mark meal as delivered: ${error.message}`);
        }
    }

    // Get patient's current diet plan
    async getPatientDietPlan(patientId) {
        try {
            const dietPlan = await prisma.dietPlan.findFirst({
                where: { patientId },
                include: {
                    patient: true,
                    morningMeal: true,
                    eveningMeal: true,
                    nightMeal: true,
                },
                orderBy: {
                    id: 'desc'
                }
            });

            if (!dietPlan) {
                throw new Error('No diet plan found for patient');
            }

            return dietPlan;
        } catch (error) {
            throw new Error(`Failed to get patient diet plan: ${error.message}`);
        }
    }

    // Get all meals assigned to pantry staff
    async getPantryStaffMeals(pantryStaffId) {
        try {
            const meals = await prisma.mealDetail.findMany({
                where: { 
                    pantryStaffId,
                    preparationStatus: {
                        not: PreparationStatus.Completed
                    }
                },
                orderBy: {
                    id: 'desc'
                }
            });

            return meals;
        } catch (error) {
            throw new Error(`Failed to get pantry staff meals: ${error.message}`);
        }
    }

    // Get all meals assigned to delivery personnel
    async getDeliveryPersonnelMeals(deliveryPersonnelId) {
        try {
            const meals = await prisma.mealDetail.findMany({
                where: { 
                    deliveryPersonnelId,
                    deliveryStatus: DeliveryStatus.Pending
                },
                orderBy: {
                    id: 'desc'
                }
            });

            return meals;
        } catch (error) {
            throw new Error(`Failed to get delivery personnel meals: ${error.message}`);
        }
    }
}

module.exports = MealController;
