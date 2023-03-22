import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userImage: {
    type: String,
    default:"profile.jpg"
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  emailToken: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    enum: [true, false],
    default: false,
  },
  role: {
    type: String,
    enum: ["user", "admin", "leader"],
    default: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("userModel", userSchema);
