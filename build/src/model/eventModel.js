"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const eventSchema = new _mongoose.default.Schema({
  eventTitle: {
    type: String,
    rquired: true
  },
  eventContent: {
    type: String
  },
  eventImage: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});
var _default = _mongoose.default.model('eventModel', eventSchema);
exports.default = _default;
//# sourceMappingURL=eventModel.js.map