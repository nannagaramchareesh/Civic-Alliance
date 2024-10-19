import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className='dark:bg-gray-900'>
      <Navbar/>
      <Hero/>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
      <Features/>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
      <Footer/>
    </div>
  )
}
