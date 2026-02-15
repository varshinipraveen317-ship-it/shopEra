import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        //  USE CORRECT TOKEN KEY
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Unauthorized. Please login again.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/admin/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        //  Handle auth errors clearly
        if (response.status === 401 || response.status === 403) {
          setError("Access denied. Admin only.");
          setLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to load dashboard");
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError("Something went wrong loading dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <AdminLayout>
      <div className="dashboard">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <p className="dashboard-subtitle">
          Welcome back! Manage your store from here.
        </p>

        {loading ? (
          <p>Loading dashboard...</p>
        ) : error ? (
          <p className="dashboard-error">{error}</p>
        ) : (
          <>
            {/* Stats Section */}
            <div className="dashboard-stats">
              <h2>Store Overview</h2>
              <ul>
                <li>Total Products: {stats.totalProducts}</li>
                <li>Total Orders: {stats.totalOrders}</li>
                <li>Pending Orders: {stats.pendingOrders}</li>
              </ul>
            </div>

            {/* Recent Activity (static for now) */}
            <div className="dashboard-activity">
              <h2>Recent Activity</h2>
              <ul>
                <li>New product added</li>
                <li>Order placed</li>
                <li>Order delivered</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
