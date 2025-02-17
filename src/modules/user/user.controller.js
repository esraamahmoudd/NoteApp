import { User } from "../../../DB/models/user.models.js"; 
import { Token } from "../../../DB/models/token.models.js"; 


import { asyncHandler } from "../../Utils/asyncHandler.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const signup = asyncHandler(async (req, res, next) => {
    const { email, age, password, confirmpassword } = req.body;

    if (password !== confirmpassword) 
        return next(new Error("Passwords do not match!"));
 
    const isUser = await User.findOne({ email });
    if (isUser) return next(new Error("Email already exists"));

    // Hash password
    const hashpassword = bcryptjs.hashSync(password, parseInt(process.env.SALT_ROUND, 10));

    console.log({ hashpassword });
       
    

    const user = await User.create({ email, age, password: hashpassword });
    return res.json({ success: true, message: "User created successfully", user });
});

export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const isuser = await User.findOne({ email });

    if (!isuser) {
        return next(new Error("Email is invalid!"));
    }

    const isMatch = bcryptjs.compareSync(password, isuser.password);
    if (!isMatch) {
        return next(new Error("Password is invalid!"));
    }
    const token =jwt.sign({id:isuser._id,email:isuser.email}, process.env.SECRET_KEY)
    console.log({ token });

   await Token.create({token,
    user:isuser._id,
    agent:req.headers["user-agent"],
   })




    res.status(200).json({ success: true, token });
});


export const logout = asyncHandler(async (req, res, next) => {
    const {token}=req.headers;
    await Token.findOneAndUpdate({token},{isvalid:false});


    res.status(200).json({ success: true, message: "user loged out"});
});