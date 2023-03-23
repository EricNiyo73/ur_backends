import express from "express";
const router = express.Router();
import {
  createbooking,
  deletebook,
  getbook,
  getbooks,
  checkAvailability,
  updatebook,
  deleteAll,
} from "../Controller/bookUserController";
// import accounts from '../middlewire/musthaveAccount';
import Authorization from "../middlewire/Administrative";
//CREATE
router.post("/createbook/", Authorization, createbooking);
router.put("/checkAvailability", checkAvailability);
//UPDATE
router.put("/:id", Authorization, updatebook);
//DELETE
router.delete("/:id", Authorization, deletebook);
router.delete("/book/deleteManyBooking", deleteAll);

//GET ALL
router.get("/:id", getbook);
router.get("/", getbooks);

export default router;
