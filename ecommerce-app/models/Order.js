import mongoose from "mongoose";
import { Product } from "./Product";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    // Address जहाँ product भेजा जाएगा

    shippingAddress: {
      street: String,
      city: String,
      district: String,
      state: String,
      country: String,
      postalCode: String,
    },

    // Address जहाँ product actually deliver हुआ

    deliveredAddress: {
      street: String,
      city: String,
      district: String,
      state: String,
      country: String,
      postalCode: String,
      deliveredAt: Date,
    },
  },

  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
