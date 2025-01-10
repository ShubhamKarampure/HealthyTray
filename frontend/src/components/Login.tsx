import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/api/authApi";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  const { login, isAuthenticated, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to handle error message
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on role if already logged in
      if (user.role === "Manager") {
        navigate("/home/manager/dashboard");
      } else if (user.role === "Pantry") {
        navigate("/home/pantry/dashboard");
      } else if (user.role === "Delivery") {
        navigate("/home/delivery/dashboard");
      }
    }
  }, [isAuthenticated, user, navigate]);

 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(""); // Reset error on each login attempt

  try {
    // Directly destructure the response from loginUser
    const { token, user } = await loginUser(email, password); 
    
    if (token && user) {
      login(token, user); // Store token and user in AuthContext and localStorage
      onClose(); // Close the modal

      // Redirect based on role
      if (user.role === "Manager") {
        navigate("/manager/dashboard");
      } else if (user.role === "Pantry") {
        navigate("/pantry/dashboard");
      } else if (user.role === "Delivery") {
        navigate("/delivery/dashboard");
      }
    }
  } catch (error: any) {
    // Handle error and display error message to the user
    setError("Invalid credentials. Please try again.");
  }
};


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>} {/* Display error message */}
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <button
          onClick={onClose}
          className="w-full mt-4 p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Login;
