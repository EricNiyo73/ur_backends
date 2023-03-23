"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _musthaveAccount = _interopRequireDefault(require("../middlewire/musthaveAccount"));
var _commentController = require("../Controller/commentController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.post('/addcomment/:id', _musthaveAccount.default, _commentController.addcomment);
router.delete('/:newsId/:commentId', _musthaveAccount.default, _commentController.deletecomment);
router.get('/count/:id', _musthaveAccount.default, _commentController.countComments);
var _default = router;
exports.default = _default;
//# sourceMappingURL=commentRoute.js.map