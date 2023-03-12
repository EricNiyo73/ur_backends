"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _userModel = _interopRequireDefault(require("../model/userModel.js"));
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get("/verify-email", async (req, res) => {
  try {
    const token = req.query.token;
    const user = await _userModel.default.findOne({
      emailToken: token
    });
    if (user) {
      user.emailToken = null;
      user.isVerified = true;
      await user.save();
      console.log("verified");
    } else {
      console.log("email is not verified");
    }
  } catch (err) {
    console.log(err);
  }
});
var _default = router;
exports.default = _default;
//# sourceMappingURL=verifyEmail.js.map