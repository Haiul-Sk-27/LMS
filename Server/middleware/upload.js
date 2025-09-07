import multer from "multer";
import path from "path";
import fs from "fs";

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const createStorage = (folder) => {
  const dir = path.join(process.cwd(), "uploads", folder);
  ensureDir(dir);

  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const uniqueName =
        Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
      cb(null, uniqueName);
    },
  });
};

export const uploadProfilePic = multer({ storage: createStorage("profilePics") }).single("profilePic");
export const uploadThumbnail = multer({ storage: createStorage("thumbnails") }).single("courseThumbnail");
export const uploadVideo = multer({ storage: createStorage("videos") }).single("video");
