"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = exports.updateNews = exports.getOne = exports.findAll = exports.deleteNews = exports.default = exports.createNews = void 0;
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _newsModel = _interopRequireDefault(require("../model/newsModel.js"));
var _multer = _interopRequireDefault(require("multer"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _cloudinary = require("cloudinary");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import router from "express".Router();

const router = (0, _express.default)();
const path = require("path");
_dotenv.default.config();
const app = (0, _express.default)();
// console.log(path.join(process.cwd(), "/images"));
router.use("/images", _express.default.static(path.join(process.cwd(), "/images")));
router.use(_bodyParser.default.urlencoded({
  extended: true
}));
router.use(_bodyParser.default.json());

// ============Claudinary configuration=================

_cloudinary.v2.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
let upload = (0, _multer.default)({
  storage: _multer.default.diskStorage({}),
  fileFilter: (req, file, cb) => {
    try {
      let ext = path.extname(file.originalname);
      if (ext !== ".JPG" && ext !== ".JPEG" && ext !== ".PNG" && ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        return cb(new Error("File type is not supported"), false);
      }
      cb(null, true);
    } catch (error) {
      return cb(error, false);
    }
  }
});
// =============================Create a News=====================
exports.upload = upload;
const createNews = async (req, res) => {
  try {
    if (!req.file) return res.send('Please upload a file');
    const result = await _cloudinary.v2.uploader.upload(req.file.path);
    console.log("Request File: ", req.file);
    const newNews = new _newsModel.default({
      newsImage: result.secure_url,
      newsTitle: req.body.newsTitle,
      newsContent: req.body.newsContent,
      category: req.body.category
    });
    const saveNews = await newNews.save();
    return res.status(200).json({
      saveNews,
      status: "your news was successfully uploaded"
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// =====================get All news======================
exports.createNews = createNews;
const findAll = async (req, res) => {
  const catName = req.query.cat;
  try {
    let news;
    if (catName) {
      news = await _newsModel.default.find({
        category: {
          $in: [catName]
        }
      });
    } else {
      news = await _newsModel.default.find();
    }
    return res.status(200).json({
      data: news
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};
// export const findAll = async (req, res) => {
//   try{
//   const news = await News.find();

//     return res.status(200).json({
//       data: news
//     });
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// };

// =====================get One news================================
exports.findAll = findAll;
const getOne = async (req, res) => {
  try {
    const news = await _newsModel.default.findById(req.params.id);
    return res.status(200).json(news);
  } catch (err) {
    return res.status(500).json(err);
  }
};
// ======================Delete==============================
exports.getOne = getOne;
const deleteNews = async (req, res) => {
  try {
    const news = await _newsModel.default.findById(req.params.id);
    try {
      await news.delete();
      return res.status(200).json("news has been deleted...");
    } catch (err) {
      return res.status(500).json(err);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

// ===============Update=============================
exports.deleteNews = deleteNews;
const updateNews = async (req, res) => {
  try {
    const updatedNews = await _newsModel.default.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {
      new: true
    });
    return res.status(200).json(updatedNews);
  } catch (err) {
    res.status(500).json(err);
  }
  ;
};
exports.updateNews = updateNews;
var _default = router;
exports.default = _default;
//# sourceMappingURL=newsController.js.map