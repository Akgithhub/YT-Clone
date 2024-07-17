import express from "express";
import { configDotenv } from "dotenv";
import Connect_DB from "./config/db.js";
import cors from "cors";
import userRouter from "./router/userRouter.js";
import commentRouter from "./router/commentRouter.js";
import authRouter from "./router/authRouter.js";
import videoRouter from "./router/videoRouter.js";
import cookieParser from "cookie-parser";
configDotenv();

const port = process.env.PORT;
const db_url = process.env.DB_URL;

const app = express();

// Connecting data base
Connect_DB(db_url);

// Middleware
app.use(express.json());
app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser);
app.use(cors());

// Emdpoints
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/comment", commentRouter);
app.use("/api/video", videoRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  res.status(status).json({
    success: false,
    status: status,
    message: message,
  });
  next();
});

app.get("/", (req, res) => {
  res.send("YouTube Clone !!");
});

app.listen(port || 3000);
