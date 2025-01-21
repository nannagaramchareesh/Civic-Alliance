import React from 'react'
import logo from '../images/logo.svg'
import {Link} from 'react-router-dom'

export default function Navbar() {
  return (
    <div>

       <header className="w-full ">
        <nav className=" border-gray-200 py-5 text-xl">
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                <Link to="/" className="flex items-center">
                    <img src={logo} className="h-6 mr-3 sm:h-9" alt="Landwind Logo" />
                    <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">Civic Alliance</span>
                </Link>
             
                <div className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                    <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                            <Link to="/" className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-gray-400 after:transition-all after:duration-300 hover:after:w-full" aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link to="/about" className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-gray-400 after:transition-all after:duration-300 hover:after:w-full">About Us</Link>
                        </li>
                    
                        <li>
                            <a href="#features" className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-gray-400 after:transition-all after:duration-300 hover:after:w-full">Features</a>
                        </li>
                       
                        <li>
                            <Link to="/contact" className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-gray-400 after:transition-all after:duration-300 hover:after:w-full">Contact Us</Link>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center lg:order-2 mr-36">
                    
                    <Link to="/login" className="text-gray-800 text-xl dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</Link> 
                    <Link to="/signup" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xl px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Sign up</Link> 

               </div>
            </div>
        </nav>
    </header>
    </div>
  )
}
