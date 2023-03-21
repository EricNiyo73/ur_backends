import express from "express";
import accounts from '../middlewire/musthaveAccount';
import {createSubscribe} from '../Controller/subscribeController';
const router = express.Router();

router.post('/addsubscribe/',createSubscribe);
// router.delete('/:newsId/:commentId',accounts,deletecomment);
// router.get('/count/:id',accounts,countComments)
export default router;