"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const newsSchema = new _mongoose.default.Schema({
  newsTitle: {
    type: String,
    required: true,
    unique: true
  },
  newsContent: {
    type: String,
    required: false
  },
  newsImage: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
var _default = _mongoose.default.model('newsModel', newsSchema);
exports.default = _default;
//# sourceMappingURL=newsModel.js.map