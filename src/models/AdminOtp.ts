import { Schema, model, models } from "mongoose";

const AdminOtpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    codeHash: {
      type: String,
      required: true,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 600, // MongoDB automatically deletes documents after 10 minutes (600 seconds)
    },
  },
  { timestamps: false }
);

export default models.AdminOtp || model("AdminOtp", AdminOtpSchema);
