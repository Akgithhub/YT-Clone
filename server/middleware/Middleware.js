import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;
if (!secretKey) {
  throw new Error("JWT_SECRET_KEY is not defined in the environment variables");
}

const MiddleWare = async (req, res, next) => {
  try {
    const token = req.cookies.jwtToken;
    if (!token) {
      return res.status(401).json({
        message: "No token provided, please login first",
      });
    }

    const verify = await jwt.verify(token, secretKey);
    if (!verify) {
      return res.status(401).json({
        message: "Invalid token, please login again",
      });
    }

    // Attach user info to request
    // req.user = verify; assigns the decoded token (usually containing user information) to req.user.
    req.user = verify;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Middleware error",
      error: error.message,
    });
  }
};

export default MiddleWare;
