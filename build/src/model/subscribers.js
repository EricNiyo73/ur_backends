"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const subscribe = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  dateSubscribed: {
    type: Date,
    default: Date.now
  }
});
var _default = _mongoose.default.model("Subscribe", subscribe);
exports.default = _default;
//# sourceMappingURL=subscribers.js.map