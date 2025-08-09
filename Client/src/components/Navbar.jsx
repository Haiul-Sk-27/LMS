import { GraduationCap } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from 'react-router-dom';


const Navbar = () => {

    const user = false;
    return (
        <div className='bg-gray-900 z-50 w-full fixed top-0 p-2'>
            <div className='max-w-7xl mx-auto flex justify-between'>
                {/*Logo Section*/}
                <Link to='/'>
                    <div className='flex'>
                    <GraduationCap className='text-gray-300 w-10 h-10' />
                    <h1 className='text-gray-300 font-bold text-3xl'>Logo</h1>
                </div>
                </Link>

                {/*Menu Section*/}
                <nav>
                    <ul className='flex gap-7 text-xl items-center font-semibold text-white'>
                        <Link to='/'>Home</Link>
                        <Link to='/course'>Course</Link>
                        {
                            !user ? (
                                <div className='flex gap-3'>
                                    <Link to='/login'><Button className='bg-blue-500 hover:bg-blue-600'>Login</Button></Link>
                                    <Link to='/signup'><Button className="bg-gray-700 hover:bg-gray-800">SignUp</Button></Link>
                                </div>
                            ) : (
                                <div className='flex items-center gap-7'>
                                    <Avatar>
                                        <AvatarImage
                                            src="https://github.com/shadcn.png"
                                            alt="@evilrabbit"
                                        />
                                        <AvatarFallback>ER</AvatarFallback>
                                    </Avatar>

                                    <Button className="bg-blue-500 hover:bg-blue-600">Logout</Button>
                                </div>
                            )
                        }
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navbar