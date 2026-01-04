import { Routes, Route } from "react-router-dom";
import PublicRoute from "../components/common/PublicRoute";
import UserLayout from "../layout/UserLayout";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import AuthCallback from "../pages/user/AuthCallback";
import Landing from "../pages/Landing";
import Tasks from "../pages/user/Tasks";
import FocusPlan from "../pages/user/FocusPlan";
import AIDashboard from "../pages/user/AIDashboard";
import CalendarPage from "../pages/user/Calendar";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Profile from "../pages/user/Profile";
import Feedback from "../pages/user/Feedback";
import NotificationsPage from "../components/Notifications";
import NotFound from "../pages/error/NotFound";
import Unauthorized from "../pages/error/Unauthorized";
// Legal pages
import PrivacyPolicy from "../pages/legal/PrivacyPolicy";
import TermsOfService from "../pages/legal/TermsOfService";
import CookiePolicy from "../pages/legal/CookiePolicy";
// Support pages
import HelpCenter from "../pages/support/HelpCenter";
import FAQ from "../pages/support/FAQ";
import ContactSupport from "../pages/support/ContactSupport";
import Roadmap from "../pages/support/Roadmap";

export default function UserRoutes() {
  return (
    <Routes>
      {/* Public pages: root shows Landing; register/login remain public */}
      <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/auth-callback" element={<AuthCallback />} />
      <Route path="/auth/github/callback" element={<AuthCallback />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Public: Legal */}
      <Route path="/legal/privacy" element={<PublicRoute><PrivacyPolicy /></PublicRoute>} />
      <Route path="/legal/terms" element={<PublicRoute><TermsOfService /></PublicRoute>} />
      <Route path="/legal/cookies" element={<PublicRoute><CookiePolicy /></PublicRoute>} />
      
      {/* Alternate paths used in footer */}
      <Route path="/pages/PrivacyPolicy" element={<PublicRoute><PrivacyPolicy /></PublicRoute>} />
      <Route path="/pages/TermsOfService" element={<PublicRoute><TermsOfService /></PublicRoute>} />
      <Route path="/pages/CookiePolicy" element={<PublicRoute><CookiePolicy /></PublicRoute>} />

      {/* Public: Support */}
      <Route path="/support/help" element={<PublicRoute><HelpCenter /></PublicRoute>} />
      <Route path="/support/faq" element={<PublicRoute><FAQ /></PublicRoute>} />
      <Route path="/support/contact" element={<PublicRoute><ContactSupport /></PublicRoute>} />
      <Route path="/support/roadmap" element={<PublicRoute><Roadmap /></PublicRoute>} />
      
      {/* Alternate paths used in footer */}
      <Route path="/pages/HelpCenter" element={<PublicRoute><HelpCenter /></PublicRoute>} />
      <Route path="/pages/FAQ" element={<PublicRoute><FAQ /></PublicRoute>} />
      <Route path="/pages/ContactSupport" element={<PublicRoute><ContactSupport /></PublicRoute>} />
      <Route path="/pages/Roadmap" element={<PublicRoute><Roadmap /></PublicRoute>} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute><UserLayout /></ProtectedRoute>}>
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/ai/focus-plan" element={<FocusPlan />} />
        <Route path="/ai/dashboard" element={<AIDashboard />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feedback" element={<Feedback />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
