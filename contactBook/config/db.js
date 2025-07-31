import mongoose from "mongoose";


export const connectDB = async (req, res) => {
  try {
    const myConnect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected ${myConnect.connection.host}`);
  } catch (error) {
    console.log("Server error with mongoDB",  error.message);
   
  }
};
