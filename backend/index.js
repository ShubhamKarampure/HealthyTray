const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const mealRoutes = require('./routes/mealRoutes');

const app = express();

// Allow localhost and the production Vercel domain
const corsOptions = {
  origin: ['http://localhost:5173', 'https://healthy-tray.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions)); // Apply CORS middleware before route definitions
app.use(express.json());

app.use('/api/auth', cors(corsOptions),authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/meals', mealRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
