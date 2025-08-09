import React from 'react';

const courses = [
  {
    "id": 1,
    "title": "Full Stack Web Development",
    "description": "Learn HTML, CSS, JavaScript, React, Node.js, and databases to build complete web applications.",
    "image": "/images/courses/fullstack.jpg"
  },
  {
    "id": 2,
    "title": "Data Science & Machine Learning",
    "description": "Master Python, pandas, machine learning models, and data visualization for real-world applications.",
    "image": "/images/courses/datascience.jpg"
  },
  {
    "id": 3,
    "title": "UI/UX Design Fundamentals",
    "description": "Learn user experience principles, wireframing, and Figma design to create engaging interfaces.",
    "image": "/images/courses/uiux.jpg"
  },
  {
    "id": 4,
    "title": "Cybersecurity Essentials",
    "description": "Understand network security, ethical hacking, and tools to protect digital assets.",
    "image": "/images/courses/cybersecurity.jpg"
  },
  {
    "id": 5,
    "title": "Cloud Computing with AWS",
    "description": "Deploy and manage scalable applications on AWS with hands-on cloud computing experience.",
    "image": "/images/courses/aws.jpg"
  }
]


const Course = () => {
  return (
    <div className='bg-gray-100 pt-14'>
      <div className='min-h-screen max-w-7xl max-auto py-10'>
        <div className='px-4'>
          <h1 className='text-4xl font-bold text-center text-gray-800 mb-4'>Our Courses</h1>
          <p>Explore our curated courses to boost your skills and career. Whether you're a beginner or an expert, we have something for everyone</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {
              courses?.map((course) =>{
                <CourseCard course={course}/>
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Course