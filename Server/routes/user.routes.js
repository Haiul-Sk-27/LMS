import express from 'express';
import { login, logout, register, updateProfile } from '../controllers/user.controller.js';
import uploadProfilePic from '../middleware/multer.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';

const router = express.Router()

router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout)
router.put("/update-profile",isAuthenticated,uploadProfilePic.single("profilePic"),updateProfile)

export default router;