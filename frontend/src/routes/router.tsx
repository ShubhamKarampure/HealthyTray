import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

import {
  appRoutes,
  managerRoutesExport,
  pantryRoutesExport,
  deliveryRoutesExport,
} from "@/routes/index";
import Layout from "@/layouts/Layout";
import PageNotFound from "@/pages/PageNotFound";

const AppRouter = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      {/* Home Routes */}
      {(appRoutes || []).map((route, idx) => (
        <Route
          key={idx + route.name}
          path={route.path}
          element={route.element}
        />
      ))}

      {/* Manager Routes */}
      {(managerRoutesExport || []).map((route, idx) => (
        <Route
          key={idx + route.name}
          path={route.path}
          element={
            isAuthenticated && user && user.role === "Manager" ? (
              <Layout>{route.element}</Layout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      ))}

      {/* Pantry Routes */}
      {(pantryRoutesExport || []).map((route, idx) => (
        <Route
          key={idx + route.name}
          path={route.path}
          element={
            isAuthenticated && user && user.role === "pantry" ? (
              <Layout>{route.element}</Layout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      ))}

      {/* Delivery Personnel Routes */}
      {(deliveryRoutesExport || []).map((route, idx) => (
        <Route
          key={idx + route.name}
          path={route.path}
          element={
            isAuthenticated && user && user.role === "delivery" ? (
              <Layout>{route.element}</Layout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      ))}

      {/* Catch-All Not Found Route */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRouter;
