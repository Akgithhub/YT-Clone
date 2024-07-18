import commentModel from "../models/commentModel.js";
import videoModel from "../models/videoModel.js";
const addComment = async (req, res) => {
  try {
    const comment = await new commentModel({
      ...req.body,
      userId: req.user.id,
    });
    const addcomment = await comment.save();
    if (addcomment) {
      res.json({
        message: "Comment added successsfully",
        data: addcomment,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "error while adding comment",
      error: error.message,
    });
  }
};
const deleteComment = async (req, res) => {
  try {
    // Find the comment by ID
    const comment = await commentModel.findById(req.params.id);
    if (!comment) {
      return res.json({ message: "Comment not found" });
    }

    // Find the video by ID
    const video = await videoModel.findById(req.params.id);
    if (!video) {
      return res.json({ message: "Video not found" });
    }
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      const deletecomment = await commentModel.findByIdAndDelete(req.params.id);
      if (deletecomment) {
        res.json({
          message: "Comment deleted successsfully",
          data: deletecomment,
        });
      }
    } else {
      res.json({
        message: "You can delete only your comment",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "error while delete comment",
      error: error.message,
    });
  }
};
const vdoComments = async (req, res) => {
  const vdoid = req.params.id;
  try {
    const allcomment = await commentModel.find(vdoid);
    if (allcomment) {
      res.json({
        message: "All comment get successsfully",
        data: allcomment,
      });
    } else {
      res.json({
        message: "No comment found",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "error while adding comment on  vdo",
      error: error.message,
    });
  }
};
export { addComment, deleteComment, vdoComments };
