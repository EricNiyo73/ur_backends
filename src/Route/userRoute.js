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
import accounts from '../middlewire/musthaveAccount';
import Authorization from "../middlewire/verifyAdmin"
const router = express.Router();
router.post("/signup", createUser);
router.post("/login", login);
router.get("/:id", getOne);
router.get("/", getAll);
router.get("/verify-email/:token", verifyEmail);
router.put("/:id",upload.single("userImage"),Authorization,updateUser);
router.delete("/:id", Authorization,deleteUser);
export default router;
