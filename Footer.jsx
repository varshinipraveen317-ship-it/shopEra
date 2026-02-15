import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>

        {/* Brand */}
        <div className={styles.brand}>
          <h2 className={styles.logo}>ShopEra</h2>
          <p className={styles.tagline}>
            Making your home elegant & cozy.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className={styles.heading}>Quick Links</h3>
          <ul className={styles.list}>
            <li>Home</li>
            <li>Shop</li>
            <li>Categories</li>
            <li>Login</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className={styles.heading}>Contact</h3>
          <p className={styles.contact}>
            📧 support@ShopEra.com
          </p>
          <p className={styles.contact}>
            📞 +91 98765 43210
          </p>
        </div>

      </div>

      <div className={styles.bottomBar}>
        © {new Date().getFullYear()} ShopEra. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
