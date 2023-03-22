import express from "express";
import {createEvent,upload,findAll,getOne,deleteEvent,updateEvent} from '../Controller/eventsController';
import accounts from '../middlewire/musthaveAccount'
const router = express.Router();

router.post('/create',upload.single("eventImage"),createEvent);
router.get('/',findAll);
router.get('/:id',getOne);
router.delete('/:id',accounts,deleteEvent);
router.put('/:id',upload.single("eventImage"),accounts,updateEvent);
export default router;