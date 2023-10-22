import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv"
import authRoute from "./routes/authRoute.js"
dotenv.config();
mongoose.connect(process.env.DB_URL)
.then(()=>console.log("Connected to Database"))
.catch((err)=>console.log(err));
const app = express();
app.use(express.json());
app.listen(3000,()=>{
    console.log('listening on port 3000');
})
app.use("/api/auth",authRoute);
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})