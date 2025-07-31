import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const myDB = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected ${myDB.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
