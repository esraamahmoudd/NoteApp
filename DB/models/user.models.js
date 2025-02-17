import mongoose from "mongoose"; 
import { Schema, model, Types } from "mongoose";

const userSchema = new Schema( 
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }, 
    age: { type: Number, min: 18, max: 70 }, 
    notes: [{ type: Types.ObjectId, ref: "Note" }] },
  {
    timestamps: true, 
  }
);


export const User = mongoose.model("User", userSchema); 
