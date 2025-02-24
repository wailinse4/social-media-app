import { signupService, loginService, logoutService, getUserProfileService, verifyEmailService } from "../services/authService.js"

export const signup = async (req, res) => {
    const { fullName, email, username, password } = req.body

    try {
        const newUser = await signupService({ fullName, email, username, password }, res)
        res.status(201).json({ message: "User Created", data: { ...newUser._doc, password: undefined }})
    }
    catch(error) {
        console.error(error)
        res.status(400).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        await loginService({ email, password }, res)
        res.status(200).json({ message: "Login Successful" })
    }
    catch(error) {
        console.error(error)
        res.status(400).json({ message: error.message})
    }
}

export const logout = (req, res) => {
    try {
        logoutService(res)
        res.status(200).json({ message: "Logout Successful" })
    }
    catch(error) {
        console.error(error)
        res.status(400).json({ message: error.message })
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const user = await getUserProfileService(req.userId)
        res.status(200).json({ message: "Protected Route", data: { fullName: user.fullName, email: user.email, username: user.username }})
    }   
    catch(error) {
        console.error(error)
        res.status(400).json({ message: error.message })
    }
} 

export const verifyEmail = async (req, res) => {
    const { verificationToken } = req.query 
    try {
        await verifyEmailService(verificationToken)
        res.status(200).json({ message: "Email Successfully Verified" })
    }
    catch(error) {
        console.error(error)
        res.status(400).json({ message: error.message })
    }
}