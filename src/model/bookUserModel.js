import mongoose from "mongoose";

const myDate = new Date();
const date = myDate.toUTCString();

const bookUserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
    },
    email: {
      type: String,
    },
    assistantId: {
      type: String,
      required: true,
    },
    assistantData: {
      type: Object,
      required: true,
    },
    facilityname: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      enum: ["Morning", "Afternoon", "Fullday"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Canceled"],
      default: "Pending",
    },
    rejectionReason: {
      type: String,
    },

    date: {
      type: String,
      default: `${date}`,
    },
  }

  // bookNumbers: [{ number: Number, unavailableDates: {type: [Date]}}],
);

export default mongoose.model("bookUser", bookUserSchema);
