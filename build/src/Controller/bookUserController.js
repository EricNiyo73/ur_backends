"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatebook = exports.getbooks = exports.getbook = exports.deletebook = exports.createbooking = exports.checkAvailability = void 0;
var _bookUserModel = _interopRequireDefault(require("../model/bookUserModel.js"));
var _userModel = _interopRequireDefault(require("../model/userModel.js"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// ==============check Availability====================

const checkAvailability = async (req, res) => {
  try {
    const existingBooking = await _bookUserModel.default.findOne({
      subFacility: req.body.subFacility,
      date: req.body.date
    });
    if (existingBooking) {
      if (existingBooking.time === "Morning" && (req.body.time === "Morning" || req.body.time === "Fullday") && existingBooking.status === "Approved") {
        return res.status(403).json("No available booking for the specified date and time1");
      } else if (existingBooking.time === "Afternoon" && (req.body.time === "Afternoon" || req.body.time === "Fullday") && existingBooking.status === "Approved") {
        return res.status(403).json("No available booking for the specified date and time2");
      } else if (existingBooking.time === "Fullday" && (req.body.time === "Afternoon" || req.body.time === "Morning" || req.body.time === "Fullday") && existingBooking.status === "Approved") {
        return res.status(403).json("No available booking for the specified date and time tird");
      } else {
        return res.status(201).json("you can book this book");
      }
    } else {
      return res.status(200).json("you can book now");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
// ==================creation of availability book===========
exports.checkAvailability = checkAvailability;
const createbooking = async (req, res) => {
  console.log(req.body.time);
  try {
    const user = await _userModel.default.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    const existingBooking = await _bookUserModel.default.findOne({
      subFacility: req.body.subFacility,
      date: req.body.date
    });
    if (existingBooking) {
      if (existingBooking.time === "Morning" && (req.body.time === "Morning" || req.body.time === "Fullday") && existingBooking.status === "Approved") {
        return res.status(403).json("No available booking for the specified date and time1");
      } else if (existingBooking.time === "Afternoon" && (req.body.time === "Afternoon" || req.body.time === "Fullday") && existingBooking.status === "Approved") {
        return res.status(403).json("No available booking for the specified date and time2");
      } else if (existingBooking.time === "Fullday" && (req.body.time === "Afternoon" || req.body.time === "Morning" || req.body.time === "Fullday") && existingBooking.status === "Approved") {
        return res.status(403).json("No available booking for the specified date and time tird");
      } else {
        const bookingdata = _objectSpread(_objectSpread({}, req.body), {}, {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email
        });
        // create a new booking
        const booking = new _bookUserModel.default(bookingdata);
        // booking.roomUser = availableBooking._id;

        await booking.save();
        return res.status(200).json({
          message: "Booking request submitted successfully",
          booking
        });
      }
    } else {
      const bookingData = _objectSpread(_objectSpread({}, req.body), {}, {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
      });
      // create a new booking
      const booking = new _bookUserModel.default(bookingData);
      // booking.roomUser = availableBooking._id;

      await booking.save();
      return res.status(200).json({
        message: "Booking request submitted successfully",
        booking
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

// ==================update book==========================
exports.createbooking = createbooking;
const updatebook = async (req, res, next) => {
  try {
    const updatedbook = await _bookUserModel.default.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {
      new: true
    });
    res.status(200).json(updatedbook);
  } catch (err) {
    next(err);
  }
};

//   ==============================delete ==========================
exports.updatebook = updatebook;
const deletebook = async (req, res) => {
  try {
    const booking = await _bookUserModel.default.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({
        status: "failed",
        message: "booking not found"
      });
    }
    return res.status(204).json({
      status: "success",
      data: "booking deleted successfuly"
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      error
    });
  }
};

//   ==============================get one book================================
exports.deletebook = deletebook;
const getbook = async (req, res, next) => {
  try {
    const getbook = await _bookUserModel.default.findById(req.params.id);
    res.status(200).json(getbook);
  } catch (err) {
    next(err);
  }
};
//   ==========================get books availability==========================
exports.getbook = getbook;
const getbooks = async (req, res, next) => {
  try {
    const books = await _bookUserModel.default.find();
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};
exports.getbooks = getbooks;
//# sourceMappingURL=bookUserController.js.map