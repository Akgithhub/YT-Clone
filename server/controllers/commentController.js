import commentModel from "../models/commentModel.js";
const test = (req, res) => {
  res.json({
    message: "test is running",
  });
};
export { test };