"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsubscribe = exports.findAll = exports.createSubscribe = void 0;
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _subscribers = _interopRequireDefault(require("../model/subscribers"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = (0, _express.default)();
const createSubscribe = async (req, res, next) => {
  try {
    const checksub = await _subscribers.default.findOne({
      email: req.body.email
    });
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({
        message: "Invalid email format"
      });
    }
    if (checksub) {
      return res.status(400).json({
        message: "Email already subscribed to this Site"
      });
    } else {
      const newsubscribe = new _subscribers.default({
        name: req.body.name,
        email: req.body.email
      });
      const subscri = await newsubscribe.save();
      return res.status(200).json({
        subscri,
        status: "Subscribe added successfully"
      });
    }
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json(error);
  }
};

// =========================get All subscribers =================
exports.createSubscribe = createSubscribe;
const findAll = async (req, res) => {
  try {
    const suscribe = await _subscribers.default.find();
    return res.status(200).json({
      data: suscribe
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// =================================unsbscribe================================
exports.findAll = findAll;
const unsubscribe = async (req, res) => {
  try {
    const subs = await _subscribers.default.findById(req.params.id);
    try {
      await subs.delete();
      return res.status(200).json("you have successfully unsubscribed");
    } catch (err) {
      return res.status(500).json(err);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};
exports.unsubscribe = unsubscribe;
//# sourceMappingURL=subscribeController.js.map