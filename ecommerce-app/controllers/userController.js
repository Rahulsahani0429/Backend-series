import { User } from "../models/User.js";

import bcrypt from "bcryptjs";

// Get all users (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json({
      success: true,
      message: "all users finds ",
      count: users.length,
      users,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", Error: error.message });
  }
};

// Get single user by ID

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById({ id }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", Error: error.message });
  }
};

// Update user role (Admin only)

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const { id } = req.params;

    // const user = await User.findByIdAndUpdate(
    // // if we want to write in in object in write like that
    //  {_id:id}
    //   { role },
    //   { new: true, runValidators: true }
    // );
    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "updated successfully", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", Error: error.message });
  }
};

// Update user to own profile

export const updateProfile = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;
    const { id } = req.params;
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email.toLowerCase();
    if (avatar) updateData.avatar = avatar;
    if (email) {
      const existingUser = await User.findOne({
        email: email.toLowerCase(),
        _id: { $ne: id },
      });
    }
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already in used" });
    }
    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res
      .status(200)
      .json({ message: "Profile updateed successfully", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error ", Error: error.message });
  }
};

// Change password

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.user;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, msg: "old password invalid" });
    }

    user.password = await bcrypt.hash(newPassword, 12);

    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "password changed successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error", Error: error.message });
  }
};

// delete user (olny Admin)

// 1️⃣ Admin → किसी भी user को delete कर सके + उसके सारे projects भी delete हों

// import { User } from "../models/User.js";
// import { Product } from "../models/Product.js";
// import { Order } from "../models/Order.js"; // अगर orders भी delete करने हैं

// 📌 Delete user (Admin only)
// export const deleteUser = async (req, res) => {
//   try {
//     const userId = req.params.id;

//     // 1. Check user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     // 2. Delete all products created by this user
//     await Product.deleteMany({ createdBy: userId });

//     // 3. Delete all orders placed by this user (optional)
//     await Order.deleteMany({ user: userId });

//     // 4. Delete the user
//     await User.findByIdAndDelete(userId);

//     res.status(200).json({
//       success: true,
//       message: "User and all related data deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };


// 2️⃣ User → खुद को delete कर सके + उसके सारे projects भी delete हों

// export const deleteOwnAccount = async (req, res) => {
//   try {
//     const userId = req.user.id; // from auth middleware

//     // 1. Delete all products created by this user
//     await Product.deleteMany({ createdBy: userId });

//     // 2. Delete all orders placed by this user
//     await Order.deleteMany({ user: userId });

//     // 3. Delete the user
//     await User.findByIdAndDelete(userId);

//     res.status(200).json({
//       success: true,
//       message: "Your account and all related data have been deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };






export const deleteUser = async (req, res) => {
  try {

    // req.user.id comes from auth middleware (after JWT verify)
    // if we want to delete by user then we use it
    // const user = await User.findByIdAndDelete(req.user.id);

    const id = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error", Eroor: error.message });
  }
};
