import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { verify } from "../helpers/verifyEmail";
import dotenv from "dotenv";
dotenv.config();
import * as crypto from "crypto";

export const createUser = async (req, res) => {
  try {
    // sending verification email
    let emailSubject;
    let emailBody;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);

    const existingEmail = await User.findOne({ email: req.body.email });
    // Email validation using a regular expression
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }
    if (existingEmail) {
      return res.status(409).json({
        message: "Email  already exists",
      });
    } else {
      // Create a user
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedpassword,
        emailToken: crypto.randomBytes(64).toString("hex"),
      });

      newUser
        .save()
        .then((result) => {
          return res.status(200).json({
            status: "success",
            data: {
              user: newUser,
            },
          });
        })
        .catch((error) => {
          return res.status(500).json({
            error,
          });
        });
      emailSubject = "Email verification";
      emailBody = `<p>Dear ${newUser.firstname},</p>
                   <p>Thanks for registering on our site.</p>
                   <p>Please verify your email to continue...</p>
                   <a href="http://${req.headers.host}/user/verify-email?token=${newUser.emailToken}">Verify Email</a>`;
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: newUser.email,
        subject: emailSubject,
        html: emailBody,
      };
      //sending email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }
  } catch (err) {
    if (err.code === "Cannot set headers after they are sent to the client") {
      console.error(err);
      return res.status(500).json({
        message: "Unexpected error",
      });
    }
  }
};

// ===============================LOGIN==================================

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!(user && validated)) {
      return res.status(201).json("Invalid Email or Username!");
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json({
        message: "Logged in successfully",
        token: token,
      });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

// ===============================GETALL USERS=============================
export const getAll = (req, res) => {
  User.find()
    .then((users) => {
      return res.send(users);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    });
};

// ====================update==============================
export const updateUser = async (req, res) => {
  // if (req.body.userId === req.params.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  // } else {
  //   return res.status(401).json("You can update  your account only!");
  // }
};

// ===================delete user================================

export const deleteUser = async (req, res) => {
  // if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json("User has been deleted...");
    } catch (err) {
      return res.status(404).json("User not found!");
    }
  // } else {
  //   return res.status(401).json("You can delete only your account!");
  // }
};
