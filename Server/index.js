import express from 'express';
import dotenv from 'dotenv';
import connectDb from './utils/db.js';
import userRoute from './routes/user.routes.js'

dotenv.config();

const app = express();

const PORT = process.env.PORT;

// app.get('/',(req,res) =>{
//     console.log("Hello World")
// })
app.use(express.json());

app.use("/api/v1/user",userRoute);

app.listen(PORT,() =>{
    connectDb()
    console.log(`Server listening on port ${PORT}`)
})