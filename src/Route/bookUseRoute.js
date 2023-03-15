import express from "express";
const router = express.Router();
import {
  createbooking,
  deletebook,
  getbook,
  getbooks,
  updatebook,
} from "../Controller/bookUserController";
// import accounts from '../middlewire/musthaveAccount';
import Authorization from '../middlewire/verifyleader';
//CREATE
router.post("/createbook/:userId", Authorization,createbooking);

//UPDATE
router.put("/:id", Authorization,updatebook);
//DELETE
router.delete("/:id", Authorization,deletebook);
//GET ALL
router.get('/:id',getbook);
router.get("/", getbooks);

export default router;