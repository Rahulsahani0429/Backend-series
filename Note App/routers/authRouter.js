import express from 'express';

import { userRegister, userLogin } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/register',userRegister);
authRouter.post('/login',userLogin);
export default authRouter;