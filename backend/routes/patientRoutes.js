const express = require('express');
const { createPatient, getPatients, updatePatient, deletePatient } = require('../controllers/patientController');
const { authenticate, authorizeRole } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticate, authorizeRole('Manager'), createPatient);
router.get('/', authenticate, authorizeRole('Manager'), getPatients);
router.put('/:id', authenticate, authorizeRole('Manager'), updatePatient);
router.delete('/:id', authenticate, authorizeRole('Manager'), deletePatient);

module.exports = router;
