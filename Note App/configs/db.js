import mongoose from "mongoose";

export const dbConnect = async (req,res) =>{
    try {
        const myDB = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB connected Successfully : ${myDB.connection.host}`);
    } catch (error) {
        console.log("something wrong wiht DB", error.message)
    }
}

