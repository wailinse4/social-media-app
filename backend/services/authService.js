import User from "../models/User.js"

import hashPassword from "../utils/hashPassword.js"
import comparePasswords from "../utils/comparePasswords.js"

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
    const newUser = await User.create({ fullName, email, username, password: hashedPassword })
}

export const loginService = async (userData) => {
    const { email, password } = userData

    const existingUser = await User.findOne({ email })
    if(!existingUser) {
        throw new Error("Invalid credentials")
    }

    const isValid = await comparePasswords(password, existingUser.password)
    if(!isValid) {
        throw new Error("Invalid credentials")
    }
}