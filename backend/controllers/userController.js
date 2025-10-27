import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bycrypt from 'bcrypt'
import validator from 'validator'

//login user
const loginUser = async(req,res)=>{

}

//register user
const registerUser = async(req,res)=>{
    const {name,password,email} = req.body;
    try {
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.json({success:false,message:"User alreadt exists"})
        }

        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"Please enter a valid email"})
        }

        if (password.length < 8) {
            return res.json({success:false,message:"Please enter a strong password"})
        }

        //Hàm băm cho mật khẩu
        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password,salt);
        
        const newUser = new userModel({
            name : name,
            email: email,
            password : hashedPassword,
        })
    } catch (error) {
        
    }
}

export {loginUser,registerUser}

