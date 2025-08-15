import express from 'express';
import dotenv from 'dotenv';
import connectDb from './utils/db.js';
import userRoute from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from "path";
import courseRoute from './routes/course.route.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);

app.listen(PORT, () => {
    connectDb();
    console.log(`Server listening on port ${PORT}`);
});