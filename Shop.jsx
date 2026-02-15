import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Shop.module.css";
import ProductCard from "../component/ProductCard";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const category = searchParams.get("cat");
  const room = searchParams.get("room");
  const view = searchParams.get("view");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/products"
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* ================= FILTER PRODUCTS ================= */
  const filteredProducts = products.filter((product) => {
    // category filter
    if (
      category &&
      product.category?.toLowerCase() !== category.toLowerCase()
    ) {
      return false;
    }

    //  ROOM FILTER (ARRAY SAFE)
    if (
      room &&
      !product.rooms?.some(
        (r) => r.toLowerCase() === room.toLowerCase()
      )
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className={styles.shop}>
      {/* 🔙 BACK TO HOME */}
      <button className={styles.backBtn} onClick={() => navigate("/")}>
        ← Back to Home
      </button>

      {/* ===== TITLE ===== */}
      <h1 className={styles.title}>
        Shop
        {(category || room) && (
          <span className={styles.subTitle}>
            {category && ` • ${category}`}
            {room && ` • ${room}`}
          </span>
        )}
      </h1>

      {/* ===== FILTERS ===== */}
      <div className={styles.filtersWrapper}>
        {/* CATEGORY FILTERS */}
        {view === "category" && (
          <div className={styles.categoryFilters}>
            <button
              className={!category ? styles.active : ""}
              onClick={() => navigate("/shop?view=category")}
            >
              All
            </button>

            <button
              className={category === "furniture" ? styles.active : ""}
              onClick={() =>
                navigate("/shop?view=category&cat=furniture")
              }
            >
              Furniture
            </button>

            <button
              className={category === "lighting" ? styles.active : ""}
              onClick={() =>
                navigate("/shop?view=category&cat=lighting")
              }
            >
              Lighting
            </button>

            <button
              className={category === "mirrors" ? styles.active : ""}
              onClick={() =>
                navigate("/shop?view=category&cat=mirrors")
              }
            >
              Mirrors
            </button>

            <button
              className={category === "rugs" ? styles.active : ""}
              onClick={() =>
                navigate("/shop?view=category&cat=rugs")
              }
            >
              Rugs
            </button>

            <button
              className={
                category === "accessories" ? styles.active : ""
              }
              onClick={() =>
                navigate("/shop?view=category&cat=accessories")
              }
            >
              Accessories
            </button>

            <button
              className={category === "walldeco" ? styles.active : ""}
              onClick={() =>
                navigate("/shop?view=category&cat=walldeco")
              }
            >
              Wall Décor
            </button>
          </div>
        )}

        {/* ROOM FILTERS */}
        {view === "room" && (
          <div className={styles.roomFilters}>
            <button
              className={!room ? styles.active : ""}
              onClick={() => navigate("/shop?view=room")}
            >
              All
            </button>

            <button
              className={room === "living" ? styles.active : ""}
              onClick={() =>
                navigate("/shop?view=room&room=living")
              }
            >
              Living Room
            </button>

            <button
              className={room === "bedroom" ? styles.active : ""}
              onClick={() =>
                navigate("/shop?view=room&room=bedroom")
              }
            >
              Bedroom
            </button>

            <button
              className={room === "dining" ? styles.active : ""}
              onClick={() =>
                navigate("/shop?view=room&room=dining")
              }
            >
              Dining
            </button>

            <button
              className={room === "kitchen" ? styles.active : ""}
              onClick={() =>
                navigate("/shop?view=room&room=kitchen")
              }
            >
              Kitchen
            </button>
          </div>
        )}
      </div>

      {/* ===== PRODUCT GRID ===== */}
      {loading ? (
        <p className={styles.loading}>Loading products...</p>
      ) : (
        <div className={styles.productGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <ProductCard
                key={item._id}
                id={item._id}
                image={`http://localhost:5000/${item.image}`}
                name={item.name}
                price={item.price}
              />
            ))
          ) : (
            <p className={styles.emptyText}>No products found 😕</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Shop;
