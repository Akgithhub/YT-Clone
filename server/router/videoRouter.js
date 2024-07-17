import express from "express";
import {
  addVideo,
  deleteVideo,
  getVideo,
  updateVideo,
} from "../controllers/videoController.js";
import MiddleWare from "../middleware/Middleware.js";

const videoRouter = express.Router();
// Create a video
videoRouter.post("/add", MiddleWare, addVideo);
// Delete a video
videoRouter.delete("/delete/:id", MiddleWare, deleteVideo);
// update a video
videoRouter.put("/update/:id", MiddleWare, updateVideo);
// get a video
videoRouter.get("/find/:id", MiddleWare, getVideo);
export default videoRouter;
