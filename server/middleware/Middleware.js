import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_TOKEN;
if (!secretKey) {
  throw new Error("JWT_SECRET_KEY is not defined in the environment variables");
}

export const MiddleWare = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    res.json({
      message: "You are not authenticated!",
    });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      res.json({
        message: "Token is not valid!",
      });
    }
    req.user = user;
    next();
  });
};

export default MiddleWare;
