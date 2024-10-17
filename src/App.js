import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Collab from './components/Collab'
import Infopage from './components/Infopage'
import Footer from './components/Footer'

export default function App() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Infopage/>
      <Footer/>
    </div>
  )
}
