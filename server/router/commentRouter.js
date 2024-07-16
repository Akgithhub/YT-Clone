import express from "express";
import { test } from "../controllers/commentController.js";

const commentRouter = express.Router();
commentRouter.get("/test", test);

export default commentRouter;
