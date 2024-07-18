import videoModel from "../models/videoModel.js";
import userModel from "../models/userModel.js";
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
    const video = await videoModel.findById(req.params.id);
    if (!video) {
      res.json({
        message: "Video not found",
      });
    }
    if (req.user.id === req.params.id) {
      const updatedVideo = await videoModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      if (updatedVideo) {
        res.json({
          message: "Video updated successfully",
          data: updatedVideo,
        });
      } else {
        res.json({
          message: "you can update only your video",
        });
      }
    }
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
    const video = await videoModel.findById(req.params.id);
    if (!video) {
      res.json({
        message: "Video not found",
      });
    }
    const deleteVodeo = await videoModel.findByIdAndDelete(req.params.id);
    if (deleteVodeo) {
      res.json({
        message: "Video deleted successfully",
      });
    } else {
      res.json({
        message: "you can update only your video",
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
// Get a video
const getVideo = async (req, res) => {
  try {
    const video = await videoModel.findById(req.params.id);
    if (video) {
      res.json({
        message: "Video get successfully",
        data: video,
      });
    } else {
      res.json({
        message: "Video not found",
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
// Adding view to a video
const addView = async (req, res) => {
  try {
    const videoId = req.params.id;
    const addview = await videoModel.findByIdAndUpdate(videoId, {
      $inc: { views: 1 },
    });
    if (addview) {
      res.json({
        message: "View added successfully",
        data: addview,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "Error while adding view in video",
      error: error.message,
    });
  }
};
// Generating new video
const randomVideo = async (req, res) => {
  try {
    const video = await videoModel.aggregate([{ $sample: { size: 40 } }]);
    if (video) {
      res.json({
        message: "Random video generated successfully",
        data: video,
      });
    }
  } catch (error) {
    console.log(error);
    res.jdon({
      message: "Error while generating random video",
      error: error.message,
    });
  }
};
// Generating trending video
const trendVideo = async (req, res) => {
  try {
    // if -1 then most viewed videos or if +1 then least viwed videos
    const video = await videoModel.find().sort({ views: -1 }).limit(40);
    if (video) {
      res.json({
        message: "tending video generated successfully",
        data: video,
      });
    }
  } catch (error) {
    console.log(error);
    res.jdon({
      message: "Error while generating trending video",
      error: error.message,
    });
  }
};
// Generating sub video
const subVideo = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    const subChannels = await user.subscribedUsers;
    const list = await Promise.all(
      subChannels.map((channelId) => {
        return videoModel.find({ userId: channelId });
      })
    );
    if (list) {
      res
        .status(200)
        .json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "Error while generating sub video",
      error: error.message,
    });
  }
};
const getByTags = async (req, res) => {
  const tags = req.query.tags.split(",");
  console.log(tags);
  try {
    const vdo = await videoModel.find({ tags: { $in: tags } }).limit(5);
    if (vdo) {
      res.json({
        message: "Video get successfully by Tags",
        data: vdo,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "Error whille getting vdo by tags",
      error: error.message,
    });
  }
};
const getBySearch = async (req, res) => {
  const query = req.query.srch;
  try {
    const vdo = await videoModel
      .find({ title: { $regex: query, $options: "i" } })
      .limit(20);
    if (vdo) {
      res.json({
        message: "Video get successfully by search",
        data: vdo,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "error while getting vdo by search",
      error: error.message,
    });
  }
};
export {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  addView,
  randomVideo,
  trendVideo,
  subVideo,
  getByTags,
  getBySearch,
};
