import express from "express";
import { SignUp } from "../controllers/authController.js";

const authRouter = express.Router();

// Create a User
authRouter.post('/signup',SignUp)
// Sign In
authRouter.post('/signin')
// Google Sign In
authRouter.post('/google')

export default authRouter;
