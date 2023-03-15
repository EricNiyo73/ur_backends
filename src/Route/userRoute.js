import express from "express";
import {
  createUser,
  login,
  getAll,
  getOne,
  updateUser,
  deleteUser,
   verifyEmail,
} from "../Controller/userContoller";
const router = express.Router();
router.post("/signup", createUser);
router.post("/login", login);
router.get("/:id", getOne);
router.get("/", getAll);
router.get("/verify-email/", verifyEmail);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
export default router;
