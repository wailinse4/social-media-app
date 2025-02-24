import User from "../models/User.js"

import hashPassword from "../utils/hashPassword.js"
import comparePasswords from "../utils/comparePasswords.js"
import generateToken from "../utils/generateToken.js"
import setCookie from "../utils/setCookie.js"
import generateVerificationToken from "../utils/generateVerificationToken.js"
import sendVerificationEmail from "../utils/sendVerificationEmail.js"

import dotenv from "dotenv"

dotenv.config()

export const signupService = async (userData, res) => {
    const { fullName, email, username, password } = userData

    if(!fullName || !email || !username || !password) {
        throw new Error("All fields are required")
    }

    const existingUser = await User.findOne({ email })
    if(existingUser) {
        throw new Error("User already exists")
    }

    const hashedPassword = await hashPassword(password)

    const { verificationToken, verificationTokenExpiresAt } = generateVerificationToken()
    const newUser = await User.create({ fullName, email, username, password: hashedPassword, verificationToken, verificationTokenExpiresAt })

    await sendVerificationEmail(email, verificationToken)

    const token = generateToken(newUser._id)
    setCookie(res, token)

    return newUser
}

export const loginService = async (userData, res) => {
    const { email, password } = userData

    const existingUser = await User.findOne({ email })
    if(!existingUser) {
        throw new Error("Invalid credentials")
    }

    const isValid = await comparePasswords(password, existingUser.password)
    if(!isValid) {
        throw new Error("Invalid credentials")
    }

    const token = generateToken(existingUser._id)
    setCookie(res, token)
}

export const logoutService = (res) => {
    res.clearCookie("token", {
        httpOnly: true, 
        secure: process.env.NODE_ENV !== "production", 
        sameSite: "Strict", 
        maxAge: 0, 
    })
}

export const getUserProfileService = async (userId) => {
    try {
        const user = await User.findById(userId)
        if(!user) {
            throw new Error("User not found")    
        }
        return user 
    }
    catch(error) {
        throw new Error("Error fetching user data")
    }    
}

export const verifyEmailService = async (verificationToken) => {
    if(!verificationToken) {
        throw new Error("Verification token is missing")
    }

    const user = await User.findOne({ verificationToken })
    if(!user) {
        throw new Error("Verificaiton token not found")
    }

    if(Date.now() > user.verificationTokenExpiresAt) {
        throw new Error("Verificaiton token is expired")
    }

    user.isVerified = true 
    user.verificationToken = undefined 
    user.verificationTokenExpiresAt = undefined
    await user.save()
}
