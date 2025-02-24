import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true }, 
    username: { type: String, required: true , unique: true, trim: true }, 
    password: { type: String, required: true, minLength: 6 }, 

    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String }, 
    verificationTokenExpiresAt: { type: Date }

}, { timestamps: true })

const User = new mongoose.model("User", userSchema)
export default User