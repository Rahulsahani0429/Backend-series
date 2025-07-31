import mongoose from 'mongoose'

const connectDB = async (req,res) =>{
    try {
        const myDB = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected ${myDB.connection.host}`);
    } catch (error) {
        console.log(`mongoDB connection error `, error);
        process.exit(1);
        
    }
}

export default connectDB;