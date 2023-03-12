"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _bookUserController = require("../Controller/bookUserController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
//CREATE
router.post("/createbook/:userId", _bookUserController.createbooking);

//UPDATE
router.put("/:id", _bookUserController.updatebook);
//DELETE
router.delete("/:id", _bookUserController.deletebook);
//GET ALL
router.get('/:id', _bookUserController.getbook);
router.get("/", _bookUserController.getbooks);
var _default = router;
exports.default = _default;
//# sourceMappingURL=bookUseRoute.js.map