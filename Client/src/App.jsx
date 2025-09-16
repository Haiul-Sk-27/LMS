import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Navbar from "./components/Navbar"
import Course from "./Pages/Courses"
import Login from "./Pages/auth/Login"
import Home from "./Pages/Home"
import Signup from "./Pages/auth/Signup"
import Footer from "./components/Footer"
import Profile from "./Pages/Profile"
import Admin from "./Pages/admin/Admin"
import Dashbord from "./Pages/admin/Dashbord"
import Courses from "./Pages/admin/Courses"
import CreateCourse from "./Pages/admin/CreateCourse"
import UpdateCourse from "./Pages/admin/UpdateCourse"
import CreateLeacture from "./Pages/admin/CreateLeacture"
import CourseDetails from "./Pages/CourseDetails"
import ForgotPassword from "./Pages/auth/ForgotPassword"
import ResetPassword from "./Pages/auth/ResetPassword"

const router = createBrowserRouter([
  {
    path:'/',
    element:<><Navbar/><Home/></>
  },
  {
    path:'/courses',
    element:<><Navbar/><Course/></>
  },
  {
    path:"/login",
    element:<><Navbar/><Login/></>
  },
  {
    path:"/signup",
    element:<><Navbar/><Signup/></>
  },
  {
    path:"/profile",
    element:<><Navbar/><Profile/></>
  },
  {
    path:"/courses/:courseId",
    element: <><Navbar/><CourseDetails/></>
   },
   {
    path:"/forgot-password",
    element:<><ForgotPassword/></>
   },
   {
    path:"reset-password/:token",
    element:<><ResetPassword/></>
   },
  {
    path:"/admin",
    element:<><Navbar/><Admin/></>,
    children:[
      {
        path: "dashboard",
        element:<Dashbord/>
      },
      {
        path:"course",
        element:<Courses/>
      },
      {
        path:"course/create",
        element:<CreateCourse/>
      },
      {
        path: "course/:courseId",
        element:<UpdateCourse/>
      },
      {
        path: "course/:courseId/leacture",
        element:<CreateLeacture/>
      },
    ]
  }
]);

function App() {

  return (
    <>
      <RouterProvider router={router}/>
      <Footer/>
    </>
  )
}

export default App