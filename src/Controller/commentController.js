import  Router  from 'express';
const router = Router();
import bodyParser from 'body-parser';
import News from "../model/newsModel.js";
import dotenv from 'dotenv';
import Comment from '../model/Comment.js';
dotenv.config();
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json());



// ==============================add comments on a news==================================

 
 
  export const addcomment = async (req, res, next) => {
    const id = req.params.id;
  
    try {
      const newsi = await News.findById(id);
      if (!newsi) {
        return res.status(404).json({ message: 'news not found' });
      }
  
      const comment = {
        text: req.body.text,
      };
      const savedComment = await Comment.create(comment);
      newsi.comments.push(savedComment);
      const savednews = await newsi.save();
  
      return res.status(201).json(savednews);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

// ======================delete a comment =================

export const deletecomment = async (req, res, next) => {
    const newsId = req.params.newsId;
    const commentId = req.params.commentId;
  
    try {
      const news = await News.findById(newsId);
  
      if (!news) {
        return res.status(404).json({ message: 'News not found' });
      }
  
      news.comments = news.comments.filter((comment) => comment._id.toString() !== commentId);
  
      await news.save();
  
      return res.json(news);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };
  



// ===========================count comments===========================
export const countComments = async (req, res) => {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).send({ status: "fail", message: "news not found" });
    }
  
    const commentCount = news.comments.length;
  
    res.status(200).send({
      status: "success",
      message: `news has ${commentCount} comments.`,
    });
  };