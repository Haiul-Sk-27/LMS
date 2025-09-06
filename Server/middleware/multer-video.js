import multer from "multer";
import path from "path";
import fs from "fs";

const videoDir = path.join(process.cwd(), "uploads/videos");

// Create uploads/videos directory if it doesn't exist
if (!fs.existsSync(videoDir)) {
  fs.mkdirSync(videoDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, videoDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// Allow only specific video formats
const fileFilter = (req, file, cb) => {
  const allowedExtensions = /mp4|mov|avi|mkv/;
  const extname = allowedExtensions.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (extname) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed (.mp4, .mov, .avi, .mkv)!"));
  }
};

// Export multer middleware
export const uploadVideo = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB max
  fileFilter,
}).single("video");


