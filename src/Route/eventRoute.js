import express from "express";
import {
  createEvent,
  upload,
  findAll,
  getOne,
  deleteEvent,
  updateEvent,
} from "../Controller/eventsController";
import Authorization from "../middlewire/verifySpecialUser";
const router = express.Router();

router.post("/create", upload.single("eventImage"), Authorization, createEvent);
router.get("/", findAll);
router.get("/:id", getOne);
router.delete("/:id", Authorization, deleteEvent);
router.put("/:id", upload.single("eventImage"), Authorization, updateEvent);
export default router;
