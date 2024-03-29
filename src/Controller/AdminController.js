import facility from "../model/AdminModel.js";
// import subModel from "../model/sub.js";

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
  console.log(req.manager);
  try {
    if (!req.file) return res.send("Please upload a file");
    const existingfacility = await facility.findOne({
      facilityname: req.body.facilityname,
    });
    if (existingfacility) {
      return res.status(302).json({
        status: "fail",
        message: "facility already exists",
      });
    }
    const result = await cloudinary.uploader.upload(req.file.path);

    const newfacility = await facility.create({
      facilityname: req.body.facilityname,
      maxcapacity: req.body.maxcapacity,
      desc: req.body.desc,
      contactPersonName: req.body.contactPersonName,
      category: req.body.category,
      managerId: req.Manager._id,
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

    const updatedfacility = await facility.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          facilityname: req.body.facilityname,
          maxcapacity: req.body.maxcapacity,
          desc: req.body.desc,
          contactPersonName: req.body.contactPersonName,
          category: req.body.category,
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
    const facilit = await facility.find();

    // const subFacility = await subModel.find();

    res.status(200).json(facilit);
  } catch (err) {
    next(err);
  }
};

// ===================================deleteMany=============================
export const deleteAll = async (req, res) => {
  try {
    await facility.deleteMany({});

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

//

// =================================admin for approving request===================================

export const approving = async (req, res) => {
  try {
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
    if (req.body.status !== "Approved") {
      return res.status(400).json({ message: "invalid status" });
    }
    const bookingRequest = await BookingRequest.findById(req.params.id);
    if (!bookingRequest) {
      return res.status(404).json({ message: "Booking request not found" });
    }
    let facilityBooked = await facility.findOne({
      facilityname: bookingRequest.facilityname,
    });

    if (req.Manager._id.toString() === facilityBooked.managerId) {
      bookingRequest.status = req.body.status;
      await bookingRequest.save();
      // ============message========================
      emailSubject = "Booking Confirmation";
      emailBody = `<p>Dear ${bookingRequest.fullname},</p>
                   <p>Your booking has been confirmed.</p>
                   <p>Booking details:</p>
                   <ul>
                     <li>Facility: ${bookingRequest.facilityname}</li>
                     <li>Date: ${bookingRequest.date}</li>
                     <li>Time: ${bookingRequest.time}</li>
                   </ul>
                   <p>contact: Technical support ${facilityBooked.contactPersonName} </p>
                   <p>Thank you for your booking.</p>`;
      // ===========================`;
      // ============================================
      const mailOption = {
        from: process.env.EMAIL_USER,
        to: bookingRequest.email,
        subject: emailSubject,
        html: emailBody,
      };

      transporter.sendMail(mailOption, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      return res.json({ message: "Booking request Approved successfully" });
    } else {
      return res
        .status(406)
        .json({ message: "You are not the manager of this facility" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update booking request" });
  }
}; //
// =======================admin for Rejecting a request=================

export const rejecting = async (req, res) => {
  try {
    let emailSubjects;
    let emailBodys;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    if (req.body.status !== "Rejected") {
      return res.status(400).json({ message: "invalid status" });
    }
    const bookingRequest = await BookingRequest.findById(req.params.id);
    if (!bookingRequest) {
      return res.status(404).json({ message: "Booking request not found" });
    }
    let facilityBooked = await facility.findOne({
      facilityname: bookingRequest.facilityname,
    });

    if (req.Manager._id.toString() === facilityBooked.managerId) {
      if (!req.body.rejectionReason) {
        return res
          .status(400)
          .json({ message: "Rejection reason is required" });
      }
      bookingRequest.status = req.body.status;
      bookingRequest.rejectionReason = req.body.rejectionReason;
      await bookingRequest.save();
      // ============message========================
      emailSubjects = "Booking Rejection";
      emailBodys = `<p>Dear ${bookingRequest.fullname}</p>
               <p>Your booking has been rejected.</p>
               <p>${req.body.rejectionReason}</p>`;
      // ============================================
      const mailOption = {
        from: process.env.EMAIL_USER,
        to: bookingRequest.email,
        subject: emailSubjects,
        html: emailBodys,
      };

      transporter.sendMail(mailOption, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      return res.json({ message: "Booking request rejected successfully" });
    } else {
      return res
        .status(406)
        .json({ message: "You are not the manager of this facility" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update booking request" });
  }
};
