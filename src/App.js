import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Signup from './components/Signup'
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from './components/Login'

export default function App() {
  return (
    <div className='dark:bg-gray-900'>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Hero/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}
