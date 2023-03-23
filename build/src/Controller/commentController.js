"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletecomment = exports.countComments = exports.addcomment = void 0;
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _newsModel = _interopRequireDefault(require("../model/newsModel.js"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _Comment = _interopRequireDefault(require("../model/Comment.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = (0, _express.default)();
_dotenv.default.config();
router.use(_bodyParser.default.urlencoded({
  extended: true
}));
router.use(_bodyParser.default.json());

// ==============================add comments on a news==================================

const addcomment = async (req, res, next) => {
  const id = req.params.id;
  try {
    const newsi = await _newsModel.default.findById(id);
    if (!newsi) {
      return res.status(404).json({
        message: 'news not found'
      });
    }
    const comment = {
      text: req.body.text
    };
    const savedComment = await _Comment.default.create(comment);
    newsi.comments.push(savedComment);
    const savednews = await newsi.save();
    return res.status(201).json(savednews);
  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
};

// ======================delete a comment =================
exports.addcomment = addcomment;
const deletecomment = async (req, res, next) => {
  const newsId = req.params.newsId;
  const commentId = req.params.commentId;
  try {
    const news = await _newsModel.default.findById(newsId);
    if (!news) {
      return res.status(404).json({
        message: 'News not found'
      });
    }
    news.comments = news.comments.filter(comment => comment._id.toString() !== commentId);
    await news.save();
    return res.json(news);
  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
};

// ===========================count comments===========================
exports.deletecomment = deletecomment;
const countComments = async (req, res) => {
  const news = await _newsModel.default.findById(req.params.id);
  if (!news) {
    return res.status(404).send({
      status: "fail",
      message: "news not found"
    });
  }
  const commentCount = news.comments.length;
  res.status(200).send({
    status: "success",
    message: `news has ${commentCount} comments.`
  });
};
exports.countComments = countComments;
//# sourceMappingURL=commentController.js.map