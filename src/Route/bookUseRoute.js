import express from "express";
const router = express.Router();
import {
  createbooking,
  deletebook,
  getbook,
  getbooks,
  checkAvailability,
  updatebook,
} from "../Controller/bookUserController";
// import accounts from '../middlewire/musthaveAccount';
import Authorization from '../middlewire/verifyleader';
//CREATE
router.post("/createbook/:userId", Authorization,createbooking);
router.put("/checkAvailability",checkAvailability);
//UPDATE
router.put("/:id", Authorization,updatebook);
//DELETE
router.delete("/:id",deletebook);
//GET ALL
router.get('/:id',getbook);
router.get("/", getbooks);

export default router;