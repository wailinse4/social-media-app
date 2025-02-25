import dotenv from "dotenv"

dotenv.config()

const setCookie = (res, token) => {
    try {
        res.cookie("token", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV !== "development", 
            sameSite: "Strict", 
            maxAge: 3600000, 
        })
    }
    catch(error) {
        throw new Error("Error setting cookie")
    }
}
export default setCookie