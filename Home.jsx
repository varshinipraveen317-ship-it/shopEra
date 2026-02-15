import React from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

import heroImage from "../assets/hero.jpg";

import furnitureImg from "../assets/furniture.jpg";
import lightingImg from "../assets/lighting.jpg";
import wallImg from "../assets/wall.jpg";
import mirrorImg from "../assets/mirror.jpg";
import rugImg from "../assets/rug.jpg";
import decorImg from "../assets/decor.jpg";

import bedroomImg from "../assets/bedroom.jpg";
import livingImg from "../assets/living.jpg";
import kitchenImg from "../assets/kitchen.jpg";
import diningImg from "../assets/dining.jpg";

import products from "../data/ProductsData";

import Products from "../component/Products";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.home}>
      {/* ===== HERO SECTION ===== */}
      <section className={styles.hero}>
        <div className={styles.contentStack}>
          <div className={styles.heroText}>
            <span className={styles.introTag}>Make your home</span>
            <br />
            <span className={styles.highlight}>Elegant & Cozy</span>
            <br />
            With Us
          </div>

          <button
            className={styles.shopBtn}
            onClick={() => navigate("/shop")}
          >
            Shop Now →
          </button>
        </div>

        <img src={heroImage} alt="Home decor" className={styles.heroImage} />
      </section>

      {/* ===== SHOP BY CATEGORY ===== */}
      <section className={styles.categorySection}>
        <h2 className={styles.sectionTitle}>Shop by Category</h2>

        <div className={styles.categoryGrid}>
          <div
            className={styles.categoryCard}
            onClick={() => navigate("/shop?view=category&cat=furniture")}
          >
            <img src={furnitureImg} alt="Furniture" />
            <h3>Furniture</h3>
          </div>

          <div
            className={styles.categoryCard}
            onClick={() => navigate("/shop?view=category&cat=lighting")}
          >
            <img src={lightingImg} alt="Lighting" />
            <h3>Lighting</h3>
          </div>

          <div
            className={styles.categoryCard}
            onClick={() => navigate("/shop?view=category&cat=walldeco")}
          >
            <img src={wallImg} alt="Wall Decor" />
            <h3>Wall Décor</h3>
          </div>

          <div
            className={styles.categoryCard}
            onClick={() => navigate("/shop?view=category&cat=mirrors")}
          >
            <img src={mirrorImg} alt="Mirrors" />
            <h3>Mirrors</h3>
          </div>

          <div
            className={styles.categoryCard}
            onClick={() => navigate("/shop?view=category&cat=rugs")}
          >
            <img src={rugImg} alt="Rugs" />
            <h3>Rugs</h3>
          </div>

          <div
            className={styles.categoryCard}
            onClick={() => navigate("/shop?view=category&cat=accessories")}
          >
            <img src={decorImg} alt="Accessories" />
            <h3>Accessories</h3>
          </div>
        </div>

        {/*  VIEW ALL CATEGORIES */}
        <div className={styles.viewAllWrapper}>
          <button
            className={styles.viewAllBtn}
            onClick={() => navigate("/shop?view=category")}
          >
            View All →
          </button>
        </div>
      </section>

      {/* ===== SHOP BY ROOM ===== */}
      <section className={styles.roomSection}>
        <h2 className={styles.sectionTitle}>Shop by Room</h2>

        <div className={styles.roomGrid}>
          <div
            className={styles.roomCard}
            onClick={() => navigate("/shop?view=room&room=bedroom")}
          >
            <img src={bedroomImg} alt="Bedroom" />
            <h3>Bedroom</h3>
          </div>

          <div
            className={styles.roomCard}
            onClick={() => navigate("/shop?view=room&room=living")}
          >
            <img src={livingImg} alt="Living Room" />
            <h3>Living Room</h3>
          </div>

          <div
            className={styles.roomCard}
            onClick={() => navigate("/shop?view=room&room=kitchen")}
          >
            <img src={kitchenImg} alt="Kitchen" />
            <h3>Kitchen</h3>
          </div>

          <div
            className={styles.roomCard}
            onClick={() => navigate("/shop?view=room&room=dining")}
          >
            <img src={diningImg} alt="Dining" />
            <h3>Dining</h3>
          </div>
        </div>

        {/*  VIEW ALL ROOMS */}
        <div className={styles.viewAllWrapper}>
          <button
            className={styles.viewAllBtn}
            onClick={() => navigate("/shop?view=room")}
          >
            View All →
          </button>
        </div>
      </section>

    </div>
  );
};

export default Home;
