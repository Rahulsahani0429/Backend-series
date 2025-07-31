import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      // minlength:[8,"password must be at least 8 character long"],
      // maxlength:[16,"password must be at monst 16 character long"]
    },
    role: {
      type: String,
      required: [true, "Role is requrired"],
      enum: ["admin", "manager", "worker"],
      default: "worker",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
