import multer from "multer";
import path from "path";
import fs from "fs";


const thumbnailDir = path.join(process.cwd(), "uploads/thumbnails");

if (!fs.existsSync(thumbnailDir)) {
  fs.mkdirSync(thumbnailDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, thumbnailDir);
  },
  filename: (req, file, cb) => {
    const date = new Date().toISOString().split("T")[0]; 
    const random = Math.floor(Math.random() * 10000); 
    cb(null, `${date}_${random}${path.extname(file.originalname)}`);
  },
});


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

export const uploadThumbnail = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter,
}).single("courseThumbnail"); 
