import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
const path = require("path");
import Router from "express";
import express from "express";
const router = Router();
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import { verify } from "../helpers/verifyEmail";
import dotenv from "dotenv";
dotenv.config();
import * as crypto from "crypto";

const mailOptions = (newUser, req) => {
  let emailSubject = "Email verification";
  let emailBody = `<p>Dear ${newUser.fullname},</p>
               <p>You have registered on our site.</p>
               <p>Please verify your email to continue...</p>
               <a href="http://${req.headers.host}/user/verify-email/${newUser.emailToken}">Verify Email</a>`;
  return {
    from: process.env.EMAIL_USER,
    to: newUser.email,
    subject: emailSubject,
    html: emailBody,
  };
};
router.use("/images", express.static(path.join(process.cwd(), "/images")));
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// ============Claudinary configuration=================
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
export let upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    try {
      let ext = path.extname(file.originalname);
      if (
        ext !== ".JPG" &&
        ext !== ".JPEG" &&
        ext !== ".PNG" &&
        ext !== ".jpg" &&
        ext !== ".jpeg" &&
        ext !== ".png"
      ) {
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
        fullname: req.body.fullname,
        email: req.body.email,
        role: req.body.role,
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
      let emailSubject = "Email verification";
      let emailBody = `<p>Dear ${newUser.fullname},</p>
               <p>You have registered on our site.</p>
               <p>Please verify your email to continue...</p>
               <a href="http://${req.headers.host}/user/verify-email/${newUser.emailToken}">Verify Email</a>`;
      const mailOption = {
        from: process.env.EMAIL_USER,
        to: newUser.email,
        subject: emailSubject,
        html: emailBody,
      };
      //sending email
      transporter.sendMail(mailOption, (error, info) => {
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

export const createmany = async (req, res, next) => {
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
  try {
    for (let index = 0; index < req.body.length; index++) {
      const existingEmail = await User.findOne({
        email: req.body[index].email,
      });
      if (existingEmail) {
        // break;
        return res.status(409).json({
          message: `${req.body[index].email} already exists`,
        });
      }
      transporter.sendMail(mailOptions(req.body[index], req), (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      await User.create({
        fullname: req.body[index].fullname,
        email: req.body[index].email,
        role: req.body[index].role,
        emailToken: crypto.randomBytes(64).toString("hex"),
      });
    }
    // const res  =  await all.then(data => {
    //   return res.status(201).json({
    //     status: "success",
    //     data: data,
    //   });
    // })

    // console.log(...all);
    return res.status(201).json({
      status: "success",
      insertedUsers: "success",
    });
  } catch (err) {
    if (err.code === "Cannot set headers after they are sent to the client") {
      console.error(err);
      return res.status(500).json({
        message: "Unexpected error",
      });
    } else {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
};
// ===============================LOGIN==================================

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // if (!user.isVerified === true) {
    //   return res
    //     .status(403)
    //     .json("Email not verified ,check on your email and verify your email");
    // }
    // const validated = await bcrypt.compare(req.body.password, user.password);

    if (user.password !== req.body.password) {
      return res.status(403).json("Invalid Email or Password!");
    }

    if (!user) {
      return res.status(403).json("Invalid Email or Username!");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    return res.status(200).json({
      message: "Logged in successfully",
      token: token,
    });
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
          role: req.body.role,
          userImage: result.secure_url,
        },
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
      message: "Email verified ,Now you can log in with your email",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Unexpected error",
    });
  }
};
export const deleteAll = async (req, res) => {
  try {
    await User.deleteMany({});

    return res.status(204).json({
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// ===============================RESET PASSWORD================================
export const resetPassword = async (req, res) => {
  try {
    // Find user with matching email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Generate password reset token
    const resetToken = crypto.randomBytes(64).toString("hex");
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour

    // Save user with updated password reset token and expiration
    await user.save();

    // Send password reset email
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
    const emailSubjects = "Password Reset Request";
    const emailBodys = `<p>You have requested a password reset for your account.</p>
                       <p>Please click the link below to reset your password:</p>
                       <a href="http://${req.headers.host}/reset-password/${resetToken}">Reset Password</a>`;
    const mailOption = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: emailSubjects,
      html: emailBodys,
    };
    transporter.sendMail(mailOption, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          message: "Error sending password reset email",
        });
      } else {
        console.log("Password reset email sent: " + info.response);
        return res.status(200).json({
          message: "Password reset email sent",
        });
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Unexpected error",
    });
  }
};

export const resetPasswordConfirm = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Find the user with the given password reset token
    const user = await User.findOne({ passwordResetToken: token });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Invalid or expired password reset token." });
    }

    // Update the user's password and clear the password reset token
    user.password = password;
    user.passwordResetToken = undefined;
    await user.save();

    // Return a success message
    return res.json({ message: "Password reset successful." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unexpected error occurred." });
  }
};
