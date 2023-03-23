"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyEmail = exports.upload = exports.updateUser = exports.login = exports.getOne = exports.getAll = exports.deleteUser = exports.deleteAll = exports.createmany = exports.createUser = void 0;
var _userModel = _interopRequireDefault(require("../model/userModel.js"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _multer = _interopRequireDefault(require("multer"));
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _verifyEmail = require("../helpers/verifyEmail");
var _dotenv = _interopRequireDefault(require("dotenv"));
var crypto = _interopRequireWildcard(require("crypto"));
var _cloudinary = require("cloudinary");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const path = require("path");
const router = (0, _express.default)();
_dotenv.default.config();
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
    html: emailBody
  };
};
router.use("/images", _express.default.static(path.join(process.cwd(), "/images")));
router.use(_bodyParser.default.urlencoded({
  extended: true
}));
router.use(_bodyParser.default.json());

// ============Claudinary configuration=================

_cloudinary.v2.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
let upload = (0, _multer.default)({
  storage: _multer.default.diskStorage({}),
  fileFilter: (req, file, cb) => {
    try {
      let ext = path.extname(file.originalname);
      if (ext !== ".JPG" && ext !== ".JPEG" && ext !== ".PNG" && ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        return cb(new Error("File type is not supported"), false);
      }
      cb(null, true);
    } catch (error) {
      return cb(error, false);
    }
  }
});
exports.upload = upload;
const createUser = async (req, res) => {
  try {
    // sending verification email
    const transporter = _nodemailer.default.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    // const result = await cloudinary.uploader.upload(req.file.path);

    const existingEmail = await _userModel.default.findOne({
      email: req.body.email
    });
    // Email validation using a regular expression
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({
        message: "Invalid email format"
      });
    }
    if (existingEmail) {
      return res.status(409).json({
        message: "Email  already exists"
      });
    } else {
      // Create a user
      const newUser = new _userModel.default({
        fullname: req.body.fullname,
        email: req.body.email,
        role: req.body.role,
        emailToken: crypto.randomBytes(64).toString("hex")
      });
      newUser.save().then(result => {
        return res.status(200).json({
          status: "success",
          data: {
            user: newUser
          }
        });
      }).catch(error => {
        return res.status(500).json({
          error
        });
      });
      console.log(req.body);

      //sending email
      transporter.sendMail(mailOptions(newUser), (error, info) => {
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
        message: "Unexpected error"
      });
    }
  }
};
exports.createUser = createUser;
const createmany = async (req, res, next) => {
  const transporter = _nodemailer.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  try {
    for (let index = 0; index < req.body.length; index++) {
      const existingEmail = await _userModel.default.findOne({
        email: req.body[index].email
      });
      if (existingEmail) {
        // break;
        return res.status(409).json({
          message: `${req.body[index].email} already exists`
        });
      }
      transporter.sendMail(mailOptions(req.body[index], req), (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      await _userModel.default.create({
        fullname: req.body[index].fullname,
        email: req.body[index].email,
        role: req.body[index].role,
        emailToken: crypto.randomBytes(64).toString("hex")
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
      insertedUsers: "success"
    });
  } catch (err) {
    if (err.code === "Cannot set headers after they are sent to the client") {
      console.error(err);
      return res.status(500).json({
        message: "Unexpected error"
      });
    } else {
      res.status(500).json({
        status: "error",
        message: err.message
      });
    }
  }
};
// ===============================LOGIN==================================
exports.createmany = createmany;
const login = async (req, res) => {
  try {
    const user = await _userModel.default.findOne({
      email: req.body.email
    });
    if (!user.isVerified === true) {
      return res.status(403).json("Email not verified ,check on your email and verify your email");
    }
    const validated = await _bcrypt.default.compare(req.body.password, user.password);
    if (!(user && validated)) {
      return res.status(403).json("Invalid Email or Username!");
    } else {
      const token = _jsonwebtoken.default.sign({
        id: user._id
      }, process.env.JWT_SECRET, {
        expiresIn: "24h"
      });
      return res.status(200).json({
        message: "Logged in successfully",
        token: token
      });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};
// ==========get one==========================
exports.login = login;
const getOne = async (req, res) => {
  try {
    const users = await _userModel.default.findById(req.params.id);
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// ===============================GETALL USERS=============================
exports.getOne = getOne;
const getAll = (req, res) => {
  _userModel.default.find().then(users => {
    return res.send(users);
  }).catch(err => {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving user."
    });
  });
};

// ====================update==============================
exports.getAll = getAll;
const updateUser = async (req, res) => {
  try {
    const result = await _cloudinary.v2.uploader.upload(req.file.path);
    const updatedUser = await _userModel.default.findByIdAndUpdate(req.params.id, {
      $set: {
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        role: req.body.role,
        userImage: result.secure_url
      }
    }, {
      new: true
    });
    if (!updatedUser) {
      return res.status(404).json({
        error: "user not found"
      });
    }
    return res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// ===================delete user================================
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
  // if (req.body.userId === req.params.id) {
  try {
    const user = await _userModel.default.findById(req.params.id);
    await _userModel.default.findByIdAndDelete(req.params.id);
    return res.status(200).json("User has been deleted...");
  } catch (err) {
    return res.status(404).json("User not found!");
  }
  // } else {
  //   return res.status(401).json("You can delete only your account!");
  // }
};

// ===================verify====================
exports.deleteUser = deleteUser;
const verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;
    console.log("tokrn------", token);
    const user = await _userModel.default.findOne({
      emailToken: token
    });
    console.log("user------", user);
    if (!user) {
      return res.status(400).json({
        message: "Invalid verification token"
      });
    }
    await user.updateOne({
      isVerified: true
    });
    const transporter = _nodemailer.default.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    let emailSubject = "Email verified Successfully";
    let emailBody = `<p>Dear ${user.firstname},</p>
             <p>Thanks for registering on our site.</p>
             <p>Your email has been successfully verified.</p>`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: emailSubject,
      html: emailBody
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
      message: "Email verified ,Now you can log in with your email"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Unexpected error"
    });
  }
};
exports.verifyEmail = verifyEmail;
const deleteAll = async (req, res) => {
  try {
    await _userModel.default.deleteMany({});
    return res.status(204).json({
      status: "success"
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message
    });
  }
};
exports.deleteAll = deleteAll;
//# sourceMappingURL=userContoller.js.map