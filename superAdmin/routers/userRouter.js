import express from 'express'

import { getMyProfile,updateMyProfile,getUserByRole,updateUserById ,deleteById} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { authorizeRole } from '../middlewares/roleMiddleware.js';

const userRouter = express.Router();

userRouter.get('/me',protect,getMyProfile)
userRouter.put('/updateprofile',protect,updateMyProfile)
userRouter.get('/getuserrole',protect,authorizeRole("superadmin","storekeeper","manager",),getUserByRole)
userRouter.put('/:id',protect,authorizeRole("superadmin","storekeeper","manager",),updateUserById)
userRouter.delete('/deleteuser/:id',protect,authorizeRole("superadmin","storekeeper","manager",),deleteById)


export default userRouter;