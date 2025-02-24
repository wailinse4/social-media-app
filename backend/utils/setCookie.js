import dotenv from "dotenv"

dotenv.config()

const setCookie = (res, token) => {
    res.cookie("token", token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV !== "development", 
        sameSite: "Strict", 
        maxAge: 3600000, 
    })
}
export default setCookie