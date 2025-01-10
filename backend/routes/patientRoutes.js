const express = require('express');
const { createPatient, getPatients, updatePatient, deletePatient,getSinglePatient } = require('../controllers/patientController');
const { authenticate, authorizeRole } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticate, authorizeRole('Manager'), createPatient);
router.get('/', authenticate, getPatients);
router.get('/:id', getSinglePatient);
router.put('/:id', authenticate, authorizeRole('Manager'), updatePatient);
router.delete('/:id', authenticate, authorizeRole('Manager'), deletePatient);

module.exports = router;
