import express from "express";
import { uploadVideo } from "../middleware/multer-video.js";

const router = express.Router();

router.post("/upload-video", (req, res) => {
  uploadVideo(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No video file uploaded" });
    }

    res.status(200).json({
      success: true,
      message: "Video uploaded successfully",
      filePath: `/uploads/videos/${req.file.filename}`, 
    });
  });
});

export default router;