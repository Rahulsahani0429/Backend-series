import mongoose from 'mongoose';

// User के लिए schema बनाया
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // ये field जरूरी है
    },
    email: {
        type: String,
        required: true,
        unique: true // email unique होना चाहिए
    },
    password: {
        type: String,
        required: true
    }
});

export default mongoose.model('User', userSchema); // Model को export किया
