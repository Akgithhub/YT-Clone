import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY;
const MiddleWare = async (req, res, next) => {
  try {
    const token = req.cookies.jwtToken;
    const verify = await jwt.verify(token, secretKey);
    if (!verify) {
      res.josn({
        message: "please login first",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "Middlware error",
      error: error.message,
    });
  }
};
export default MiddleWare;
