import { lazy } from "react";
// Hospital Food Manager Pages
const ManagerDashboard = lazy(() => import("@/pages/Manager/Dashboard"));
const PatientDetails = lazy(() => import("@/pages/Manager/PatientDetails"));
const MealManagement = lazy(() => import("@/pages/Manager/MealManagement"));
const PatientMealTracking = lazy(() => import("@/pages/Manager/PatientMealTracking"));

// Inner Pantry Pages
const PantryDashboard = lazy(() => import("@/pages/Pantry/Dashboard"));
const MealPreparation = lazy(() => import("@/pages/Pantry/MealPreparation"));
const PatientMealPreparation = lazy(() => import("@/pages/Pantry/PatientPreparationTrack"));

// Delivery Personnel Pages
const DeliveryDashboard = lazy(() => import("@/pages/Delivery/Dashboard"));
const AssignedDeliveries = lazy(() => import("@/pages/Delivery/AssignedDeliveries"));

// Authentication Pages
const Home = lazy(() => import("@/pages/LandingPage"));

// Route Definitions
const homeRoutes = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
  },
];

const managerRoutes = [
  {
    path: "/home/manager/dashboard",
    name: "Manager Dashboard",
    element: <ManagerDashboard />,
  },
  {
    path: "/home/manager/patients",
    name: "Patient Details",
    element: <PatientDetails />,
  },
  {
    path: "/home/manager/meals",
    name: "Meal Management",
    element: < MealManagement/>,
  },
  {
    path: "/home/manager/meals/:id",
    name: "Patient Meal Tracking",
    element: <PatientMealTracking />,
  }
];

const pantryRoutes = [
  {
    path: "/home/pantry/dashboard",
    name: "Pantry Dashboard",
    element: <PantryDashboard />,
  },
  {
    path: "/home/pantry/meal-preparation",
    name: "Meal Preparation Tasks",
    element: <MealPreparation />,
  },
  {
    path: "/home/pantry/meals/:id",
    name: "Patient Meal Tracking",
    element: <PatientMealPreparation/>,
  }
];

const deliveryRoutes = [
  {
    path: "/home/delivery/dashboard",
    name: "Delivery Dashboard",
    element: <DeliveryDashboard />,
  },
  {
    path: "/home/delivery/assigned",
    name: "Assigned Deliveries",
    element: <AssignedDeliveries />,
  },
];

export const appRoutes = [...homeRoutes];
export const managerRoutesExport = [...managerRoutes];
export const pantryRoutesExport = [...pantryRoutes];
export const deliveryRoutesExport = [...deliveryRoutes];
