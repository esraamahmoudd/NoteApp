import { Router } from "express";
import { asyncHandler } from "../../Utils/asyncHandler.js";
import * as noteController from "./note.controller.js"
import { isauthenticated } from "./../../middleware/auth.middleware.js";

import { Token } from "../../../DB/models/token.models.js"; 

const router =Router();

//create note
router.post("/", isauthenticated,noteController.createnote)
router.patch("/:id",isauthenticated, noteController.updatenote)
router.delete("/:id",isauthenticated,noteController.deletenote)
router.get("/",isauthenticated,asyncHandler(noteController.getallnotes))
router.get("/:id",noteController.getusernotes)
export default router;