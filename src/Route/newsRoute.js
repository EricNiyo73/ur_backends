import express from "express";
import {
  createNews,
  upload,
  findAll,
  getOne,
  deleteNews,
  updateNews,
  addComment,
} from "../Controller/newsController";
// import accounts from '../middlewire/musthaveAccount'
import Authorization from "../middlewire/verifySpecialUser";
import LoginAuth from "../middlewire/musthaveAccount";
const router = express.Router();

router.post("/create", upload.single("newsImage"), Authorization, createNews);
router.get("/", findAll);
router.get("/:id", getOne);
router.delete("/:id", Authorization, deleteNews);
router.put("/:id", upload.single("newsImage"), Authorization, updateNews);
router.put("/addComment/:id",LoginAuth,addComment);

export default router;
