import React, { use, useState } from 'react';
import userLogo from '../assets/user.jpg'
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { useSelector } from 'react-redux';

const Profile = () => {

  const {user} = useSelector(store => store.auth);
  const {input,setInput} = useState({
    name:user?.email,
    description:user?.description,
    role:user?.photoUrl
  })
  return (
    <div className='bg-gray-100 py-12 px-4 lg:px-0'>
      <div className='max-w-6xl mx-auto p-8 bg-gradient-to-r bg-white shadow-xl rounded-2xl mt-14'>
        <div className='flex flex-col items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-12'>
          {/*Profile picture*/}
          <div className='w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg'>
            <img src={user?.photoUrl || userLogo} alt="" className='w-full h-full object-cover' />
          </div>

          {/*user info*/}
          <div className='text-center md:text-left'>
            <h1 className='text-4xl font-bold text-blue-500'>Welcome,{user.name.split(" ")[0]|| "User"}</h1>
            <p className='text-lg text-gray-600 mt-3'><span className='font-bold '>Email:</span>{user.email||"HaiulSk037@gmail.com"}</p>
            <p className='text-gray-600 my-1 capitalize'><span className="font-bold">Role:</span><span>{user.role}</span></p>
            <p className='text-gray-700 text-base leading-relaxed mb-3'><span className='font-bold'>Bio:</span>{user.description}</p>
            <Dialog className="bg-gray-100">
              <DialogTrigger><Button className='bg-blue-500 text-white'>Edit Profile</Button></DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-gray-100 ">
                <DialogHeader>
                  <DialogTitle className="text-center">Are you absolutely sure?</DialogTitle>
                  <DialogDescription className="text-center">
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>

                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label html="name" className='text-right'>
                    Name
                  </Label>
                  <Input id="name" vlaue={input.name} name="name" className="col-span-3 text-gray-500"/>
                </div>

                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label html="name" className='text-right'>
                    Description
                  </Label>
                  <Input id="name" vlaue={input.description} name="name" className="col-span-3 text-gray-500"/>
                </div>

                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label html="name" className='text-right'>
                    Picture
                  </Label>
                  <Input id="file" type="file" accept="image/*" className="w-[277px]"/>
                </div>

                <DialogFooter>
                  <Button  className="bg-gray-900 text-white">Save Change</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile