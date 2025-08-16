import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Navbar from "./components/Navbar"
import Course from "./Pages/Course"
import Login from "./Pages/auth/Login"
import Home from "./Pages/Home"
import Signup from "./Pages/auth/Signup"
import Footer from "./components/Footer"
import Profile from "./Pages/Profile"
import Admin from "./Pages/admin/admin"
import Dashbord from "./Pages/admin/Dashbord"
import Courses from "./Pages/admin/Courses"
import CreateCourse from "./Pages/admin/CreateCourse"
import UpdateCourse from "./Pages/admin/UpdateCourse"

const router = createBrowserRouter([
  {
    path:'/',
    element:<><Navbar/><Home/></>
  },
  {
    path:'/course',
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