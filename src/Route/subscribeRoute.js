import express from "express";
import accounts from '../middlewire/musthaveAccount';
import {createSubscribe,findAll,unsubscribe} from '../Controller/subscribeController';
const router = express.Router();

router.post('/addsubscribe/',createSubscribe);
router.delete('/:id',unsubscribe);
router.get('/',findAll);
export default router;