import mongoose from "mongoose";

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
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("eventModel", eventSchema);
