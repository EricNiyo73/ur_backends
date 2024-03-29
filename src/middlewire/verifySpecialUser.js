import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

async function Special_user(req, res, next) {
  try {
    // console.log(req.headers);
    const token = req.headers.authorization;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (user.role === "Special_user") {
        req.Special_user = user;
        next();
      } else {
        return res.status(403).json({
          message: "Only Special_user can do this action",
        });
      }
    } else {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

export default Special_user;
