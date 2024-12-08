import express from "express";
import { connectDB } from "./config/mongo.js";
import { configDotenv } from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import { errMessage } from "./middlewares/errorMessage.middleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";

configDotenv();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.listen(3000, () => {
  connectDB();
  console.log("server is running on port 3000!!!!");
});

// routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use(errMessage);
