const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

/* ================= GET ALL PRODUCTS (WITH FILTERS) ================= */
router.get("/", async (req, res) => {
  try {
    const { category, room, search } = req.query;

    let filter = {};

    // filter by category
    if (category) {
      filter.category = category;
    }

    //  filter by rooms array
    if (room) {
      filter.rooms = room;
    }

    // search by name
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

/* ================= GET SINGLE PRODUCT BY ID ================= */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
