import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required:[true,"name is required"]
    },
    
    
    email: {
      type: String,
      unique: true,
    },
    password: String,
    role: String,
    age: Number,
    joiningDate: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
