import videoModel from "../models/videoModel.js";
// Create a video
const addVideo = async (req, res) => {
  const newVideo = new videoModel({ userId: req.user.id, ...req.body });
  try {
    const video = await newVideo.save();
    if (video) {
      res.json({
        message: "Video added successfully",
        data: video,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "Error while adding video",
      error: error.message,
    });
  }
};
// Update video
const updateVideo = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.json({
      message: "Error while adding video",
      error: error.message,
    });
  }
};
// Delete a video
const deleteVideo = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.json({
      message: "Error while adding video",
      error: error.message,
    });
  }
};
// Get a video
const getVideo = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.json({
      message: "Error while adding video",
      error: error.message,
    });
  }
};
export { addVideo, updateVideo, deleteVideo, getVideo };
