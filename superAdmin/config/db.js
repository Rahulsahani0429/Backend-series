import mongoose from "mongoose";

export const connectDB = async (req, res) => {
  try {
    const myConnection = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected ${myConnection.connection.host}`);
  } catch (error) {
    console.log("something wrong with DB");
  }
};
export default connectDB;