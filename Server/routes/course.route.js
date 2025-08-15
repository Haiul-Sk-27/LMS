import express from 'express'
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { createCourse, getCreatorCourses, getPublishedCourse } from '../controllers/course.controller.js';

const router = express.Router();

router.post('/',isAuthenticated,createCourse);
router.get('/published-courses',getPublishedCourse);
router.get('/',isAuthenticated,getCreatorCourses);

export default router