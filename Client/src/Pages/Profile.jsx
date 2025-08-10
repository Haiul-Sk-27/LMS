import React from 'react';
import userLogo from '../assets/user.jpg'
import { Button } from '@/components/ui/button';

const Profile = () => {
  return (
    <div className='bg-gray-100 py-12 px-4 lg:px-0'>
        <div className='max-w-6xl mx-auto p-8 bg-gradient-to-r bg-white shadow-xl rounded-2xl mt-14'>
            <div className='flex flex-col items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-12'>
            {/*Profile picture*/}
            <div className='w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg'>
                <img src={userLogo} alt="" className='w-full h-full object-cover' />
            </div>

            {/*user info*/}
            <div className='text-center md:text-left'>
                <h1 className='text-4xl font-bold text-blue-500'>Welcome,user</h1>
                <p className='text-lg text-gray-600 mt-3'><span className='font-bold '>Email:</span>haiulsk017@gmail.com</p>
                <p className='text-gray-600 my-1 capitalize'><span className="font-bold">Role:</span><span>Instructor</span></p>
                <p className='text-gray-700 text-base leading-relaxed mb-3'><span className='font-bold'>Bio:</span>Add your bio</p>
                <Button className='bg-blue-500 text-white'>Edit Profile</Button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Profile