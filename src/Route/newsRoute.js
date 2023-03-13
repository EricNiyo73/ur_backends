import express from "express";
import {createNews,upload,findAll,getOne,deleteNews,updateNews} from '../Controller/newsController';
import accounts from '../middlewire/musthaveAccount'
const router = express.Router();


router.post('/create',upload.single("newsImage"),accounts, createNews);
router.get('/',accounts,findAll);
router.get('/:id',accounts,getOne);
router.delete('/:id',accounts,deleteNews);
router.put('/:id',accounts,updateNews);
export default router;