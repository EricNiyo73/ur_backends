import mongoose from "mongoose";
const bookUserSchema = new mongoose.Schema(
  {
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
      enum: ["Pending", "Approved", "Rejected", "canceled"],
      default: "Pending",
    },
    rejectionReason: {
      type: String,
    },
  },
  { timestamps: true }

  // bookNumbers: [{ number: Number, unavailableDates: {type: [Date]}}],
);

export default mongoose.model("bookUser", bookUserSchema);
