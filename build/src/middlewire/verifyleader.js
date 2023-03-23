"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _userModel = _interopRequireDefault(require("../model/userModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function Authorization(req, res, next) {
  try {
    // console.log(req.headers);
    const token = req.headers.authorization;
    if (token) {
      const decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
      const user = await _userModel.default.findById(decoded.id);
      if (user.role === "Administrative_Assistant") {
        next();
      } else {
        return res.status(401).json({
          message: "Only Administrative assistant is allowed to book a facility"
        });
      }
    } else {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized"
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Invalid token"
    });
  }
}
var _default = Authorization;
exports.default = _default;
//# sourceMappingURL=verifyleader.js.map