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
} from "../Controller/userContoller";
import accounts from '../middlewire/musthaveAccount'
const router = express.Router();
router.post("/signup", createUser);
router.post("/login", login);
router.get("/:id", getOne);
router.get("/", getAll);
router.get("/verify-email/", verifyEmail);
router.put("/:id",upload.single("userImage"),updateUser);
router.delete("/:id", accounts,deleteUser);
export default router;
