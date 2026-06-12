// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Not logged in → redirect to login
    return <Navigate to='/dashboard' replace />;
  }

  // Logged in → render the children components
  return children;
};

export default ProtectedRoute;
