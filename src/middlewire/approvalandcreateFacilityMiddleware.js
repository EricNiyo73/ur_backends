import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import facility from "../model/AdminModel";

async function createFacilityMiddleware(req, res, next) {
  try {
    // console.log(req.headers);
    const token = req.headers.authorization;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (user.role === "Manager") {
        req.Manager = user;
        next();
      } else {
        return res.status(403).json({
          message: "Only Manager can create a facility",
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

export { createFacilityMiddleware };
