import mongoose from "mongoose";

const myDate = new Date();
const date = myDate.toUTCString();

const bookAdminSchema = new mongoose.Schema({
  facilityname: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    default: "No description",
  },
  image: {
    type: Array,
  },
  contactPersonName: {
    type: String,
    required: true,
  },
  maxcapacity: {
    type: Number,
    required: true,
  },
  managerId: {
    type: String,
  },
  date: {
    type: String,
    default: `${date}`,
  },
});
export default mongoose.model("bookAdmin", bookAdminSchema);
