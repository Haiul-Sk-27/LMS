import express from 'express'
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { createCourse, createLecture, editCourse,  editLecture,  getCourseById, getCourseLecture, getCreatorCourses, getPublishedCourse, removeLecture, togglePublishedCourse} from '../controllers/course.controller.js';
import uploadProfilePic from '../middleware/multer.js';

const router = express.Router();

router.post('/',isAuthenticated,createCourse);
router.get('/published-courses',getPublishedCourse);
router.get('/',isAuthenticated,getCreatorCourses);
router.put("/course/:courseId", uploadProfilePic.single("courseThumbnail"), editCourse);
router.get("/:courseId",isAuthenticated,getCourseById);
router.post("/:courseId/lecture",isAuthenticated,createLecture)
router.post("/:courseId/lectures",isAuthenticated,getCourseLecture)
router.put("/:courseId/lecture/:lectureId",isAuthenticated,editLecture)
router.delete("/:courseId/lecture",isAuthenticated,removeLecture)
router.patch("/:courseId",togglePublishedCourse)

export default router