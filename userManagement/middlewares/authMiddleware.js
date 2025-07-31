
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export const protect = async (req,res, next) =>{
const token = req.headers.authorization?.split(" ")[1];
if(!token){
   return res.status(401).json("msg:token not found")
}
try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    res.user = await User.findById(decoded.id).select('-password')
    next();

} catch (error) {
    return res.status(500).json({msg:"server error"})
}
}