import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext"; 
import AppRouter from "./routes/router";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
