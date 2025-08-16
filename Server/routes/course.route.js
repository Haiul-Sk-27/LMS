import express from 'express'
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { createCourse, editCourse,  getCourseById, getCreatorCourses, getPublishedCourse} from '../controllers/course.controller.js';
import uploadProfilePic from '../middleware/multer.js';

const router = express.Router();

router.post('/',isAuthenticated,createCourse);
router.get('/published-courses',getPublishedCourse);
router.get('/',isAuthenticated,getCreatorCourses);
router.put("/course/:courseId", uploadProfilePic.single("courseThumbnail"), editCourse);
router.get("/:courseId",isAuthenticated,getCourseById);

export default router