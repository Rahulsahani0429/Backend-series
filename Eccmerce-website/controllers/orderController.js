import { Order } from "../models/Order.js";

import { Product } from "../models/Product.js";

export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalAmount } = req.body;
    if (!items || items.length === 0) {
      return res
        .status(400)
        .json({ msg: "No itmes in order , itme is requrired" });
    }
    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
      paymentStatus: paymentMethod === "COD" ? "pending" : "paid",
      paidAt: paymentMethod !== "COD" ? new Date() : null,
    });

    return res.status(200).json({ msg: "Order created successfully", order });
  } catch (error) {
    return res.status(500).json({ msg: "server Error", Error: error.message });
  }
};
