import userModel from "../models/userModel.js";
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
const deleteUser = async (req, res, next) => {
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
const getUser = async (req, res, next) => {
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
const SubscribeUser = async (req, res, next) => {
  const uderid = req.user.id;
  const subChannelid = req.params.id;
  try {
    await userModel.findById(uderid, {
      $push: { subscribedUsers: subChannelid },
    });

    const subdata = await userModel.findById(subChannelid, {
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
const unsubscribeUser = async (req, res, next) => {};
// like a video
const likeUservideo = async (req, res, next) => {};
// dislike a video
const unlikeUservideo = async (req, res, next) => {};
export {
  updateUser,
  deleteUser,
  getUser,
  SubscribeUser,
  unsubscribeUser,
  likeUservideo,
  unlikeUservideo,
};
