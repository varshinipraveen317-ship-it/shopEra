const Product = require("../models/Product");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

/* =================  ADD PRODUCT ================= */
exports.addProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const {
      name,
      category,
      description,
      price,
      stock,
      rooms,
    } = req.body;

    if (
      !name ||
      !category ||
      !description ||
      !price ||
      !stock ||
      !rooms
    ) {
      return res
        .status(400)
        .json({ message: "All fields including rooms are required" });
    }

    let parsedRooms;
    try {
      parsedRooms = JSON.parse(rooms);
    } catch {
      return res
        .status(400)
        .json({ message: "Rooms must be a valid array" });
    }

    if (!Array.isArray(parsedRooms) || parsedRooms.length === 0) {
      return res
        .status(400)
        .json({ message: "Select at least one room" });
    }

    const imagePath = `uploads/${req.file.filename}`;

    const product = await Product.create({
      name,
      category: category.toLowerCase(),
      rooms: parsedRooms,
      description,
      price,
      stock,
      image: imagePath,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("ADD PRODUCT ERROR:", err);
    res.status(500).json({ message: "Failed to add product" });
  }
};

/* =================  GET ALL PRODUCTS ================= */
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

/* =================  GET SINGLE PRODUCT ================= */
exports.getProductById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

/* =================  UPDATE PRODUCT ================= */
exports.updateProduct = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (req.file && product.image) {
      const oldImagePath = path.join(__dirname, "..", product.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    let parsedRooms = product.rooms;
    if (req.body.rooms) {
      try {
        parsedRooms = JSON.parse(req.body.rooms);
      } catch {
        return res
          .status(400)
          .json({ message: "Rooms must be a valid array" });
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        category: req.body.category
          ? req.body.category.toLowerCase()
          : product.category,
        rooms: parsedRooms,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        image: req.file
          ? `uploads/${req.file.filename}`
          : product.image,
      },
      { new: true }
    );

    res.json(updatedProduct);
  } catch (err) {
    console.error("UPDATE PRODUCT ERROR:", err);
    res.status(500).json({ message: "Failed to update product" });
  }
};

/* =================  DELETE PRODUCT ================= */
exports.deleteProduct = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.image) {
      const imagePath = path.join(__dirname, "..", product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};
