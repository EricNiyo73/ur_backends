"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const userSchema = new _mongoose.default.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minLength: 5
  },
  emailToken: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ["user", "admin", "leader"],
    default: "user"
  },
  date: {
    type: Date,
    default: Date.now
  }
});
var _default = _mongoose.default.model("userModel", userSchema);
exports.default = _default;
//# sourceMappingURL=userModel.js.map