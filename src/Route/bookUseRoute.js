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
  cancelbooking,
} from "../Controller/bookUserController";
// import accounts from '../middlewire/musthaveAccount';
import Authorization from "../middlewire/Administrative";
//CREATE
router.post("/createbook/", Authorization, createbooking);
router.put("/checkAvailability", checkAvailability);
//UPDATE
router.put("/:id", Authorization, updatebook);
router.patch("/cancel/:id", Authorization, cancelbooking);
//DELETE
router.delete("/book/deleteManyBooking", deleteAll);

//GET ALL
router.get("/:id", getbook);
router.get("/", getbooks);

export default router;
