import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name required"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password required"],
    },
  },
  { timestamps: true }
);

export const user = mongoose.model("user", userSchema);
