import mongoose from "mongoose";

const bookAdminSchema = new mongoose.Schema({
  facilityname: {
    type: String,
    required: true,
    unique: true,
  },
  sub: {
    type: Array,
    required: true,
  },
  desc: {
    type: String,
    default: "No description",
  },
  image: {
    type: String,
  },
});
export default mongoose.model("bookAdmin", bookAdminSchema);
