import userModel from "../models/userModel.js";
import videoModel from "../models/videoModel.js";
// Update User
const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const userid = req.user.id;
  if (id === userid) {
    try {
      const updatedUser = await userModel.findByIdAndUpdate(id, {
        $set: req.body,
      });
      res.json({
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.json({
        message: "error while updating user",
        error: error.message,
      });
    }
  } else {
    res.status(403).json("You can update only your account!");
  }
};
// Delete User
const deleteUser = async (req, res) => {
  const id = req.params.id;
  const userid = req.user.id;
  if (id === userid) {
    try {
      const deleteUser = await userModel.findByIdAndDelete(id);
      if (deleteUser) {
        res.json({
          message: "User deleted successfully",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        message: "error while deleting user",
        error: error.message,
      });
    }
  } else {
    res.json({
      message: "You can delete only your account",
    });
  }
};
// Get a User
const getUser = async (req, res) => {
  const id = req.params.id;
  const userid = req.user.id;
  if (id === userid) {
    try {
      const getUser = await userModel.findById(id);
      if (getUser) {
        res.json({
          message: "User get successfully",
          data: getUser,
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        message: "error while getting user",
        error: error.message,
      });
    }
  } else {
    res.json({
      message: "You can getonly your account",
    });
  }
};
// Subcribe user
const SubscribeUser = async (req, res) => {
  const uderid = req.user.id;
  const subChannelid = req.params.id;
  try {
    await userModel.findByIdAndUpdate(uderid, {
      $push: { subscribedUsers: subChannelid },
    });

    const subdata = await userModel.findByIdAndUpdate(subChannelid, {
      $inc: { subscribers: 1 },
    });
    if (subdata) {
      res.json({
        message: "Subscribed successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "error while subscribing user",
      error: error.message,
    });
  }
};
// unscribe user
const unsubscribeUser = async (req, res) => {
  const uderid = req.user.id;
  const unsubChannelid = req.params.id;
  try {
    await userModel.findByIdAndUpdate(uderid, {
      $pull: { subscribedUsers: unsubChannelid },
    });

    const unsubdata = await userModel.findByIdAndUpdate(unsubChannelid, {
      $inc: { subscribers: -1 },
    });
    if (unsubdata) {
      res.json({
        message: "UnSubscribed successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "error while Unsubscribing user",
      error: error.message,
    });
  }
};
// like a video
const likeUservideo = async (req, res) => {
  const userId = req.user.id;
  const videoId = req.params.videoId;

  try {
    // Log input parameters for debugging
    console.log(`User ID: ${userId}`);
    console.log(`Video ID: ${videoId}`);

    // Find the video and update it
    const video = await videoModel.findByIdAndUpdate(
      videoId,
      {
        $addToSet: { likes: userId },
        $pull: { dislikes: userId },
      },
      { new: true } // Return the updated document
    );

    // Log video details for debugging
    console.log("Video after update:", video);

    // Check if video was found and updated
    if (video) {
      res.json({
        message: "Liked successfully",
        data: video,
      });
    } else {
      res.json({
        message: "Error while liking video: Video not found",
      });
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.log("Error while liking video:", error);

    // Respond with an error message
    res.json({
      message: "Error while liking video",
      error: error.message,
    });
  }
};

export default likeUservideo;

// dislike a video
const unlikeUservideo = async (req, res) => {
  const id = req.user.id;
  const vdoid = req.params.videoId;
  try {
    const video = await videoModel.findByIdAndUpdate(vdoid, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    if (video) {
      res.json({
        message: "dis liked successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "error while dis liking vdo",
      error: error.message,
    });
  }
};
const getalluser = async (req, res) => {
  const data = await userModel.find();
  res.json({ data: data });
};
export {
  updateUser,
  deleteUser,
  getUser,
  SubscribeUser,
  unsubscribeUser,
  likeUservideo,
  unlikeUservideo,
  getalluser,
};
