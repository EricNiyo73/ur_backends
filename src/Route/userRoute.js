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
router.post("/signupMany", createmany);
router.delete("/deleteMany", deleteAll);
router.post("/login", login);
router.get("/:id", getOne);
router.get("/", getAll);
router.get("/verify-email/:token", verifyEmail);
router.put("/:id", upload.single("userImage"), updateUser);
router.delete("/:id", deleteUser);
export default router;
