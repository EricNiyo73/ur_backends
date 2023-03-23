"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const userSchema = new _mongoose.default.Schema({
  userImage: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  },
  fullname: {
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
    default: "urhuye@123",
    minLength: 5
  },
  emailToken: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    enum: [true, false],
    default: false
  },
  role: {
    type: String,
    enum: ["Tecnical_Support", "Administrative_Assistant", "Manager", "Special_user"]
  },
  date: {
    type: Date,
    default: Date.now
  }
});
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  user.password = await _bcrypt.default.hash(user.password, 10);
  next();
});
var _default = _mongoose.default.model("userModel", userSchema);
exports.default = _default;
//# sourceMappingURL=userModel.js.map