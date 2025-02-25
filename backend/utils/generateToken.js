import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config() 

const generateToken = (userId) => {
    try {
        const payload = { userId }
        const options = { expiresIn: "1hr" }
    
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options)
        return token
    }
    catch(error) {
        throw new Error("Error generating JWT")
    }

} 
export default generateToken