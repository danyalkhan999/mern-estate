import express from "express";
import { connectDB } from "./config/mongo.js";
import { configDotenv } from "dotenv";
import userRouter from "./routes/user.route.js";

configDotenv();

const app = express();

app.use("/api/user", userRouter);

app.listen(3000, () => {
  connectDB();
  console.log("server is running on port 3000!!!!");
});
