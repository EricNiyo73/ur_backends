"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _userContoller = require("../Controller/userContoller");
var _musthaveAccount = _interopRequireDefault(require("../middlewire/musthaveAccount"));
var _verifyAdmin = _interopRequireDefault(require("../middlewire/verifyAdmin"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.post("/signup", _userContoller.createUser);
router.post("/signupMany", _userContoller.createmany);
router.delete("/deleteMany", _userContoller.deleteAll);
router.post("/login", _userContoller.login);
router.get("/:id", _userContoller.getOne);
router.get("/", _userContoller.getAll);
router.get("/verify-email/:token", _userContoller.verifyEmail);
router.put("/:id", _userContoller.upload.single("userImage"), _verifyAdmin.default, _userContoller.updateUser);
router.delete("/:id", _verifyAdmin.default, _userContoller.deleteUser);
var _default = router;
exports.default = _default;
//# sourceMappingURL=userRoute.js.map