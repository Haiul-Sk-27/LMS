import express from 'express';
import dotenv from 'dotenv';
import connectDb from './utils/db.js';
import userRoute from './routes/user.routes.js';
import courseRoute from './routes/course.route.js';
import mediaRoute from './routes/media.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: "https://lms-mra8z7b29-haiul-sks-projects-06d106b8.vercel.app",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// // Static file serving
// app.use("/uploads/profilePics", express.static(path.join(process.cwd(), "uploads/profilePic")));

app.use("/uploads/thumbnails", express.static(path.join(process.cwd(), "uploads/thumbnails")));


// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/media", mediaRoute);

// Connect to DB and start server
connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`✅ Server listening on port ${PORT}`);
        });
    })
    .catch(err => console.error("❌ Database connection failed", err));
