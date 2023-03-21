import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  }
});
export default mongoose.model("commentsr", commentSchema);
