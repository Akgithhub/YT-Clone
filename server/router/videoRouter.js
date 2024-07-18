import express from "express";
import {
  addVideo,
  addView,
  deleteVideo,
  getBySearch,
  getByTags,
  getVideo,
  randomVideo,
  subVideo,
  trendVideo,
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
// view in video
videoRouter.put("/view/:id", addView);
// Trending video
videoRouter.get("/trend/", trendVideo);
// Random video
videoRouter.get("/random/", randomVideo);
// tags vdo
videoRouter.get("/tags/",getByTags );
// search vdo
videoRouter.get("/search/",getBySearch );
// Subscribed Video
videoRouter.get("/sub", MiddleWare, subVideo);
export default videoRouter;
