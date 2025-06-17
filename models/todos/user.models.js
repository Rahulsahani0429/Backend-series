import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
      lowercase: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      tyep: String,
      required: [true, "password must be atleast 8 character"],
      lowercase: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema)
// or 

// const User = mongoose.model("User", userSchema);
// // export default User;