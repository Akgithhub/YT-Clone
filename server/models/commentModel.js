import mongoose from "mongoose";
const commentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    videoId: { type: String, required: true},
    desc: { type: String, required: true },
  },
  { timestamps: true }
);
const commentModel = mongoose.model("commentModel", commentSchema);
export default commentModel;
