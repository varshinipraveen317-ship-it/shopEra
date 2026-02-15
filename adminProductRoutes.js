const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const {
  getDashboardStats,
} = require("../controllers/adminDashboardController");

const verifyToken = require("../middleware/verifyToken");
const adminAuth = require("../middleware/adminAuth");
const upload = require("../middleware/upload");

/* ================= ADMIN DASHBOARD ================= */

//  Dashboard stats
router.get(
  "/dashboard",
  verifyToken,
  adminAuth,
  getDashboardStats
);

/* ================= ADMIN PRODUCT ROUTES ================= */

//  Add product
router.post(
  "/products",
  verifyToken,
  adminAuth,
  upload.single("image"),
  addProduct
);

//  Get all products
router.get(
  "/products",
  verifyToken,
  adminAuth,
  getProducts
);

//  Get single product (for edit)
router.get(
  "/products/:id",
  verifyToken,
  adminAuth,
  getProductById
);

//  Update product
router.put(
  "/products/:id",
  verifyToken,
  adminAuth,
  upload.single("image"),
  updateProduct
);

//  Delete product
router.delete(
  "/products/:id",
  verifyToken,
  adminAuth,
  deleteProduct
);

module.exports = router;
