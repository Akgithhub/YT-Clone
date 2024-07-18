import express from "express";
import {
  addComment,
  deleteComment,
  vdoComments,
} from "../controllers/commentController.js";
import MiddleWare from "../middleware/Middleware.js";

const commentRouter = express.Router();
commentRouter.post("/add", MiddleWare, addComment);
commentRouter.delete("/delete/:id", MiddleWare, deleteComment);
commentRouter.get("/ofvdo/:videoId", MiddleWare, vdoComments);

export default commentRouter;
