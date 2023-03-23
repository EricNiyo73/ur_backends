"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _musthaveAccount = _interopRequireDefault(require("../middlewire/musthaveAccount"));
var _subscribeController = require("../Controller/subscribeController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.post('/addsubscribe/', _subscribeController.createSubscribe);
router.delete('/:id', _subscribeController.unsubscribe);
router.get('/', _subscribeController.findAll);
var _default = router;
exports.default = _default;
//# sourceMappingURL=subscribeRoute.js.map