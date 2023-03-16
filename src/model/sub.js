import mongoose from "mongoose";

const subSchema = new mongoose.Schema({
  sub: {
    type: String,
    required: true,
  },
});
export default mongoose.model("subModel", subSchema);
