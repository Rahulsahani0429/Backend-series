import mongoose from "mongoose";

export const connectDB = async ( ) =>{
    try {
        const myDBConnection = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoConnected successfully: ${myDBConnection.connection.host}`);
    } catch (error) {
        console.log("somethings worng with mongoDB", error.message);
        process.exit(1)
    }
} 
