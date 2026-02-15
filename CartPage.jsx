import React from "react";
import styles from "./CartPage.module.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../component/CartContext";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalPrice,
  } = useCart();

  const navigate = useNavigate();
  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>Your cart is empty 🛒</h2>
        <button onClick={() => navigate("/shop")}>
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <h1>Your Cart</h1>

      {cartItems.map((item) => {
        if (!item.product) return null;

        return (
          <div
            key={item.product._id}
            className={styles.cartItem}
          >
            <img
              src={`http://localhost:5000/${item.product.image}`}
              alt={item.product.name}
            />

            <div className={styles.info}>
              <h3>{item.product.name}</h3>
              <p>₹{item.product.price}</p>

              <div className={styles.quantity}>
                <button
                  onClick={() =>
                    updateQuantity(item.product._id, -1)
                  }
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.product._id, 1)
                  }
                >
                  +
                </button>
              </div>

              <button
                className={styles.removeBtn}
                onClick={() =>
                  removeFromCart(item.product._id)
                }
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}

      <div className={styles.summary}>
        <h2>Total: ₹{totalPrice}</h2>
        <button
          className={styles.checkoutBtn}
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
