import React from 'react'
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <div className='bg-white shadow-lg rounded-lg p-8 max-w-md w-full'>
                <h1 className='text-2xl font-bold text-center text-gray-600 mb-1'>Crate Your Account</h1>
                <p className='text-center text-gray-600 mb-4'>Join us today! It quick and easy</p>

                <div className='mb-4'>
                    <Label>Email Address</Label>
                    <Input placeholder="Enter your full name" className="mt-1" />
                </div>
                <div className='mb-4'>
                    <Label>Password</Label>
                    <Input placeholder="Enter your full name" className="mt-1" />
                </div>

                <Button className="w-full bg-blue-500">Login</Button>

                {/*Divider*/}
                <div className='flex items-center my-6'>
                    <hr className='flex-grow border-gray-300'/>
                    <span className='mx-3 text-gray-500'>OR</span>
                    <hr className='flex-grow border-gray-300'/>
                </div>
                <p className='text-center mt-4'>Dont't have an account? <Link to="/signup" className='text-blue-500 hover:underline'>SignUp</Link></p>
            </div>
        </div>
    )
}

export default Login