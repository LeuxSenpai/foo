import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    position: {
        type: String,               // ⚽ store position as text (e.g., "GK", "CM", etc.)
        required: true,             // ✅ make it mandatory
    },
    nationality: {                  // 🆕 Updated nationality as an object
        type: Object,
        required: true,              // Optional field, can be null if not provided
        code: String,               // Country code (e.g., "JP", "US")
        name: String,               // Full country name (e.g., "Japan", "United States")
        image: String,              // URL to the flag image (e.g., "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JP.svg")
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    profilePic: { 
        type: String,   // stores the Cloudinary public_id
        default: null,  // optional, null if user hasn't uploaded yet
    }

});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;