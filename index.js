//models>>user ,note =>collection one to many
//sign in sign up 
//crud 
import express from "express"; 
import { connectDB } from './DB/connection.js';
import userRouter from "./src/modules/user/user.router.js"; 
import noteRouter from "./src/modules/note/note.router.js"; 
import dotenv from "dotenv";
dotenv.config();


const app = express(); 
const port = process.env.PORT; 
app.use(express.json()); 
                                        
await connectDB(); 
app.use("/user", userRouter); 
app.use("/note", noteRouter); 
app.all("*",(req,res)=>{
    return res.json({success:false,message:"page not found"})
});

app.use((error,req,res,next)=>{
   // console.log(error)
    return res.json({success:false,message:error.message,stack:error.stack,
});
});



app.listen(port, () => console.log(`Listening on port ${port}`));
