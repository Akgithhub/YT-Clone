import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();
const secretKey = process.env.JWT_SECRET_KEY;
const GenerateToken = (id) => {
  return jwt.sign({ id }, secretKey);
};
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
const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) {
      res.json({
        message: "Password is incorrect",
      });
    }

    const Token = await GenerateToken(user._id);
    if (!Token) {
      res.json({
        message: "token not generated",
      });
    }
    res.cookie("jwtToken", Token, { httpOnly: true });
    res.json({
      message: "User signed in successfully",
      data: user,
      token: Token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Error while signing in user",
      error: error.message,
    });
  }
};
// Google Sign In

export { SignUp, SignIn };
