import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const myDB = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo connected ${myDB.connection.host}`);
  } catch (error) {
    console.log("something is wrong with DB ", error.message);
    process.exit(1);
  }
};
