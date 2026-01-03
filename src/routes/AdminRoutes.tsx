import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageTasks from "../pages/admin/ManageTasks";
import Reports from "../pages/admin/Reports";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Unauthorized from "../pages/error/Unauthorized";

export default function AdminRoutes() {
  return (
    <Routes>
      {/* Public admin login */}
      <Route path="login" element={<AdminLogin />} />

      {/* Protected admin routes */}
      <Route
        path="" // empty because /admin/* is matched at App.tsx
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="manage-tasks" element={<ManageTasks />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      {/* Unauthorized page */}
      <Route path="unauthorized" element={<Unauthorized />} />
    </Routes>
  );
}
