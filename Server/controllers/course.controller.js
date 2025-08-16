import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";

export const createCourse = async (req,res) =>{
    try{
        const {courseTitle,category} = req.body;
        if(!courseTitle||!category){
            return res.status(400).json({
                message:"Course title and category reequired",
                success:false
            })
        }

        const course = await Course.create({
            courseTitle,
            category,
            creator:req.id
        })

        return res.status(201).json({
            success:true,
            course,
            message:"course create successfully"
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"Failed to create course"
        })
    }
}

export const getPublishedCourse = async(_, res)=>{
    try {
        const courses = await Course.find({isPublished:true}).populate({path:"creator", select:"name photoUrl description"})
        if(!courses){
            return res.status(404).json({
                message:"Course not found"
            })
        }
        return res.status(200).json({
            success:true,
            courses,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Failed to get course",
            success:false
        })
    }
}

export const getCreatorCourses = async (req, res)=>{
    try {
        const userId = req.id;
        const courses = await Course.find({creator:userId}).populate('lectures');
        if(!courses){
            return res.status(404).json({
                message:"Course not found",
                courses:[],
                success:false
            })
        }
        return res.status(200).json({
            success:true,
            courses,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Failed to get course",
            success:false
        })
    }
}

export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { courseTitle, subTitle, description, category, courseLevel, coursePrice } = req.body;
    const file = req.file;

    let course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({
        message: "Course not found!"
      });
    }

    let courseThumbnail;
    if (file) {
      courseThumbnail = `/uploads/course/${file.filename}`;
    }

    const updateData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      ...(courseThumbnail && { courseThumbnail })
    };

    course = await Course.findByIdAndUpdate(courseId, updateData, { new: true });

    return res.status(200).json({
      success: true,
      course,
      message: "Course updated successfully"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update course",
      success: false
    });
  }
};

