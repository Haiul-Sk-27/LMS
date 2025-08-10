import React from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'

const CourseCard = ({course}) => {
  return (
    <Card className="bg-white shadow-lg">
        <img src={course.image} alt=""  className='w-full h-30 object-cover'/>
        <div className='p-3'>
            <h2 className='text-xl font-semibold text-gray-800 mb-1'>{course.title}</h2>
            <p className='text-gray-600 mb-2'>{course.description}</p>
            <Button>Learn More</Button>
        </div>
    </Card>
  )
}

export default CourseCard