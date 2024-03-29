import express from "express";
import {
  createUser,
  login,
  getAll,
  getOne,
  updateUser,
  upload,
  deleteUser,
  verifyEmail,
  createmany,
  deleteAll,
  resetPassword,
  resetPasswordConfirm,
} from "../Controller/userContoller";
// import accounts from "../middlewire/musthaveAccount";
import Special_user from "../middlewire/verifySpecialUser";
import fileupload from "../helpers/multer";
const router = express.Router();
router.post("/signup", createUser);
router.post("/signupMany", createmany);
router.delete("/deleteMany", deleteAll);
router.post("/login", login);
router.get("/:id", getOne);
router.get("/", getAll);
router.get("/verify-email/:token", verifyEmail);
router.post("/reset-password/reset/", resetPassword);
router.post("/reset-password/:token", resetPasswordConfirm);
router.put("/:id", fileupload.single("userImage"), updateUser);
router.delete("/:id", deleteUser);
export default router;
