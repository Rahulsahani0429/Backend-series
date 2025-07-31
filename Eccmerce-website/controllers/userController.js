import { User } from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error ", Error: error.message });
  }
};

// get user by id

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not find" });
    }
    return res.status(200).json({ success: "true", user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", Error: error.message });
  }
};

// Update user profile

export const updateUser = async (req, res) => {
  try {
    const { name, email, role, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, role, avatar },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Update fields conditionally
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    if (req.body.password) {
      user.password = req.body.user;
    }

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "User Updated successfully",
      data: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", Error: error.message });
  }
};

// Delete the User

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    // if we want to delete the matching element like roke, name, email etc then use the below line
    // const user = await User.findByIdAndDelete({role})
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "User deleted ", new: true });
  } catch (error) {
    return res
      .st(500)
      .json({ success: false, message: "Server Error", Error: error.message });
  }
};
