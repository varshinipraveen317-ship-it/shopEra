const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= ROUTE IMPORTS ================= */
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const adminProductRoutes = require("./routes/adminProductRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

/* ================= ROUTES ================= */

// Auth (login, signup)
app.use("/api/auth", authRoutes);

// Public products
app.use("/api/products", productRoutes);

// 🛠 Admin (products + dashboard)
app.use("/api/admin", adminProductRoutes);

// 📦 Admin orders
app.use("/api/admin/orders", adminOrderRoutes);

// 🛒 User cart
app.use("/api/cart", cartRoutes);

// 🧾 User orders (checkout)
app.use("/api/orders", orderRoutes);

/* ================= DATABASE ================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

/* ================= ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(err.status || 500).json({
    message: err.message || "Server error",
  });
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
