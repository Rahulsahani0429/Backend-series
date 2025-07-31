import jwt from 'jsonwebtoken'

const authMiddleware = (req,res,next) =>{
    const token = req.header('Authorization')
    if(!token){
        return res.status(401).json({msg:"no token, access denied"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.userId;
        next();

    } catch (error) {
        res.status(401).json({msg:"invalid token"})
    }
};
export default authMiddleware;

