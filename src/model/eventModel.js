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
  startTime: {
    type: String,
  },
  endTime: {
    type: Date,
  },
  eventDate: {
    type: Date,
  },
  date: {
    type: Date,
    default: `${date}`,
  },
});

export default mongoose.model("eventModel", eventSchema);
