"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _newsController = require("../Controller/newsController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.post('/create', _newsController.upload.single("newsImage"), _newsController.createNews);
router.get('/', _newsController.findAll);
router.get('/:id', _newsController.getOne);
router.delete('/:id', _newsController.deleteNews);
router.put('/:id', _newsController.updateNews);
var _default = router;
exports.default = _default;
//# sourceMappingURL=newsRoute.js.map