import { Coupon } from "../models/Coupon.js";

export const createCoupon = async (req, req) => {
  try {
    const { code, discount, expiresAt, isActive } = req.body;
    // check the required field
    if (!code || !discount || !expiresAt) {
      return res.status(400).json({ msg: "all field is required" });
    }
    const existing = await Coupon.findOne({ code });
    if (existing) {
      return res
        .status(400)
        .json({ msg: "coupan code already exists or used" });
    }
    const coupan = await Coupon.create({
      code,
      discount,
      expiresAt,
      isActive,
    });
    return res.status(200).json({ msg: "Coupon created successfully", coupan });
  } catch (error) {
    return res.status(500).json({ msg: "server error", Error: error.message });
  }
};

// Get all coupons

export const getAllCoupons = async (req, res) => {
  try {
    const coupans = await Coupon.find().sort({ createdAt: -1 });
    if (!coupans) {
      return res.status(404).json({ msg: "coupon not found" });
    }
    return res.status(200).json({ msg: "all coupons founds", coupans });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Failed to fetch coupons", Error: error.message });
  }
};

// get sinlge coupon by Id

export const getCouponById = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await Coupon.findById(id);
    if (!coupon) {
      return res.status(404).json({ msg: "coupon not found" });
    }
    return res.status(200).json({ msg: "coupon found", coupon });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error Getting coupoun", Error: error.message });
  }
};

//  Update a coupon
export const updateCoupon = async (req, res) => {
  try {
    const { code, discount, expiresAt, isActive } = req.body;

    const updated = await Coupon.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...(code && { code }),
          ...(discount && { discount }),
          ...(expiresAt && { expiresAt }),
          ...(typeof isActive !== "undefined" && { isActive }),
        },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.status(200).json({ message: "Coupon updated successfully", updated });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

//  Delete a coupon
export const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Coupon.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    res.status(200).json({ message: "Coupon deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Deletion failed", error: error.message });
  }
};
