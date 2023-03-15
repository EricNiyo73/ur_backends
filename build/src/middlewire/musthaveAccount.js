"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _userModel = _interopRequireDefault(require("../model/userModel"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
var _default = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const decodedToken = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
      const user = await _userModel.default.findById(decodedToken.id);
      next();
    } else {
      return res.status(401).json({
        message: 'please! create an account'
      });
    }
  } catch (err) {
    return res.status(401).json({
      message: 'Unauthorized,please Login'
    });
  }
};
exports.default = _default;
//# sourceMappingURL=musthaveAccount.js.map