import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: "String",
      require: [true, "name is required"],
      trim: true,
      minlenght: [3, "Name must be atleat 3 characters"],
      
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Email format is invalid"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      minlength: [10, "Phone must be at least 10 digits"],
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", contactSchema);
