"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const commentSchema = new _mongoose.default.Schema({
  text: {
    type: String,
    required: true
  }
});
var _default = _mongoose.default.model("commentsr", commentSchema);
exports.default = _default;
//# sourceMappingURL=Comment.js.map