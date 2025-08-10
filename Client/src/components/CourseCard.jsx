import React from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'

const CourseCard = ({course}) => {
  return (
    <Card className="bg-white border-none w-64 h-75">
        <img src={course.image} alt=""  className='w-full h-30 object-cover'/>
        <div>
            <h2 className='text-xl font-semibold text-gray-800 mb-1 truncate'>{course.title}</h2>
            <p className='text-gray-600 mb-1 line-clamp-2'>{course.description}</p>
            <Button className="bg-blue-300">Learn More</Button>
        </div>
    </Card>
  )
}

export default CourseCard