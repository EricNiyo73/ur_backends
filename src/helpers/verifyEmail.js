import nodemailer from "nodemailer";
import User from "../model/userModel.js";
import express from "express";
const router = express.Router();
router.get("/verify-email", async (req, res) => {
  try {
    const token = req.query.token;
    const user = await User.findOne({ emailToken: token });
    if (user) {
      user.emailToken = null;
      user.isVerified = true;
      await user.save();
      console.log("verified");
    } else {
      console.log("email is not verified");
    }
  } catch (err) {
    console.log(err);
  }
});
export default router;
