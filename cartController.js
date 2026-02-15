const User = require("../models/User");

/* ================= ADD TO CART ================= */
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ FIX

    const { productId, quantity } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const itemIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      user.cart[itemIndex].quantity += quantity || 1;
    } else {
      user.cart.push({
        product: productId,
        quantity: quantity || 1,
      });
    }

    await user.save();

    // RE-FETCH WITH POPULATE
    const updatedUser = await User.findById(userId)
      .populate("cart.product");

    // CLEAN INVALID PRODUCTS
    updatedUser.cart = updatedUser.cart.filter(
      (item) => item.product !== null
    );

    await updatedUser.save();

    res.status(200).json(updatedUser.cart);
  } catch (error) {
    console.error("ADD TO CART ERROR:", error);
    res.status(500).json({ message: "Failed to add to cart" });
  }
};

/* ================= GET CART ================= */
exports.getCart = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ FIX

    const user = await User.findById(userId)
      .populate("cart.product");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //  REMOVE INVALID / DELETED PRODUCTS
    const cleanedCart = user.cart.filter(
      (item) => item.product !== null
    );

    if (cleanedCart.length !== user.cart.length) {
      user.cart = cleanedCart;
      await user.save();
    }

    res.status(200).json(user.cart);
  } catch (error) {
    console.error("GET CART ERROR:", error);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

/* ================= REMOVE FROM CART ================= */
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ FIX
    const { productId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );

    await user.save();

    // RE-FETCH WITH POPULATE
    const updatedUser = await User.findById(userId)
      .populate("cart.product");

    // CLEAN INVALID PRODUCTS
    updatedUser.cart = updatedUser.cart.filter(
      (item) => item.product !== null
    );

    await updatedUser.save();

    res.status(200).json(updatedUser.cart);
  } catch (error) {
    console.error("REMOVE CART ERROR:", error);
    res.status(500).json({ message: "Failed to remove item" });
  }
};
