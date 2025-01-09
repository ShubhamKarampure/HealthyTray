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
  try {
    const patients = await prisma.patient.findMany();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve patients', details: error.message });
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

module.exports = { createPatient, getPatients, updatePatient, deletePatient };
