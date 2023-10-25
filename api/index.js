import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';
import authRoute from "./routes/authRoute.js"
import userRoute from './routes/userRoute.js'
dotenv.config();
mongoose.connect(process.env.DB_URL)
.then(()=>console.log("Connected to Database"))
.catch((err)=>console.log(err));
const app = express();
app.use(express.json());
app.use(cookieParser());
app.listen(3000,()=>{
    console.log('listening on port 3000');
})
app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})