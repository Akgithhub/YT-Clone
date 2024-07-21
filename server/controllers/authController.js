import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

// Create a user
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

    if (newUser) {
      res.json({
        message: "User created successfully",
        user: newUser,
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

// Sign In
const SignIn = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ name: req.body.name });
    if (!user) {
      res.json({
        message: "user not found",
      });
    }
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) {
      res.json({
        message: "wrong password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    // const { password, ...others } = user._doc;
    res.cookie("access_token", token, {
      httpOnly: true,
    });
    res.json({
      message: "logged in successfully",
      user,
      // token,
    });
  } catch (err) {
    next(err);
  }
};
// Google Sign In

export { SignUp, SignIn };
