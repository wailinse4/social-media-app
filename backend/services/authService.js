import User from "../models/User.js"

import hashPassword from "../utils/hashPassword.js"

export const signupService = async (userData) => {
    const { fullName, email, username, password } = userData

    if(!fullName || !email || !username || !password) {
        throw new Error("All fields are required")
    }

    const existingUser = await User.findOne({ email })
    if(existingUser) {
        throw new Error("User already exists")
    }

    const hashedPassword = await hashPassword(password)
    await User.create({ fullName, email, username, password: hashedPassword })
}