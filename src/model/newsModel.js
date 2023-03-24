import mongoose from "mongoose";
const myDate = new Date();
const date = myDate.toUTCString();
console.log(date);
const newsSchema = new mongoose.Schema({
  author: {
    type: Object,
  },
  newsTitle: {
    type: String,
    required: true,
    unique: true,
  },
  newsContent: {
    type: String,
    required: false,
  },
  newsImage: {
    type: String,
    required: false,
  },
  comments: {
    type: Array,
  },
  date: {
    type: String,
    default: `${date}`,
  },
});
export default mongoose.model("newsModel", newsSchema);
