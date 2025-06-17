const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

// ✅ सही MongoDB URL (Port usually 27017 होता है, 12017 गलत हो सकता है)
const MONGO_URL = 'mongodb://localhost:27017'; // यहाँ `mydatabase` MongoDB में DB का नाम है

// ✅ Middleware
app.use(express.json());

// ✅ MongoDB से कनेक्शन (Corrected Code)
mongoose.connect(MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})
.then(() => { console.log("✅ MongoDB connected successfully")})
.catch((err) =>{ console.log("❌ MongoDB connection error:", err)});

// ✅ Route
app.get('/', (req, res) => {
    console.log("req received");
    res.send("Welcome to Express JS with MongoDB");
});

// ✅ Server Start
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
