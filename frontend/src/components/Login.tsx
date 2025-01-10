import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/api/authApi";
import { Role } from "@/utils/types";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  const { login, isAuthenticated, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on user role
      switch (user.role) {
        case Role.Manager:
          navigate("/home/manager/dashboard");
          break;
        case Role.Pantry:
          navigate("/home/pantry/dashboard");
          break;
        case Role.Delivery:
          navigate("/home/delivery/dashboard");
          break;
        default:
          navigate("/home");
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { token, user } = await loginUser(email, password);
      if (token && user) {
        login(token, user);
        onClose();
        navigateBasedOnRole(user.role);
      }
    } catch {
      setError("Invalid credentials. Please try again.");
    }
  };

  const navigateBasedOnRole = (role: string) => {
    if (role === Role.Manager) navigate("/manager/dashboard");
    else if (role === Role.Pantry) navigate("/pantry/dashboard");
    else if (role === Role.Delivery) navigate("/delivery/dashboard");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">Login</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          This is a prototype. Use the following credentials to log in:
        </p>
        <ul className="text-sm text-left text-gray-700 mb-4 list-disc pl-5">
          <li>Manager: <strong>hospital_manager@xyz.com</strong></li>
          <li>Pantry: <strong>hospital_pantry@xyz.com</strong></li>
          <li>Delivery: <strong>hospital_delivery@xyz.com</strong></li>
          <li>Password (all roles): <strong>Password@2025</strong></li>
        </ul>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type={showPassword ? "text" : "password"} // Toggle password visibility
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)} // Toggle the checkbox to show/hide password
              id="showPassword"
              className="mr-2"
            />
            <label htmlFor="showPassword" className="text-sm text-gray-600">
              Show Password
            </label>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
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
