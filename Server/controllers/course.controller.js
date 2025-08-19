import { runInThisContext } from "vm";
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

export const getCourseById = async(req,res) => {
    try{
        const {courseId} = req.params;
        const course = await Course.findById(courseId);

        if(!course){
            return res.status(404).json({
                success:false,
                message:"course not found"
            })
        }

        return res.status(200).json({
            success:true,
            course
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"Failed to course load"
        })
    }
}

//lecture controllers

export const createLecture = async(req, res)=>{
    try {
        const {lectureTitle} = req.body;
        const {courseId} = req.params;

        if(!lectureTitle || !courseId){
            return res.status(400).json({
                message:"Lecture title is required"
            })
        }
        const lecture = await Lecture.create({lectureTitle});
        const course = await Course.findById(courseId);
        if(course){
            course.lectures.push(lecture._id);
            await course.save()
        }
        return res.status(201).json({
            success:true,
            lecture,
            message:"Lecture created successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to create Lecture"
        })
        
    }
}


export const getCourseLecture = async (req, res) => {
    try {
        const {courseId} = req.params;
        const course = await Course.findById(courseId).populate('lectures');
        if(!course){
            return res.status(404).json({
                message:"course not found"
            })
        }
        return res.status(200).json({
            success:true,
            lectures:course.lectures
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to get Lectures"
        })
    }
}

export const editLecture = async (req, res) => {
    try {
        const {lectureTitle, videoInfo, isPreviewFree} = req.body
        const {courseId, lectureId} = req.params;
        const lecture = await Lecture.findById(lectureId);
        if(!lecture){
            return res.status(404).json({
                message:"Lecture not found!"
            })
        }
        //update lecture
        if(lectureTitle) lecture.lectureTitle = lectureTitle;
        if(videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
        if(videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
        lecture.isPreviewFree = isPreviewFree;

        await lecture.save();

        const course = await Course.findById(courseId);
        if(course && !course.lectures.includes(lecture._id)){
            course.lectures.push(lecture._id);
            await course.save()
        }
        return res.status(200).json({
            success:true,
            lecture,
            message:"Lecture updated successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to edit lectures",
            success:false
        })
        
    }
}

export const removeLecture = async (req,res) => {
    try {
        const {lectureId} = req.params;
        const lecture =await lecture.findByIdAndDelete(lectureId);
        if(!lecture){
            return res.status(404).json({
                message:"Lecture not found!"
            })
        }

        //Remove lecture
        await Course.updateOne(
            {lecture:lectureId},
            {$pull:{lecture:lectureId}}
        )
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Failed to remove lecture"
        })
    }
}