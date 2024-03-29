"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = exports.updatefacility = exports.updateSub = exports.getfacility = exports.getfacilit = exports.deletefacility = exports.deleteSub = exports.createfacility = exports.bookrequest = void 0;
var _AdminModel = _interopRequireDefault(require("../model/AdminModel.js"));
var _sub = _interopRequireDefault(require("../model/sub.js"));
var _bookUserModel = _interopRequireDefault(require("../model/bookUserModel"));
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _multer = _interopRequireDefault(require("multer"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _cloudinary = require("cloudinary");
var _console = require("console");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = (0, _express.default)();
const path = require("path");
_dotenv.default.config();
const app = (0, _express.default)();
// app.use(express.json());
router.use(_express.default.json());
router.use("/images", _express.default.static(path.join(process.cwd(), "/images")));
router.use(_bodyParser.default.urlencoded({
  extended: true
}));
router.use(_bodyParser.default.json());
// ===================cloudinary configuration=======================

_cloudinary.v2.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
var upload = (0, _multer.default)({
  storage: _multer.default.diskStorage({}),
  fileFilter: (req, file, cb) => {
    try {
      let ext = path.extname(file.originalname);
      if (ext !== ".pdf" && ext !== ".JPG" && ext !== ".JPEG" && ext !== ".PNG" && ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        return cb(new Error("File type is not supported"), false);
      }
      cb(null, true);
    } catch (error) {
      return cb(error, false);
    }
  }
});
// import { createError } from "../utils/error.js";

// ==================creation of availability facility===========
exports.upload = upload;
const createfacility = async (req, res, next) => {
  try {
    if (!req.file) return res.send("Please upload a file");
    const result = await _cloudinary.v2.uploader.upload(req.file.path);
    const newfacility = await _AdminModel.default.create({
      facilityname: req.body.facilityname,
      image: req.body.image,
      desc: req.body.desc,
      image: result.secure_url
    });
    return res.status(201).json({
      statusbar: "success",
      message: "facility created successfully",
      facility: newfacility
    });
  } catch (err) {
    next(err);
  }
};

// ==================update facility==========================
exports.createfacility = createfacility;
const updatefacility = async (req, res, next) => {
  try {
    // const { id } = req.params;
    const getfacility = await _AdminModel.default.findById(req.params.id);
    if (!getfacility) {
      return res.status(404).json({
        status: "fail",
        message: "facility not found"
      });
    }
    if (req.file) {
      const result = await _cloudinary.v2.uploader.upload(req.file.path);
    }
    let sub = [];
    if (typeof req.body.sub === "object") {
      for (let i = 0; i < req.body.sub.length; i++) {
        sub.push(new _sub.default({
          sub: req.body.sub[i]
        }));
      }
    } else {
      sub.push(new _sub.default({
        sub: req.body.sub
      }));
    }
    const updatedfacility = await _AdminModel.default.findByIdAndUpdate(req.params.id, {
      $set: {
        facilityname: req.body.facilityname,
        sub: req.body.sub ? [...getfacility.sub].concat(sub) : _AdminModel.default.sub,
        desc: req.body.desc,
        image: req.file ? result?.secure_url : _AdminModel.default.image
      }
    }, {
      new: true
    });
    res.status(200).json(updatedfacility);
  } catch (err) {
    next(err);
  }
};

//   ==============================delete availability==========================
exports.updatefacility = updatefacility;
const deletefacility = async (req, res, next) => {
  try {
    await _AdminModel.default.findByIdAndDelete(req.params.id);
    res.status(200).json("facility has been deleted.");
  } catch (err) {
    next(err);
  }
};

// =======================get one facility=============================
exports.deletefacility = deletefacility;
const getfacilit = async (req, res, next) => {
  try {
    const getfacilit = await _AdminModel.default.findById(req.params.id);
    res.status(200).json(getfacilit);
  } catch (err) {
    next(err);
  }
};
//   ==========================get facility availability==========================
exports.getfacilit = getfacilit;
const getfacility = async (req, res, next) => {
  try {
    const facilit = await _AdminModel.default.find();

    // const subFacility = await subModel.find();

    res.status(200).json(facilit);
  } catch (err) {
    next(err);
  }
};
exports.getfacility = getfacility;
const updateSub = async (req, res, next) => {
  try {
    const selected = await _AdminModel.default.findById(req.params.facilityId);
    let index = selected.sub.findIndex(sub => sub._id == req.params.id);
    const sub = await _sub.default.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {
      new: true
    });
    console.log(selected, "jhhjhkjhkj", sub, index);
    selected.sub[index] = sub;
    await selected.save();
    res.status(200).json({
      statusbar: "success",
      message: "sub updated successfully"
    });
  } catch (err) {
    next(err);
  }
};
exports.updateSub = updateSub;
const deleteSub = async (req, res, next) => {
  try {
    const sub = await _sub.default.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {
      new: true
    });
    const selected = await _AdminModel.default.findById(req.params.facilityId);
    let index = selected.sub.findIndex(sub => sub._id === req.params.id);
    selected.sub.splice(index, 1);
    await selected.save();
    res.status(204).json({
      statusbar: "success",
      message: "sub deleted successfully"
    });
  } catch (err) {
    next(err);
  }
};

//
// =======================admin for approving a request=================

// Endpoint for admins to approve or reject booking requests
exports.deleteSub = deleteSub;
const bookrequest = async (req, res) => {
  try {
    const bookingRequest = await _bookUserModel.default.findById(req.params.id);
    let emailSubject;
    let emailBody;
    const transporter = _nodemailer.default.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    if (!bookingRequest) {
      return res.status(404).json({
        message: "Booking request not found"
      });
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
      res.json({
        message: "Booking request approved successfully"
      });
    } else if (req.body.status === "Rejected") {
      if (!req.body.rejectionReason) {
        return res.status(400).json({
          message: "Rejection reason is required"
        });
      }
      bookingRequest.status = req.body.status;
      bookingRequest.rejectionReason = req.body.rejectionReason;
      await bookingRequest.save();
      // ===================mesage====================
      emailSubject = "Booking Rejection";
      emailBody = `<p>Dear ${bookingRequest.firstname},</p>
               <p>Your booking has been rejected.</p>
               <p>${req.body.rejectionReason}</p>`;
      res.json({
        message: "Booking request rejected successfully"
      });
    } else {
      res.status(400).json({
        message: "Invalid booking request status"
      });
    }
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: bookingRequest.email,
      subject: emailSubject,
      html: emailBody
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
    res.status(500).json({
      message: "Failed to update booking request"
    });
  }
};
exports.bookrequest = bookrequest;
//# sourceMappingURL=AdminController.js.map