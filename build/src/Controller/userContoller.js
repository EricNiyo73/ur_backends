"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyEmail = exports.updateUser = exports.login = exports.getAll = exports.deleteUser = exports.createUser = void 0;
var _userModel = _interopRequireDefault(require("../model/userModel.js"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _verifyEmail = require("../helpers/verifyEmail");
var _dotenv = _interopRequireDefault(require("dotenv"));
var crypto = _interopRequireWildcard(require("crypto"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const createUser = async (req, res) => {
  try {
    // sending verification email
    let emailSubject;
    let emailBody;
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
    const salt = await _bcrypt.default.genSalt(10);
    const hashedpassword = await _bcrypt.default.hash(req.body.password, salt);
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
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedpassword,
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
      emailSubject = "Email verification";
      emailBody = `<p>Dear ${newUser.firstname},</p>
                   <p>Thanks for registering on our site.</p>
                   <p>Please verify your email to continue...</p>
                   <a href="http://${req.headers.host}/user/verify-email?token=${newUser.emailToken}">Verify Email</a>`;
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: newUser.email,
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

// ===============================LOGIN==================================
exports.createUser = createUser;
const login = async (req, res) => {
  try {
    const user = await _userModel.default.findOne({
      email: req.body.email
    });
    const validated = await _bcrypt.default.compare(req.body.password, user.password);
    if (!(user && validated)) {
      return res.status(201).json("Invalid Email or Username!");
    } else {
      const token = _jsonwebtoken.default.sign({
        id: user._id
      }, process.env.JWT_SECRET, {
        expiresIn: "1h"
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

// ===============================GETALL USERS=============================
exports.login = login;
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
  // if (req.body.userId === req.params.id) {
  try {
    const updatedUser = await _userModel.default.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {
      new: true
    });
    return res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
  // } else {
  //   return res.status(401).json("You can update  your account only!");
  // }
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
    const token = req.query.token;
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
      message: "Email verified successfully"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Unexpected error"
    });
  }
};
exports.verifyEmail = verifyEmail;
//# sourceMappingURL=userContoller.js.map