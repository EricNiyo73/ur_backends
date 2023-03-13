import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

async function Authorization(req, res, next) {
  try {
    // console.log(req.headers);
    const token = req.headers.authorization;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (user.role === "leader") {
        next();
      } else {
        return res.status(401).json({
          message: "Only leader can book"
        });
      }
    } else {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized"
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Invalid token"
    });
  }
}

export default Authorization;
