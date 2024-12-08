import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  //  create an error
  if (!token) return next(errorHandler(401, "Unauthorized User"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(401, "Forbidden"));

    req.user = user;
    next();
  });
};
