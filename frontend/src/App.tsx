// src/App.tsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PageNotFound from "./components/PageNotFound";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />, // LandingPage where users can login
    errorElement: <PageNotFound />,
  },
  {
    path: "/home", // Protected route
    element: <ProtectedRoute />, // This will protect the dashboard
    children: [
      {
        path: "dashboard",
        element: <HomePage />, // The dashboard component
      },
    ],
  },
]);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
