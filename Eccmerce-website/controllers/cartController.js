import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";

// ✅ Add item to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const itemTotal = product.price * quantity;

    // अगर पहले से कार्ट है
    if (cart) {
      const existingItemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (existingItemIndex !== -1) {
        // Product पहले से है तो quantity बढ़ा दो
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // नहीं है तो नया product जोड़ो
        cart.items.push({ product: productId, quantity });
      }

      // कुल कीमत अपडेट करो
      cart.totalAmount += itemTotal;
      await cart.save();
      res.status(200).json({ message: "Cart updated", cart });
    } else {
      // नया cart बनाओ
      const newCart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }],
        totalAmount: itemTotal,
      });

      await newCart.save();
      res.status(201).json({ message: "Cart created", cart: newCart });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get user cart
export const getUserCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1)
      return res.status(404).json({ message: "Product not in cart" });

    const product = await Product.findById(productId);
    const item = cart.items[itemIndex];
    cart.totalAmount -= product.price * item.quantity;

    cart.items.splice(itemIndex, 1);
    await cart.save();

    res.status(200).json({ message: "Item removed", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Update quantity
export const updateQuantity = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    if (quantity < 1)
      return res.status(400).json({ message: "Quantity must be at least 1" });

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1)
      return res.status(404).json({ message: "Product not in cart" });

    const product = await Product.findById(productId);
    const currentItem = cart.items[itemIndex];

    // पहले वाली total amount घटा दो
    cart.totalAmount -= product.price * currentItem.quantity;

    // quantity update करो और फिर totalAmount दोबारा जोड़ो
    cart.items[itemIndex].quantity = quantity;
    cart.totalAmount += product.price * quantity;

    await cart.save();
    res.status(200).json({ message: "Quantity updated", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Clear Cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    cart.totalAmount = 0;

    await cart.save();
    res.status(200).json({ message: "Cart cleared", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
