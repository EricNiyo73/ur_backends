import mongoose from "mongoose";
const myDate = new Date();
const date = myDate.toUTCString();

const eventSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  eventTitle: {
    type: String,
    rquired: true,
  },
  eventContent: {
    type: String,
  },
  eventImage: {
    type: String,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  date: {
    type: String,
    default: `${date}`,
  },
});

export default mongoose.model("eventModel", eventSchema);
