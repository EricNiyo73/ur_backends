import express from "express";
import {createEvent,upload,findAll,getOne,deleteEvent,updateEvent} from '../Controller/eventsController';
import accounts from '../middlewire/musthaveAccount'
const router = express.Router();

router.post('/create',upload.single("eventImage"),accounts, createEvent);
router.get('/',accounts,findAll);
router.get('/:id',accounts,getOne);
router.delete('/:id',accounts,deleteEvent);
router.put('/:id',accounts,updateEvent);
export default router;