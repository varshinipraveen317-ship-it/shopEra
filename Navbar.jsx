import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // LOGIN STATUS CHECK
  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  // LOGOUT HANDLER (GOES TO HOME)
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");

    // redirect to home like a normal visitor
    navigate("/", { replace: true });
  };

  //  SEARCH HANDLER
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      navigate(`/shop?search=${searchTerm}`);
      setSearchTerm("");
    }
  };

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div
        className={styles.logo}
        onClick={() => navigate("/")}
      >
        ShopEra
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch}
      />

      {/* Navigation Links */}
      <ul className={styles.navLinks}>
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/shop")}>Shop</li>
        <li onClick={() => navigate("/shop?view=category")}>
          Category
        </li>

        {isLoggedIn && (
          <li onClick={() => navigate("/orders")}>
            My Orders
          </li>
        )}
      </ul>

      {/* Actions */}
      <div className={styles.navActions}>
        {/* Cart */}
        <span
          className={styles.cart}
          onClick={() => navigate("/cart")}
        >
          🛒
        </span>

        {/* Profile */}
        {isLoggedIn && (
          <span
            className={styles.profileBtn}
            onClick={() => navigate("/profile")}
          >
            👤
          </span>
        )}

        {/* Auth Button */}
        {isLoggedIn ? (
          <button
            className={styles.logoutBtn}
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button
            className={styles.logoutBtn}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
