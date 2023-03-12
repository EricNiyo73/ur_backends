import express from "express";
import {createEvent,upload,findAll,getOne,deleteEvent,updateEvent} from '../Controller/eventsController';
const router = express.Router();

router.post('/create',upload.single("eventImage"), createEvent);
router.get('/',findAll);
router.get('/:id',getOne);
router.delete('/:id',deleteEvent);
router.put('/:id',updateEvent);
export default router;