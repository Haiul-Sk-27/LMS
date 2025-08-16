import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads/profile";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// // Profile upload directory
// const profileDir = path.join(__dirname, 'uploads', 'profile');
// if (!fs.existsSync(profileDir)) fs.mkdirSync(profileDir, { recursive: true });

// // Course upload directory
// const courseDir = path.join(__dirname, 'uploads', 'course');
// if (!fs.existsSync(courseDir)) fs.mkdirSync(courseDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const username = req.body.name?.replace(/\s+/g, "_").toLowerCase() || "user";
    const date = new Date().toISOString().split("T")[0];
    cb(null, `${username}_${date}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg, .jpg, .png files are allowed!"));
  }
};

const uploadProfilePic = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Max 2MB
  fileFilter,
});

export default uploadProfilePic;
