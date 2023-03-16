import facility from "../model/AdminModel.js";
import subModel from "../model/sub.js";

import BookingRequest from "../model/bookUserModel";
import Router from "express";
const router = Router();
import bodyParser from "body-parser";
import multer from "multer";
const path = require("path");
import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

const app = express();
// app.use(express.json());
router.use(express.json());
router.use("/images", express.static(path.join(process.cwd(), "/images")));
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// ===================cloudinary configuration=======================
import { v2 as cloudinary } from "cloudinary";
import { log } from "console";
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
export var upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    try {
      let ext = path.extname(file.originalname);
      if (
        ext !== ".pdf" &&
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
// import { createError } from "../utils/error.js";

// ==================creation of availability facility===========
export const createfacility = async (req, res, next) => {
  try {
    if (!req.file) return res.send("Please upload a file");
    const result = await cloudinary.uploader.upload(req.file.path);
    let sub = [];
    if (typeof req.body.sub === "object") {
      for (let i = 0; i < req.body.sub.length; i++) {
        sub.push(
          await subModel.create({
            sub: req.body.sub[i],
          })
        );
      }
    } else {
      sub.push(
        await subModel.create({
          sub: req.body.sub,
        })
      );
    }

    const newfacility = await facility.create({
      facilityname: req.body.facilityname,
      sub: sub,
      desc: req.body.desc,
      maxcapacity: req.body.maxcapacity,
      image: result.secure_url,
    });
    return res.status(201).json({
      statusbar: "success",
      message: "facility created successfully",
      facility: newfacility,
    });
  } catch (err) {
    next(err);
  }
};

// ==================update facility==========================

export const updatefacility = async (req, res, next) => {
  try {
    // const { id } = req.params;
    const getfacility = await facility.findById(req.params.id);
    if (!getfacility) {
      return res.status(404).json({
        status: "fail",
        message: "facility not found",
      });
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
    }
    let sub = [];
    if (typeof req.body.sub === "object") {
      for (let i = 0; i < req.body.sub.length; i++) {
        sub.push(
          new subModel({
            sub: req.body.sub[i],
          })
        );
      }
    } else {
      sub.push(
        new subModel({
          sub: req.body.sub,
        })
      );
    }

    const updatedfacility = await facility.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          facilityname: req.body.facilityname,
          sub: req.body.sub ? [...getfacility.sub].concat(sub) : facility.sub,
          desc: req.body.desc,
          maxcapacity: req.body.maxcapacity,
          image: req.file ? result?.secure_url : facility.image,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedfacility);
  } catch (err) {
    next(err);
  }
};

//   ==============================delete availability==========================

export const deletefacility = async (req, res, next) => {
  try {
    await facility.findByIdAndDelete(req.params.id);
    res.status(200).json("facility has been deleted.");
  } catch (err) {
    next(err);
  }
};

// =======================get one facility=============================
export const getfacilit = async (req, res, next) => {
  try {
    const getfacilit = await facility.findById(req.params.id);
    res.status(200).json(getfacilit);
  } catch (err) {
    next(err);
  }
};
//   ==========================get facility availability==========================
export const getfacility = async (req, res, next) => {
  try {
    const facilit = await subModel.find();

    // const subFacility = await subModel.find();

    res.status(200).json(facilit);
  } catch (err) {
    next(err);
  }
};

export const updateSub = async (req, res, next) => {
  try {
    const selected = await facility.findById(req.params.facilityId);
    let index = selected.sub.findIndex((sub) => sub._id == req.params.id);
    const sub = await subModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    console.log(selected,"jhhjhkjhkj",sub,index);
    
    
    selected.sub[index] = sub;
    await selected.save();

    res.status(200).json({
      statusbar: "success",
      message: "sub updated successfully",
    })
  } catch (err) {
    next(err);
  }
};

export const deleteSub = async (req, res, next) => {
  try {
    const sub = await subModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const selected = await facility.findById(req.params.facilityId);
    let index = selected.sub.findIndex((sub) => sub._id === req.params.id);
    selected.sub.splice(index, 1);
    await selected.save();

    res.status(204).json({
      statusbar: "success",
      message: "sub deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

//
// =======================admin for approving a request=================

// Endpoint for admins to approve or reject booking requests
export const bookrequest = async (req, res) => {
  try {
    const bookingRequest = await BookingRequest.findById(req.params.id);
    let emailSubject;
    let emailBody;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    if (!bookingRequest) {
      return res.status(404).json({ message: "Booking request not found" });
    }
    if (req.body.status === "Approved") {
      bookingRequest.status = req.body.status;
      await bookingRequest.save();
      // ============message========================
      emailSubject = "Booking Confirmation";
      emailBody = `<p>Dear ${bookingRequest.firstname},</p>
                   <p>Your booking has been confirmed.</p>
                   <p>Booking details:</p>
                   <ul>
                     <li>Facility: ${bookingRequest.subFacility}</li>
                     <li>Date: ${bookingRequest.date}</li>
                     <li>Time: ${bookingRequest.time}</li>
                   </ul>`;
      // ============================================
      res.json({ message: "Booking request approved successfully" });
    } else if (req.body.status === "Rejected") {
      bookingRequest.status = req.body.status;
      await bookingRequest.save();
      // ===================mesage====================
      emailSubject = "Booking Rejection";
      emailBody = `<p>Dear ${bookingRequest.firstname},</p>
               <p>Your booking has been rejected.</p>
               <p>Please contact us for more details.</p>`;
      res.json({ message: "Booking request rejected successfully" });
    } else {
      res.status(400).json({ message: "Invalid booking request status" });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: bookingRequest.email,
      subject: emailSubject,
      html: emailBody,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update booking request" });
  }
};
