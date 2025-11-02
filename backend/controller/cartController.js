import User from "../model/userModel.js";

// ✅ Add to Cart
export const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userData = await User.findById(req.userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Initialize cartData if missing
    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    // Increment or initialize size count
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    await User.findByIdAndUpdate(req.userId, { cartData });
    return res.status(201).json({ message: "Added to cart successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to add to cart" });
  }
};

// ✅ Update Cart (quantity)
export const updateToCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const userData = await User.findById(req.userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][size] = quantity;

    await User.findByIdAndUpdate(req.userId, { cartData });
    return res.status(201).json({ message: "Cart updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update cart" });
  }
};

// ✅ Get User Cart
export const getUserToCart = async (req, res) => {
  try {
    const userData = await User.findById(req.userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartData = userData.cartData || {};
    return res.status(200).json(cartData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to get user cart" });
  }
};
