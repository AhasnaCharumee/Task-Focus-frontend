import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

interface ProtectedProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "user";
}

const ProtectedRoute: React.FC<ProtectedProps> = ({ children, requiredRole }) => {
  const { user, loading } = useContext(AuthContext);

  // Show loading until auth state is resolved
  if (loading) {
    return <div style={{ padding: "20px" }}>Loading...</div>;
  }

  // Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role mismatch → redirect to unauthorized page
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Everything OK → render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
