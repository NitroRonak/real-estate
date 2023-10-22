import User from "../model/user-model.js";
import bcrypt from 'bcryptjs';
export const signup=async (req,res,next)=>{
    const {username,email,password}=req.body;
    try{
        const hashPassword=await bcrypt.hash(password,10);
        const user = new User({
            username,
            email,
            password: hashPassword, 
        });
        await user.save();
        res.status(201).json({
            success: true,
            message: "User saved successfully"
        })
    }
    catch(error){
        next(error)
    }
}
