import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
const path = require("path");
import  Router  from 'express';
import express from "express";
const router = Router();
import bodyParser from 'body-parser';
import nodemailer from "nodemailer";
import { verify } from "../helpers/verifyEmail";
import dotenv from "dotenv";
dotenv.config();
import * as crypto from "crypto";



router.use("/images", express.static(path.join(process.cwd(), "/images")));
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json());

// ============Claudinary configuration=================
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name:process.env.CLOUDNAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET
});
export let upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    try {
      let ext = path.extname(file.originalname);
      if (ext !== ".JPG" && ext !== ".JPEG" && ext !== ".PNG" && ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png"){
        return cb(new Error("File type is not supported"), false);
      }
      cb(null, true);
    } catch (error) {
      return cb(error, false);
    }
  },
});
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
    // const result = await cloudinary.uploader.upload(req.file.path);
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
        console.log(req.body);
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
        expiresIn: "24h",
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
// ==========get one==========================
export const getOne = async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    return res.status(200).json(users);
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
      const result = await cloudinary.uploader.upload(req.file.path);
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {          
          email: req.body.email,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          password: req.body.password,
          userImage: result.secure_url
          }
        },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ error: "user not found" });
      }
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


// ===================verify====================
export const verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;
    console.log("tokrn------", token);
    const user = await User.findOne({ emailToken: token });
    console.log("user------", user);
    if (!user) {
      return res.status(400).json({
        message: "Invalid verification token",
      });
    }
    await user.updateOne({ isVerified: true });

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

    let emailSubject = "Email verified Successfully";
    let emailBody = `<p>Dear ${user.firstname},</p>
             <p>Thanks for registering on our site.</p>
             <p>Your email has been successfully verified.</p>`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
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

    return res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Unexpected error",
    });
  }
};
