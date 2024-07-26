import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { configDotenv } from "dotenv";
import createToken from "../helpers/createToken.js";

configDotenv();

// Create a user
const SignUp = async (req, res) => {
  const { email, password, name } = req.body;

  // Check if the user already exists
  const emailExist = await userModel.findOne({ email });
  if (emailExist) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(password, salt);

  // Create user data
  const userData = {
    name,
    password: newPassword,
    email,
  };

  try {
    // Create a new user
    const newUser = await userModel.create(userData);

    if (newUser) {
      // Create and set the token, and get the token value
      const token = createToken({ user: newUser, res });

      // Respond with success message, user data, and token
      return res.status(201).json({
        message: "User created successfully",
        user: newUser,
        token, // Include the token in the response
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
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
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) {
      return res.status(401).json({
        message: "Wrong password",
      });
    }

    // Create and set the token, and get the token value
    const token = createToken({ user, res });

    res.json({
      message: "Logged in successfully",
      user,
      token, // Include the token in the response
    });
  } catch (err) {
    next(err);
  }
};
// Google Sign In

export { SignUp, SignIn };
