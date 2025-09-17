import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        `https://lms-yuq1.onrender.com/api/v1/user/reset-password/${token}`,
        { password },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success(response.data.message || "Password reset successfully!");
      navigate("/login"); // redirect after success
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-white shadow-lg rounded-lg p-8 max-w-md w-full space-y-6'>
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>

          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;