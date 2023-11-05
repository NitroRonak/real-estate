import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';
import authRoute from "./routes/authRoute.js"
import userRoute from './routes/userRoute.js'
import listingRoute from './routes/listingRoute.js'
import path from 'path'
dotenv.config();
mongoose.connect(process.env.DB_URL)
.then(()=>console.log("Connected to Database"))
.catch((err)=>console.log(err));

const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.listen(3000,()=>{
    console.log('listening on port 3000');
})
app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use('/api/listing',listingRoute);

app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})