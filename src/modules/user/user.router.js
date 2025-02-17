import { Router } from "express"; 
import { asyncHandler } from "../../Utils/asyncHandler.js";
import * as userController from "./user.controller.js"; 
import { isauthenticated } from "../../middleware/auth.middleware.js";
const router = Router(); 


router.post("/signup", userController.signup); 
router.post("/login", userController.login);
router.post("/logout", isauthenticated,userController.logout);
export default router; 
