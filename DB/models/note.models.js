import mongoose from "mongoose"; 
import { Schema,Types,model } from "mongoose";




const noteSchema = new Schema(
  {
    content: { type: String, required: true }, 
    isCompleted: {type: Boolean,default:false}, 
    user:{ type: Types.ObjectId,ref:"User"},
},
  { 
    timestamps: true, 
  }   
);

export const Note = mongoose.model("Note", noteSchema);
