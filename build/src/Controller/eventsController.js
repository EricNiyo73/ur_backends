"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = exports.updateEvent = exports.getOne = exports.findAll = exports.deleteEvent = exports.default = exports.createEvent = void 0;
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _eventModel = _interopRequireDefault(require("../model/eventModel.js"));
var _multer = _interopRequireDefault(require("multer"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _cloudinary = require("cloudinary");
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _subscribers = _interopRequireDefault(require("../model/subscribers.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const path = require("path");
_dotenv.default.config();
const router = (0, _express.default)();
const app = (0, _express.default)();
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

// =============================Create a Event=====================
exports.upload = upload;
const createEvent = async (req, res) => {
  try {
    // create a notification=============================
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
    if (!req.file) return res.send('Please upload a file');
    console.log("Request: ", req);
    console.log("Request File: ", req.file);
    const result = await _cloudinary.v2.uploader.upload(req.file.path);
    const newevent = new _eventModel.default({
      eventImage: result.secure_url,
      eventTitle: req.body.eventTitle,
      eventContent: req.body.eventContent
    });
    const saveEvent = await newevent.save();

    // ============================================================
    const subscribedUsers = await _subscribers.default.find();
    emailSubject = "New Update on UR Huye Site";
    emailBody = `<p>New Event added on site !!!!!</p>`;
    subscribedUsers.forEach(user => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: emailSubject,
        html: `<p>Dear ${user.name}</p>
    <p>${emailBody}</p>
    <a href="http://${req.headers.host}/events/">Please click on the link to view the Events</a>`
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
      status: "your Event was successfully uploaded"
    });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json(error);
  }
};

//   ==========================get all events========================
exports.createEvent = createEvent;
const findAll = async (req, res) => {
  try {
    const events = await _eventModel.default.find();
    return res.status(200).json({
      data: events
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// =====================get One event================================
exports.findAll = findAll;
const getOne = async (req, res) => {
  try {
    const events = await _eventModel.default.findById(req.params.id);
    return res.status(200).json(events);
  } catch (err) {
    return res.status(500).json(err);
  }
};
// ======================Delete==============================
exports.getOne = getOne;
const deleteEvent = async (req, res) => {
  try {
    const events = await _eventModel.default.findById(req.params.id);
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
exports.deleteEvent = deleteEvent;
const updateEvent = async (req, res) => {
  try {
    const result = await _cloudinary.v2.uploader.upload(req.file.path);
    const updatedEvent = await _eventModel.default.findByIdAndUpdate(req.params.id, {
      eventTitle: req.body.eventTitle,
      eventContent: req.body.eventContent,
      eventImage: result.secure_url
    }, {
      new: true
    });
    return res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json(err);
  }
  ;
};
exports.updateEvent = updateEvent;
var _default = router;
exports.default = _default;
//# sourceMappingURL=eventsController.js.map