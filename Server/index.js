import express from 'express';
import dotenv from 'dotenv';
import connectDb from './utils/db.js';
import userRoute from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config();

const app = express();

const PORT = process.env.PORT;

// app.get('/',(req,res) =>{
//     console.log("Hello World")
// })
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    Credential:true
}))

app.use("/api/v1/user",userRoute);
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))

app.listen(PORT,() =>{
    connectDb()
    console.log(`Server listening on port ${PORT}`)
})