import express from "express";
import MiddleWare from "../middleware/Middleware.js";
import {
  deleteUser,
  getalluser,
  getUser,
  likeUservideo,
  SubscribeUser,
  unlikeUservideo,
  unsubscribeUser,
  updateUser,
} from "../controllers/userController.js";

const userRouter = express.Router();
userRouter.get("/get", getalluser);
// Update User
userRouter.put("/update/:id", MiddleWare, updateUser);
// Delete User
userRouter.delete("/delete/:id", MiddleWare, deleteUser);
// Get a User
userRouter.get("/finduser/:id", MiddleWare, getUser);
// Subcribe user
userRouter.put("/sub/:id", MiddleWare, SubscribeUser);
// unscribe user
userRouter.put("/unsub/:id", MiddleWare, unsubscribeUser);
// like a video
userRouter.put("/like/:videoId", MiddleWare, likeUservideo);
// dislike a video
userRouter.put("/unlike/:videoId", MiddleWare, unlikeUservideo);

export default userRouter;
