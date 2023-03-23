"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const bookAdminSchema = new _mongoose.default.Schema({
  facilityname: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    default: "No description"
  },
  image: {
    type: Array
  },
  contactPersonName: {
    type: String,
    required: true
  },
  maxcapacity: {
    type: Number,
    required: true
  },
  managerId: {
    type: String,
    required: true
  }
});
var _default = _mongoose.default.model("bookAdmin", bookAdminSchema);
exports.default = _default;
//# sourceMappingURL=AdminModel.js.map