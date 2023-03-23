"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Approve = Approve;
exports.createFacilityMiddleware = createFacilityMiddleware;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _userModel = _interopRequireDefault(require("../model/userModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function createFacilityMiddleware(req, res, next) {
  try {
    // console.log(req.headers);
    const token = req.headers.authorization;
    if (token) {
      const decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
      const user = await _userModel.default.findById(decoded.id);
      if (user.role === "Manager") {
        next();
      } else {
        return res.status(403).json({
          message: "Only Manager can create a facility"
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
async function Approve(req, res, next) {
  try {} catch (error) {}
}
//# sourceMappingURL=approvalandcreateFacilityMiddleware.js.map