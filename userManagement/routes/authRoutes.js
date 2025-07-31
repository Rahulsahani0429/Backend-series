import express from 'express'
import {register,login} from '../controllers/authController.js'

const isauthRouter = express.Router();

isauthRouter.post('/register',register)
isauthRouter.post('/login',login)

export default isauthRouter;



