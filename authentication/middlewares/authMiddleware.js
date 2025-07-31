// import jwt from 'jsonwebtoken'

// const authMiddleware = (req,res,next) =>{
//     const token = req.header('Authorization')
//     if(!token){
//         return res.status(400).json({msg:'token not identify'})
//     }
//     try {
//         const decoded = jwt.verify(token,process.env.JWT_SECRETE)
//         req.userId =decoded.userId;
//         req.userRole = decoded.role;
//         next();
//     } catch (error) {
//         res.status(401).json({msg:'Invalid tokem'})
//     }

// }
// export default authMiddleware;

// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const haderToken = req.header("Authorization");
  if (!haderToken)
    return res.status(401).json({ msg: "No token, access denied" });
  const token = haderToken.split(" ")?.[1];
  if (!token) return res.status(401).json({ msg: "No token, access denied" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next(); // आगे route या controller को भेजो
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

export default authMiddleware;
