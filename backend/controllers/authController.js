import { signupService, loginService } from "../services/authService.js"

export const signup = async (req, res) => {
    const { fullName, email, username, password } = req.body

    try {
        const newUser = await signupService({ fullName, email, username, password })
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
        await loginService({ email, password })
        res.status(200).json({ message: "Login Successful" })
    }
    catch(error) {
        console.error(error)
        res.status(400).json({ message: error.message})
    }
}