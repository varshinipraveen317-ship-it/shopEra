import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    //  Clear ALL auth-related data
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("user");

    // VERY IMPORTANT (sync with main Navbar)
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");

    //  Redirect to HOME
    navigate("/", { replace: true });
  };

  return (
    <nav className="admin-navbar">
      <h2>Admin Panel</h2>

      <div className="admin-links">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Products
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Orders
        </NavLink>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
