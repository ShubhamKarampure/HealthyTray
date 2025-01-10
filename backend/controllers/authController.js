const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');
const prisma = new PrismaClient();

async function register(req, res) {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });
    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).json({ error: 'Invalid credentials' });

    const token = generateToken({ id: user.id, role: user.role });

    // Include the user data in the response
    res.json({ message: 'Login successful', token, user }); 
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
}


module.exports = { register, login };
