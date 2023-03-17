"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _changeRole = require("../admin/changeRole");
var _AdminController = require("../Controller/AdminController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
// import accounts from '../middlewire/musthaveAccount';
// import Authorization from '../middlewire/verifyAdmin';
//CREATE
router.post("/create", _AdminController.upload.single("image"), _AdminController.createfacility);

//UPDATE
router.put("/:id", _AdminController.upload.single("image"), _AdminController.updatefacility);
//DELETE
router.delete("/:id", _AdminController.deletefacility);
//GET ALL
router.get("/:id", _AdminController.getfacilit);
router.get("/", _AdminController.getfacility);
router.delete("/facility/:facilityId/:id", _AdminController.deleteSub);
router.put("/facility/:facilityId/:id", _AdminController.upload.single("image"), _AdminController.updateSub);

// change role
router.patch("/Role/:id", _changeRole.userRole);
// appove
router.patch("/booking-requests/:id", _AdminController.bookrequest);
var _default = router;
exports.default = _default;
//# sourceMappingURL=AdminRoute.js.map