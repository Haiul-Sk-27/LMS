import CourseCard from '@/components/CourseCard'
import Hero from '@/components/Hero'
import React from 'react'
import { coursesJson } from './Courses'

const Home = () => {
  return (
    <div>
      <Hero />
      <div><h1 className='text-4xl font-bold text-center text-gray-800 mb-3'>Our Courses</h1>
        <p className='text-center text-gray-600 mb-2'>Explore our curated courses to boost your skills and career. Whether you're a beginner or an expert, we have something for everyone</p></div>
      <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
        {
          coursesJson.map((course) => {
          return <CourseCard course={course} />
          })
        }
      </div>
    </div>
  )
}

export default Home