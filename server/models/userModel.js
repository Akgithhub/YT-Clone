import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String },
    subscribers: { type: Number, default: 0 },
    subscribedUsers: { type: [String] },
  },
  { timestamps: true }
);
const userModel = mongoose.model("userModel", userSchema);
export default userModel;
