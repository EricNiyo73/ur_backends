import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  userImage: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  fullname: {
    type: String,
    unique: true,
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
    default: "urhuye@123",
    minLength: 5,
  },
  emailToken: {
    type: String,
    required: true,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    enum: [true, false],
    default: false,
  },
  role: {
    type: String,
    enum: [
      "Tecnical_Support",
      "Administrative_Assistant",
      "Manager",
      "Special_user",
    ],
    default: "Tecnical_Support",
  },
  date: {
    type: String,
    default: Date.now,
  },
});

// userSchema.pre("save", async function (next) {
//   const user = this;
//   if (!user.isModified("password")) return next();
//   user.password = await bcrypt.hash(user.password, 10);
//   next();
// });

export default mongoose.model("userModel", userSchema);
