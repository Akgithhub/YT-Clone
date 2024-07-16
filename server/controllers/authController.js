import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();
const secretKey = process.env.JWT_SECRET_KEY;
const GenerateToken = (id) => {
  return jwt.sign({ id }, secretKey);
};
const SignUp = async (req, res) => {
  const { email, password, name } = req.body;
  const emailExist = await userModel.findOne({ email: email });
  if (emailExist) {
    res.json({
      message: "User already exist",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(password, salt);

  const userData = {
    name: name,
    password: newPassword,
    email: email,
  };
  try {
    const newUser = await userModel.create(userData);
    const token = await GenerateToken(newUser._id);
    if (newUser) {
      res.json({
        message: "User created successfully",
        user: newUser,
        token: token,
      });
    }
    await newUser.save();
  } catch (error) {
    console.log(error);
    res.json({
      message: "Error while signing up",
      error: error.message,
    });
  }
};
export { SignUp };
