import mongoose, { Schema, Types } from "mongoose";  // استبدال require بـ import

const tokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
  isvalid: {
    type: Boolean,
    default: true,
  },
  agent: {
    type: String,
  },
}, { timestamps: true });

export const Token = mongoose.model("Token", tokenSchema);
