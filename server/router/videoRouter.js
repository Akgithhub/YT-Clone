import express from "express";
import { test } from "../controllers/videoController.js";

const videoRouter = express.Router();
videoRouter.get("/test", test);

export default videoRouter;
