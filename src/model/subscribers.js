import mongoose from "mongoose";

const subscribe = new mongoose.Schema({
    name: {
    type: String,
    required: true,
       },
  email: {
    type: String,
    required: true,
       },
  dateSubscribed: {
    type: Date,
    default: Date.now,
  }
});
export default mongoose.model("Subscribe", subscribe);