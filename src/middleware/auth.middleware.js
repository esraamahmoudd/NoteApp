import jwt from "jsonwebtoken";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { User } from "../../DB/models/user.models.js";
import { Token } from "../../DB/models/token.models.js";

import dotenv from "dotenv";
dotenv.config();
export const isauthenticated = async (req, res, next) => {
    let { token } = req.headers;
    
    if (!token) return next(new Error("Token required"));

    
    //check bearertoken "prefix"
      if(!token.startsWith(process.env.BEARER_KEY)) return next(new Error("invalid token"));

       token = token.split(process.env.BEARER_KEY)[1];

       const tokenDb=await Token.findOne({token,isvalid:true});
       if(!tokenDb) return next(new Error("token expired"));
 

       const payload = jwt.verify(token, process.env.SECRET_KEY
       );

        const isuser = await User.findById(payload.id);
        if (!isuser) return next(new Error("User not found"));

        req.payload = payload;
        
        next();
    
};
