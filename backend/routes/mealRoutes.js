const express = require('express');
const {
  getPatientMeals,
  createOrUpdateMeal,
  getAvailablePantryStaff,
    updateMealStatus,
  getAvailableDeliveryStaff
} = require('../controllers/mealController'); // Adjust the path if necessary

const router = express.Router();

router.get('/pantry-staff', getAvailablePantryStaff); // Get available pantry staff
router.get('/delivery-staff', getAvailableDeliveryStaff); // Get available pantry staff
router.get('/patient/:id', getPatientMeals); // Get meals for a specific patient
router.post('/patient/:id', createOrUpdateMeal); // Create or update a meal for a specific patient
router.put('/patient/:mealId/status', updateMealStatus); // Update the status of a meal

module.exports = router;
