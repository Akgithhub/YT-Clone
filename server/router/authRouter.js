import express from "express";
import { SignIn, SignUp } from "../controllers/authController.js";
import MiddleWare from "../middleware/Middleware.js";

const authRouter = express.Router();

// Create a User
authRouter.post("/signup", SignUp);
// Sign In
authRouter.post("/signin", MiddleWare, SignIn);
// Google Sign In
authRouter.post("/google");

export default authRouter;
