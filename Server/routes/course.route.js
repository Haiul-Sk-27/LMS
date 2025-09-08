import express from 'express'
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { createCourse, createLecture, editCourse,  editLecture,  getCourseById, getCourseLecture, getCreatorCourses, getPublishedCourse, removeCourse, removeLecture, togglePublishedCourse} from '../controllers/course.controller.js';
import { uploadThumbnail } from '../middleware/multer-thumbnail.js';
import { uploadVideo } from '../middleware/multer-video.js';

const router = express.Router();

router.post('/',isAuthenticated,createCourse);
router.get('/published-courses',getPublishedCourse);
router.get('/',isAuthenticated,getCreatorCourses);
router.put("/course/:courseId", uploadThumbnail, editCourse);
router.get("/:courseId",isAuthenticated,getCourseById);
router.post("/:courseId/lecture",isAuthenticated,createLecture)
router.delete("/:courseId",isAuthenticated,removeCourse)
router.get("/:courseId/lectures",isAuthenticated,getCourseLecture)
router.put("/:courseId/lecture/:lectureId",isAuthenticated,uploadVideo,editLecture)
router.delete("/:lectureId/lecture",isAuthenticated,removeLecture)
router.patch("/:courseId",togglePublishedCourse)

export default router