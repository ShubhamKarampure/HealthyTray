import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  const { login, isAuthenticated,user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "Manager") {
        navigate("home/manager/dashboard");
      } else if (user.role === "Pantry") {
        navigate("home/pantry/dashboard");
      } else if (user.role === "Delivery") {
        navigate("home/delivery/dashboard");
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate an API call
    if (email === "user@example.com" && password === "password") {
      const token = "mock-jwt-token"; // Normally, you would get this token from the server

      // Create a user object (this could come from your API)
      const user = {
        id: "12345",
        name: "John Doe",
        email: "user@example.com",
        role: "Manager", // Use Role enum instead of string
      };

      login(token, user); // Store token and user in AuthContext and localStorage
      onClose(); // Close the modal
      if (user.role === "Manager") {
        navigate("/manager/dashboard");
      } else if (user.role === "Pantry") {
        navigate("/pantry/dashboard");
      } else if (user.role === "Delivery") {
        navigate("/delivery/dashboard");
      }
    } else {
      alert("Invalid credentials");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
