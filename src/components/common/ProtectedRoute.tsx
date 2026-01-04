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

  // Extract actual user role (handle nested structure: user.user.role or user.role)
  const userRole = (user as any)?.user?.role || (user as any)?.role || "user";
  
  // Role mismatch → redirect to unauthorized page
  if (requiredRole && userRole !== requiredRole) {
    console.log(`❌ Role mismatch: required="${requiredRole}", actual="${userRole}"`);
    return <Navigate to="/unauthorized" replace />;
  }

  console.log(`✅ Role check passed: required="${requiredRole}", actual="${userRole}"`);
  
  // Everything OK → render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
