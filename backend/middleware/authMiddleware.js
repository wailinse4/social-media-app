import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const protectRoute = (req, res, next) => {
    try {
        const token = req.cookies.token 
        if(!token) {
            return res.status(401).json({ message: "Unauthorized -- no token provided" })
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.userId = decoded.userId
        next() 
    }
    catch(error) {
        console.error(error)
        res.status(401).json({ message: "Unauthorized -- invalid token" })
    }
   
}  
export default protectRoute