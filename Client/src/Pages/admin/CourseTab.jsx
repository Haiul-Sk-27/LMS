
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { setCourse } from '@/redux/courseSlice'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner';
import JoditEditor from 'jodit-react'

const CourseTab = () => {
    const params = useParams()
    const id = params.courseId
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {course} = useSelector(store=> store.course)
    const selectCourse = course.find(course => course._id === id)

    const [selectedCourse, setSelectedCourse] = useState(selectCourse)
    const [loading, setLoading] = useState(false)
    const [publish, setPublish] = useState(false)

    const removeCourse = async () => {
        try {
            const res = await axios.delete(`https://lms-yuq1.onrender.com/api/v1/course/${id}`, {withCredentials:true})
            if(res.data.success){{
                toast.success("Remove Successull")
                setSelectedCourse(res.data.message)
                navigate('/admin/course');
            }}
        } catch (error) {
            console.log(error);
        }
    }
    // useEffect(()=>{
    //     getCourseById()
    // })

    const [input, setInput] = useState({
        courseTitle:selectedCourse?.courseTitle,
        subTitle:selectedCourse?.subTitle,
        description:selectedCourse?.description,
        category:selectedCourse?.category,
        courseLevel: selectedCourse?.courseLevel,
        coursePrice: selectedCourse?.coursePrice,
        file:""
    })
    const [previewThumbnail, setPreviewThumbnail] = useState(selectedCourse?.courseThumbnail)

    const changeEventHandler = (e)=> {
        const {name, value} = e.target;
        setInput({...input, [name]:value})
    }

    const selectCategory = (value) => {
        setInput({...input, category:value})
    }

    const selectCourseLevel = (value) => {
        setInput({...input, courseLevel:value})
    }

    //get file
    const selectThumbnail = (e)=> {
        const file = e.target.files?.[0];
        if(file){
            setInput({...input, courseThumbnail:file});
            const fileReader = new FileReader()
            fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
            fileReader.readAsDataURL(file)
        }
    }

    const updateCourseHandler = async () => {
        const formData = new FormData();
        formData.append("courseTitle", input.courseTitle);
        formData.append("subTitle", input.subTitle);
        formData.append("description", input.description);
        formData.append("category", input.category);
        formData.append("courseLevel", input.courseLevel);
        formData.append("coursePrice", input.coursePrice);
        formData.append("courseThumbnail", input.courseThumbnail);

        console.log("FromData:",formData)

        try {
            setLoading(true)
            const res = await axios.put(`https://lms-yuq1.onrender.com/api/v1/course/course/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials:true
            })
            if(res.data.success){
               navigate(`/admin/course/${id}/lecture`);
                toast.success(res.data.message)
                dispatch([...course,setCourse(res.data.course)])
            }
        } catch (error) {
            console.log(error);
            
        } finally{
            setLoading(false)
        }

    }

    const togglePublishUnpublish = async(action) => {
        try {
            const res = await axios.patch(`https://lms-yuq1.onrender.com/api/v1/course/${id}`, {
                params: {
                    action
                },
                withCredentials:true
            })
            if(res.data.success){
                setPublish(!publish)
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    return (
        <Card>
            <CardHeader classname="flex md:flex-row justify-between">
                <div>
                    <CardTitle>Basic Course Information</CardTitle>
                    <CardDescription>
                        Make changes to your courses here. Click save when you're done.
                    </CardDescription>
                </div>
                <div className='space-x-2'>
                    <Button variant="destructive" onClick={()=>togglePublishUnpublish(selectedCourse.isPublished ? "false": "true")} className="bg-gray-700 hover:bg-gray-800">{selectedCourse.isPublished ? "UnPublish": "Publish"}</Button>
                    <Button variant="destructive" onClick={removeCourse} className="bg-gray-700">Remove Course</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className='space-y-4 mt-1'>
                    <div>
                        <Label className='mb-1'>Title</Label>
                        <Input value={input.courseTitle} onChange={changeEventHandler} type="text" name="courseTitle" placeholder="Ex. Fullstack developer" />
                    </div>
                    <div>
                        <Label className="mb-1">Subtitle</Label>
                        <Input value={input.subTitle} onChange={changeEventHandler} type="text" name="subTitle" placeholder="Ex. Become a Fullstack dveloper from zero to hero in 2 months" />
                    </div>
                    {/* <div>
                        <Label className="mb-1">Description</Label>
                       <JoditEditor type="text" value={input.description} onChange={changeEventHandler} placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months" />
                    </div> */}
                    <div className='flex md:flex-row flex-wrap gap-1 items-center md:gap-5'>
                        <div>
                            <Label className="mb-1">Category</Label>
                            <Select defaultValue={input.category} onValueChange={selectCategory}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent className='bg-gray-100'>
                                    <SelectGroup >
                                        <SelectLabel className="hover:bg-gray-700 rounded">Category</SelectLabel>
                                        <SelectItem value="Next Js" className="hover:bg-gray-700 rounded">Next Js</SelectItem>
                                        <SelectItem value="Data Science" className="hover:bg-gray-700 rounded">Data Science</SelectItem>
                                        <SelectItem value="Frontend Development" className="hover:bg-gray-700 rounded">Frontend Development</SelectItem>
                                        <SelectItem value="Backend Development" className="hover:bg-gray-700 rounded">Backend Development</SelectItem>
                                        <SelectItem value="MernStack Development" className="hover:bg-gray-700 rounded">MernStack Development</SelectItem>
                                        <SelectItem value="Javascript" className="hover:bg-gray-700 rounded">Javascript</SelectItem>
                                        <SelectItem value="Python" className="hover:bg-gray-700 rounded">Python</SelectItem>
                                        <SelectItem value="Docker" className="hover:bg-gray-700 rounded">Docker</SelectItem>
                                        <SelectItem value="MongoDB" className="hover:bg-gray-700 rounded">MongoDB</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className="mb-1">Course Level</Label>
                            <Select defaultValue={input.courseLevel} onValueChange={selectCourseLevel}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a course level" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-100">
                                    <SelectGroup>
                                        <SelectLabel className="hover:bg-gray-700 rounded">Course Level</SelectLabel>
                                        <SelectItem value="Beginner" className="hover:bg-gray-700 rounded">Beginner</SelectItem>
                                        <SelectItem value="Medium" className="hover:bg-gray-700 rounded">Medium</SelectItem>
                                        <SelectItem value="Advance" className="hover:bg-gray-700 rounded">Advance</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className="mb-1">Price in (INR)</Label>
                            <Input
                                type="number"
                                name="coursePrice"
                                value={input.coursePrice}
                                onChange={changeEventHandler}
                                placeholder="199"
                                className="w-fit"
                            />
                        </div>
                    </div>
                    <div>
                        <Label className="mb-1">Course Thumbnail</Label>
                        <Input
                            type="file"
                            id="file"
                            onChange={selectThumbnail}
                            placeholder="199"
                            accept="image/*"
                            className="w-fit"
                        />
                        {
                            previewThumbnail && (
                              <img src={previewThumbnail} alt="Thumbnail" className='w-64 my-2'/>
                            )
                        }
                    </div>
                    <div className='flex gap-2'>
                        <Button onClick={()=> navigate('/admin/course')} variant="outline">Cancel</Button>
                        <Button className="bg-gray-800 hover:bg-gray-800" disabled={loading} onClick={updateCourseHandler}>
                            {
                                loading ? (
                                    <>
                                    <Loader2 className='mr-2 w-4 h-4 animate-spin'/>
                                    Please wait
                                    </>
                                ):("Save")
                            }
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default CourseTab