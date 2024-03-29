import jwt from "jsonwebtoken";
import User from "../model/userModel";

import dotenv from "dotenv";
dotenv.config();
export default async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decodedToken.id);
      if (user) {
        req.user = user;
        next();
      } else {
        return res.status(401).json({
          message: "UnAuthorized",
        });
      }
    } else {
      return res.status(403).json({ message: "please! create an account" });
    }
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized,please Login" });
  }
};
