import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  userName:{
    type:String,
    required:true
  },
  image:{
    type:String,
    required:true,
  }
});
export default mongoose.model("comments", commentSchema);
