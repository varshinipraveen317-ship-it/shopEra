import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MyOrders.module.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/orders/my",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setOrders(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className={styles.loading}>Loading orders...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (orders.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>No orders yet 📦</h2>
      </div>
    );
  }

  return (
    <div className={styles.ordersPage}>
      <h1>My Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className={styles.orderCard}>
          <div className={styles.header}>
            <h3>Order #{order._id.slice(-6)}</h3>
            <span>
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </div>

          {order.items.map((item) => (
            <div
              key={item.product._id}
              className={styles.orderItem}
            >
              <img
                src={`http://localhost:5000/${item.product.image}`}
                alt={item.product.name}
              />
              <div>
                <p>{item.product.name}</p>
                <p>
                  ₹{item.price} × {item.quantity}
                </p>
              </div>
            </div>
          ))}

          <div className={styles.footer}>
            <strong>Total: ₹{order.totalAmount}</strong>
            <span>Status: {order.orderStatus}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
