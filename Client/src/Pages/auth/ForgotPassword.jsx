import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3002/api/v1/user/forget-password",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      navigate('/reset-password', { state: { email } });
      toast.success(response.data.message||"Email not exists")
    } catch (error) {
      console.log("Server Error", error);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-white shadow-lg rounded-lg p-8 max-w-md w-full'>
        <h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>Forgot Password</h1>

        <div className='mb-4 flex'>
          <Label className="mb-2 text-lg font-semibold mr-1">Email:</Label>
          <Input
            placeholder="Enter Your Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-base border border-gray-300 rounded"
          />
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded mt-1"
        >
          Forgot Password
        </Button>
      </div>
    </div>
  );
};

export default ForgotPassword;
