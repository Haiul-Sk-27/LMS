import multer from "multer";
import path from "path";
import fs from "fs";

// Folder for course thumbnails
const thumbnailDir = path.join(process.cwd(), "uploads/thumbnails");

// Create folder if it doesn't exist
if (!fs.existsSync(thumbnailDir)) {
  fs.mkdirSync(thumbnailDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, thumbnailDir);
  },
  filename: (req, file, cb) => {
    const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const random = Math.floor(Math.random() * 10000); // random number 0-9999
    cb(null, `${date}_${random}${path.extname(file.originalname)}`);
  },
});

// File filter: allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (jpg, jpeg, png)"));
  }
};

// Export multer middleware
export const uploadThumbnail = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter,
}).single("courseThumbnail"); // must match frontend field name
