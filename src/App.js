import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Signup from './components/Signup'
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from './components/Login'
import AddProject from './components/AddProject'
import Contact from './components/Contact'
import Aboutus from './components/Aboutus'

export default function App() {
  return (
    <div className='dark:bg-gray-900 bg-gradient-to-b from-blue-950/[.19] via-transparent'>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Hero/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/AddProject' element={<AddProject/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/about' element={<Aboutus/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}
