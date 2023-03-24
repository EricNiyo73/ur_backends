import mongoose from "mongoose";
const myDate = new Date();
const date = myDate.toUTCString();

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
    type: String,
    default: `${date}`,
  },
});
export default mongoose.model("Subscribe", subscribe);
