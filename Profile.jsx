import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  const [orders] = useState(
    JSON.parse(localStorage.getItem("orders")) || []
  );

  const [isEditing, setIsEditing] = useState(false);

  //  Protect page
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  //  Logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // 💾 Save profile changes
  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setIsEditing(false);
  };

  if (!isLoggedIn) return null;

  return (
    <div className={styles.profilePage}>
      <h1>My Profile</h1>

      {/* PROFILE CARD */}
      <div className={styles.card}>
        <h2>Profile Details</h2>

        {isEditing ? (
          <>
            <input
              type="text"
              placeholder="Name"
              value={user.name || ""}
              onChange={(e) =>
                setUser({ ...user, name: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email"
              value={user.email || ""}
              disabled
            />

            <textarea
              placeholder="Address"
              value={user.address || ""}
              onChange={(e) =>
                setUser({ ...user, address: e.target.value })
              }
            />

            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong> {user.address || "Not added"}</p>

            <button onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </>
        )}
      </div>

      {/* ORDERS */}
      <div className={styles.card}>
        <h2>My Orders</h2>

        {orders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className={styles.orderItem}>
              <p>Order #{index + 1}</p>
              <p>Total: ₹{order.total}</p>
            </div>
          ))
        )}

        <button onClick={() => navigate("/orders")}>
          View All Orders
        </button>
      </div>

      {/* LOGOUT */}
      <button className={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
