import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const Signup = () => {
    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <div className='bg-white shadow-lg rounded-lg p-8 max-w-md w-full'>
                <h1 className='text-2xl font-bold text-center text-gray-600 mb-1'>Crate Your Account</h1>
                <p className='text-center text-gray-600 mb-4'>Join us today! It quick and easy</p>

                {/*Name Input*/}
                <div className='mb-4'>
                    <Label>Full Name</Label>
                    <Input placeholder="Enter your full name" className="mt-1"/>
                </div>
                <div className='mb-4'>
                    <Label>Email Address</Label>
                    <Input placeholder="Enter your full name" className="mt-1"/>
                </div>
                <div className='mb-4'>
                    <Label>Password</Label>
                    <Input placeholder="Enter your full name" className="mt-1"/>
                </div>
                <div className='mb-4'>
                    <Label>Role</Label>
                    <RadioGroup defaultValue="option-one" className="flex gap-4 mt-1">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-one" id="option-one" className="h-4 w-4 border-gray-400 text-blue-500 focus:ring-2 focus:ring-blue-500"/>
                            <Label htmlFor="option-one">Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-two" id="option-two" className="h-4 w-4 border-gray-400 text-blue-500 focus:ring-2 focus:ring-blue-500"/>
                            <Label htmlFor="option-two">Instructor</Label>
                        </div>
                    </RadioGroup>
                </div>
                <Button className="w-full bg-blue-500">SignUp</Button>
                <p className='text-center mt-4'>Already have an account? <Link to="/login" className='text-blue-500 hover:underline'>Log in</Link></p>
            </div>
        </div>
    )
}

export default Signup