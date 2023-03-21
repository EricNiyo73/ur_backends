import express from "express";
import accounts from '../middlewire/musthaveAccount';
import {addcomment,deletecomment,countComments} from '../Controller/commentController';
const router = express.Router();

router.post('/addcomment/:id',accounts,addcomment);
router.delete('/:newsId/:commentId',accounts,deletecomment);
router.get('/count/:id',accounts,countComments)
export default router;