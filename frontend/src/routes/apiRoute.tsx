const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;

export const API_ROUTES = {
    // User-related routes
    LOGIN: `${API_BASE_URL}/api/auth/login`, // User login (JWT)

    PATIENTS: `${API_BASE_URL}/api/patients`, // Get all patients
}