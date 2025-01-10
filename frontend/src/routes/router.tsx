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
import { Role } from "@/utils/types";

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
            isAuthenticated && user && user.role === Role.Manager ? (
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
            isAuthenticated && user && user.role === Role.Pantry ? (
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
            isAuthenticated && user && user.role === Role.Delivery ? (
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
