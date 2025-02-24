import express from "express"

import { signup, login, logout, getUserProfile, verifyEmail } from "../controllers/authController.js"
import protectRoute from "../middleware/authMiddleware.js"

const router = express.Router() 

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.get("/protected-route", protectRoute, getUserProfile)
router.get("/verify-email", verifyEmail)

export default router