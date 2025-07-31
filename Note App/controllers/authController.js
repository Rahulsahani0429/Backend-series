
import bcrypt from 'bcryptjs'
import { tokenGenerate } from '../utils/generateToken.js';
import { User } from '../models/userModel.js';


export const userRegister = async (req,res) => {
   try {
     const {name, email, password} = req.body;
     const userexist = await User.findOne({email});
    
    if(userexist){
        return res.status(400).json({msg:"user already exist", status:false})
    }
    const salt = await bcrypt.genSalt(12)
    const hashpassword = await bcrypt.hash(password, salt);
        const user = await User.create({
    name,
    email,
    password:hashpassword,
    });

    res.status(200).json({
        status:true,
        msg:"User Register successfully",
        token:tokenGenerate(user._id),
        user:{
            id: user._id,
            name:user.name,
            email: user.email,
            
        }
    })

   } catch (error) {
    console.log("coming err", error.message)
    return res.status(500).json({mag:"Server Error", Error:error.message})
   }
}

export const  userLogin = async (req,res) =>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({status:false,msg:"invalid email and password"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(404).json({status:false, msg:"Invalid email and password"})
        
            res.status(200).json({msg:"Login Successfull",
                status:true,
                token: tokenGenerate(user._id),
                user:{
                    id: user._id,
                    name: user.name,
                    email:user.email
                }
                
            });
    } catch (error) {
        return res.status(500).json({msg:"Server Error",status:false, Error:error.message})
    }
}

