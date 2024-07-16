import userModel from "../models/userModel.js";
const test = (req, res) => {
  res.json({
    message: "test is running",
  });
};
export { test };
