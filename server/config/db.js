import mongoose from "mongoose";

const Connect_DB = async (url) => {
  try {
    let db = await mongoose.connect(url);
    if (db) {
      console.log("Database connected successfully !!");
    }
  } catch (error) {
    console.log("Error while connecting db", error);
  }
};
export default Connect_DB;
