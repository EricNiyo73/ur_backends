// import router from "express".Router();
// import { v4 as uuidv4 } from 'uuid';
import Router from "express";
const router = Router();
import bodyParser from "body-parser";
import News from "../model/newsModel.js";
import multer from "multer";
const path = require("path");
import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import subscriber from "../model/subscribers.js";
dotenv.config();
const app = express();
// console.log(path.join(process.cwd(), "/images"));
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
// =============================Create a News=====================
export const createNews = async (req, res) => {
  try {
    const existtitle = await News.findOne({ newsTitle: req.body.newsTitle });
    if (existtitle) {
      return res.status(302).json({
        message: "News Title already exists",
      });
    }
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
    // ======================================================

    if (!req.file) return res.send("Please upload a file");
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("Request File: ", req.file);
    const newNews = new News({
      newsImage: result.secure_url,
      newsTitle: req.body.newsTitle,
      newsContent: req.body.newsContent,
      author: req.Special_user.fullname,
    });

    const saveNews = await newNews.save();
    // ====================================================
    const subscribedUsers = await subscriber.find();
    emailSubject = "New Update on UR Huye Site";
    emailBody = `<p>New News added on site !!!!!</p>`;
    subscribedUsers.forEach((user) => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: emailSubject,
        html: `<p>Dear ${user.email},</p>${emailBody}
          <a href="https://ur-app.vercel.app/">Please click on the link to view the news</a>`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    });

    // ===================================================================
    return res.status(200).json({
      saveNews,
      status: "your news was successfully uploaded",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// =====================get All news======================

export const findAll = async (req, res) => {
  try {
    let news;
    news = await News.find();

    return res.status(200).json({
      data: news,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};
// export const findAll = async (req, res) => {
//   try{
//   const news = await News.find();

//     return res.status(200).json({
//       data: news
//     });
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// };

// =====================get One news================================
export const getOne = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    return res.status(200).json(news);
  } catch (err) {
    return res.status(500).json(err);
  }
};
// ======================Delete==============================
export const deleteNews = async (req, res) => {
  const news = await News.findById(req.params.id);
  try {
    await news.delete();
    return res.status(200).json("news has been deleted...");
  } catch (err) {
    return res.status(500).json(err);
  }
};

// ===============Update=============================
export const updateNews = async (req, res) => {
  try {
    // const { id } = req.params;
    const result = await cloudinary.uploader.upload(req.file.path);
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      {
        newsTitle: req.body.newsTitle,
        newsContent: req.body.newsContent,
        newsImage: result.secure_url,
      },
      { new: true }
    );

    if (!updatedNews) {
      return res.status(404).json({ error: "News not found" });
    }

    return res.status(200).json({
      updatedNews,
      status: "Your news was successfully  updated",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default router;
