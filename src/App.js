import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Signup from './components/Signup'
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from './components/Login'
import AddProject from './components/AddProject'
import Contact from './components/Contact'
import Aboutus from './components/Aboutus'
import ViewProjects from './components/ViewProjects'
import { ToastContainer } from 'react-toastify'
export default function App() {
  return (
    <div className='dark:bg-gray-900 bg-gradient-to-b from-blue-950/[.19] via-transparent'>
      <Router>
        <Navbar/>
      <ToastContainer/>
        <Routes>
          <Route path='/' element={<Hero/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/AddProject' element={<AddProject/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/about' element={<Aboutus/>}/>
          <Route path='/viewprojects' element={<ViewProjects/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}
