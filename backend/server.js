import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"

import connectDB from "./config/db.js"

import authRoutes from "./routes/authRoutes.js"

dotenv.config()

const app = express() 

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

app.use("/api/auth", authRoutes)

connectDB()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`The server is listening on port ${PORT}`))