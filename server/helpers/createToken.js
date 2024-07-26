import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export default function createToken({ user, res }) {
  const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
    expiresIn: '15d'
  });

  console.log(token);
  
  res.cookie('access_token', token, {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
  });

  console.log("Token created and set in cookie");
  return token;
}
