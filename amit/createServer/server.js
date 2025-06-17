import express from 'express';
import mongoose from 'mongoose';
import dotenv from  'dotenv';

// ✅ Load environment variables from .env
dotenv.config();

const app = express();

// ✅ Use environment variables


const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL;
// or or or
// const PORT = 5000;
// const MONGO_URL = 'mongodb://localhost:27017';


app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch((err) => console.error('❌ MongoDB connection error:', err.message));

// ✅ Route
app.get('/', (req, res) => {
    res.send("Welcome to Express JS with MongoDB");
    console.log("Welcome to my server");
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
