import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config() 

const generateToken = (userId) => {
    const payload = { userId }
    const options = { expiresIn: "1hr" }

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options)
    return token
} 
export default generateToken