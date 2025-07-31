import express from 'express'
import dotenv from 'dotenv'
import { dbConnect } from './configs/db.js';
import authRouters from './routers/authRouter.js';
import noteRouter from './routers/noteRouter.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
dbConnect();

app.use(express.json());

app.get('/',(req,res) =>{
    res.send("welcome to my new server");
})
app.use('/api/v1/auth',authRouters);
app.use('/api/v1/note',noteRouter);

app.use(errorMiddleware);

app.listen(PORT,(req,res) =>{
    console.log(`server running on http://localhost:${PORT}`)
})