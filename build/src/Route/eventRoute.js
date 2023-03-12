"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _eventsController = require("../Controller/eventsController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.post('/create', _eventsController.upload.single("eventImage"), _eventsController.createEvent);
router.get('/', _eventsController.findAll);
router.get('/:id', _eventsController.getOne);
router.delete('/:id', _eventsController.deleteEvent);
router.put('/:id', _eventsController.updateEvent);
var _default = router;
exports.default = _default;
//# sourceMappingURL=eventRoute.js.map