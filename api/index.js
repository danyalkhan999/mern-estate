import express from "express";
import { connectDB } from "../config/mongo.js";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();

app.listen(3000, () => {
  connectDB();
  console.log("server is running on port 3000!!!!");
});
