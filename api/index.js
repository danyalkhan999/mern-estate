import express from "express";
import { connectDB } from "./config/mongo.js";
import { configDotenv } from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

configDotenv();

const app = express();

app.use(express.json());

app.listen(3000, () => {
  connectDB();
  console.log("server is running on port 3000!!!!");
});

// routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
