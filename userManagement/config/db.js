
import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        const myDB = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB connected : ${myDB.connection.host} `)
    } catch (error) { 
        console.log("Something is wrong with DB")
    }
}

export default connectDB;