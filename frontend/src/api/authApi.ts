// login.js (Frontend code)
import { API_ROUTES } from "../routes/apiRoute";

// Define the expected response data structure
interface LoginResponse {
  token: string;
  message: string;
  user: { role: string }; // Adjust this if needed to include more user data
}

async function loginUser(email: string, password: string): Promise<LoginResponse | void> {
  const loginData = { email, password };

  try {
    const response = await fetch(API_ROUTES.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Login failed:', errorData.error);
      return; // Early return on failure
    }

    const data: LoginResponse = await response.json(); // Type the response
    console.log('Login successful:', data.message);
    
    return data; // Return the response data (token, user)

  } catch (error) {
    console.error('An error occurred during login:', error);
  }
}

export { loginUser };
