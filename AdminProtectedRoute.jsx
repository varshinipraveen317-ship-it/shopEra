import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  //  Not logged in → go to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  //  Logged in → allow access
  // Admin check is handled securely by backend (adminAuth)
  return children;
};

export default AdminProtectedRoute;
