import Router from "express";
import bodyParser from "body-parser";
import eventModel from "../model/eventModel.js";
import multer from "multer";
const path = require("path");
import express from "express";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import nodemailer from "nodemailer";
import subscriber from "../model/subscribers.js";

dotenv.config();
const router = Router();
const app = express();

router.use("/images", express.static(path.join(process.cwd(), "/images")));
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// ============Claudinary configuration=================
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

// =============================Create a Event=====================
export const createEvent = async (req, res) => {
  try {
    // create a notification=============================
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
    if (!req.file) return res.send("Please upload a file");
    console.log("Request: ", req);
    console.log("Request File: ", req.file);
    const result = await cloudinary.uploader.upload(req.file.path);
    const newevent = new eventModel({
      eventImage: result.secure_url,
      eventTitle: req.body.eventTitle,
      eventContent: req.body.eventContent,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      author: req.Special_user.fullname,
    });
    const saveEvent = await newevent.save();

    // ============================================================
    const subscribedUsers = await subscriber.find();
    emailSubject = "New Update on UR Huye Site";
    emailBody = `<p>New Event added on site !!!!!</p>`;
    subscribedUsers.forEach((user) => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: emailSubject,
        html: `<p>Dear ${user.name}</p>
    <p>${emailBody}</p>
    <a href="http://${req.headers.host}/events/">Please click on the link to view the Events</a>`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    });
    // =====================================================
    return res.status(200).json({
      saveEvent,
      status: "your Event was successfully uploaded",
    });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json(error);
  }
};

//   ==========================get all events========================
export const findAll = async (req, res) => {
  try {
    const events = await eventModel.find();

    return res.status(200).json({
      data: events,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// =====================get One event================================
export const getOne = async (req, res) => {
  try {
    const events = await eventModel.findById(req.params.id);
    return res.status(200).json(events);
  } catch (err) {
    return res.status(500).json(err);
  }
};
// ======================Delete==============================
export const deleteEvent = async (req, res) => {
  try {
    const events = await eventModel.findById(req.params.id);
    try {
      await events.delete();
      return res.status(200).json("Event has been deleted...");
    } catch (err) {
      return res.status(500).json(err);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

// ===============Update=============================
export const updateEvent = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const updatedEvent = await eventModel.findByIdAndUpdate(
      req.params.id,
      {
        eventTitle: req.body.eventTitle,
        eventContent: req.body.eventContent,
        eventImage: result.secure_url,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
      },
      { new: true }
    );
    return res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json(err);
  }
};
export default router;
