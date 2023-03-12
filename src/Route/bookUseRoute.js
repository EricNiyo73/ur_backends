import express from "express";
const router = express.Router();
import {
  createbooking,
  deletebook,
  getbook,
  getbooks,
  updatebook,
  updatebookAvailability,
} from "../Controller/bookUserController";
//CREATE
router.post("/createbook/:userId", createbooking);

//UPDATE
router.put("/:id", updatebook);
//DELETE
router.delete("/:id", deletebook);
//GET ALL
router.get('/:id',getbook);
router.get("/", getbooks);

export default router;