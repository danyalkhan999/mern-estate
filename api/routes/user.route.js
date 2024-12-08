import express from "express";
import { test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);

// before updating the userData we will verify the user using cookie
router.post("/update/:id", verifyToken, updateUser);

export default router;
