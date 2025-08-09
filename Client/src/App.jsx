import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Navbar from "./components/Navbar"
import Course from "./Pages/Course"
import Login from "./Pages/auth/Login"
import Home from "./Pages/Home"
import Signup from "./Pages/auth/Signup"

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
  }
]);

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App