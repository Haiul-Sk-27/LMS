import React, { use } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CourseCard = ({course}) => {
  console.log("Course Load?:",course)
  const navigate = useNavigate()
  const {user} = useSelector(store=>store.auth)

  console.log('CourseUSer:',user)
  return (
    <Card key={course._id} className="bg-white shadow-lg mb-3">
      <img src={`https://lms-yuq1.onrender.com${course.courseThumbnail}`} alt="" className='w-full h-48 object-cover'/>
      <div className='p-2'>
        <h2 className='text-xl font-semibold text-gray-800 mb-3'>{course.courseTitle}</h2>
        <p className='text-gray-800 mb-4'>{course.subTitle}</p>
        <Button onClick={()=>navigate(user ? `/courses/${course._id}`:"/login")}>Learn More</Button>
      </div>
    </Card>
  )
}

export default CourseCard