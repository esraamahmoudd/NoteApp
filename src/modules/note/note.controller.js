
import { Note } from "../../../DB/models/note.models.js";
import { User } from "../../../DB/models/user.models.js";
import { asyncHandler } from "../../Utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Create note
export const createnote = asyncHandler(async (req, res, next) => {
    const user = req.payload.id; 
    const { content } = req.body;

    // Check user
    const isuser = await User.findById(user);
    if (!isuser) return next(new Error("User not found"));

    // Create note
    await Note.create({ content, user });

    return res.json({ success: true, message: "Note created successfully" });
});


export const updatenote = asyncHandler(async (req, res, next) => {
    const user = req.payload.id; 
    const { id } = req.params; // note id
    const { isCompleted } = req.body; // update field

    // Check user
    const isuser = await User.findById(user);
    if (!isuser) return next(new Error("User not found"));

    // Check note + owner
    const note = await Note.findOneAndUpdate(
        { _id: id, user },
        { $set: { isCompleted } },
        { new: true }
    );

    if (!note) return next(new Error("User or note is invalid"));
    return res.json({ success: true, message: "Note updated successfully", note });
});

// Delete note
export const deletenote = asyncHandler(async (req, res, next) => {
    const user = req.payload.id; 
    const { id } = req.params; // note id

    // Check user
    const isuser = await User.findById(user);
    if (!isuser) return next(new Error("User not found"));

    // Check note
    const isnote = await Note.findById(id);
    if (!isnote) return next(new Error("Note not found"));

    // Check ownership
    if (isnote.user.toString() !== user) {
        return next(new Error("You are not the owner of this note"));
    }

    // Delete note
    await isnote.deleteOne();

    return res.json({ success: true, message: "Note deleted successfully!" });
});

// Get all notes
export const getallnotes = asyncHandler(async (req, res, next) => {
    const notes = await Note.find().populate({ path: "user", select: "email -_id" });

    return res.json({ success: true, results: notes });
});

// Get user notes
export const getusernotes = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    // Check user
    const isuser = await User.findById(id);
    if (!isuser) return next(new Error("User not found"));

    const notes = await Note.find({ user: id });

    return res.json({ success: true, results: notes });
});
