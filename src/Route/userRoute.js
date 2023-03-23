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
} from "../Controller/userContoller";
// import accounts from "../middlewire/musthaveAccount";
import Special_user from "../middlewire/verifySpecialUser";
const router = express.Router();
router.post("/signup", createUser);
router.post("/signupMany", Special_user, createmany);
router.delete("/deleteMany", deleteAll);
router.post("/login", login);
router.get("/:id", getOne);
router.get("/", getAll);
router.get("/verify-email/:token", verifyEmail);
router.put("/:id", upload.single("userImage"), Special_user, updateUser);
router.delete("/:id", Special_user, deleteUser);
export default router;
