"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const subSchema = new _mongoose.default.Schema({
  sub: {
    type: String,
    required: true
  }
});
var _default = _mongoose.default.model("subModel", subSchema);
exports.default = _default;
//# sourceMappingURL=sub.js.map