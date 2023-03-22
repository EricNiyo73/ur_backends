import express from "express";
import {createNews,upload,findAll,getOne,deleteNews,updateNews} from '../Controller/newsController';
// import accounts from '../middlewire/musthaveAccount'
import Authorization from '../middlewire/verifyAdmin';
const router = express.Router();


router.post('/create',upload.single("newsImage"),Authorization,createNews);
router.get('/',findAll);
router.get('/:id',getOne);
router.delete('/:id',Authorization,deleteNews);
router.put('/:id',upload.single("newsImage"),Authorization,updateNews);
export default router;