import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Products.module.css";
import ProductCard from "./ProductCard";

const Products = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setItems(res.data);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className={styles.empty}>Loading products...</p>;
  }

  return (
    <div className={styles.grid}>
      {items.length > 0 ? (
        items.map((product) => (
          <ProductCard
            key={product._id}                
            id={product._id}
            image={`http://localhost:5000/${product.image}`} 
            name={product.name}
            price={product.price}
          />
        ))
      ) : (
        <p className={styles.empty}>No products found</p>
      )}
    </div>
  );
};

export default Products;
