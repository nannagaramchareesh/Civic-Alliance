import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import AuthContext from "../context/AuthContext"; 

export default function Navbar() {
    const { user } = useContext(AuthContext); 
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <header className="w-full">
                <nav className="border-gray-200 py-5 text-xl">
                    <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                        <Link to="/" className="flex items-center">
                            <span className="self-center text-xl md:text-2xl lg:text-3xl font-semibold whitespace-nowrap dark:text-white">
                                Civic Alliance
                            </span>
                        </Link>

                        {/* Mobile menu button */}
                        <button 
                            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            onClick={toggleMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <FaTimes className="w-6 h-6" />
                            ) : (
                                <FaBars className="w-6 h-6" />
                            )}
                        </button>

                        {/* Navigation Menu - hidden on mobile unless toggled */}
                        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full lg:flex lg:w-auto lg:order-1`}>
                            <ul className="flex flex-col mt-4 lg:flex-row lg:space-x-8 lg:mt-0">
                                <li><Link to="/" className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-gray-400 after:transition-all after:duration-300 hover:after:w-full">Home</Link></li>
                                <li><Link to="/about" className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-gray-400 after:transition-all after:duration-300 hover:after:w-full">About Us</Link></li>
                                {user && user.role === 'Department Head' && <li><Link to="/viewpending" className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-gray-400 after:transition-all after:duration-300 hover:after:w-full">Review Projects</Link></li>}
                                <li><a href="/overview" className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-gray-400 after:transition-all after:duration-300 hover:after:w-full">Dashboard</a></li>
                                <li><Link to="/contact" className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-gray-400 after:transition-all after:duration-300 hover:after:w-full">Contact Us</Link></li>
                            </ul>
                        </div>

                        <div className="flex items-center lg:order-2 ml-auto lg:ml-0 lg:mr-36">
                            {user ? (
                                <div className="flex items-center space-x-2 md:space-x-4">
                                    <span className="hidden md:inline text-white text-sm lg:text-lg font-semibold">
                                        Welcome, <span className="text-purple-400">{user.name}</span>!
                                    </span>
                                    <FaUserCircle
                                        className="text-gray-800 dark:text-white text-3xl lg:text-5xl cursor-pointer hover:opacity-80 transition-all"
                                        onClick={() => navigate("/profile")}
                                    />
                                </div>
                            ) : (
                                <>
                                    <Link to="/login" className="text-gray-800 text-sm md:text-lg lg:text-xl dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-2 md:px-4 lg:px-5 py-1 md:py-2 lg:py-2.5 mr-1 sm:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                                        Log in
                                    </Link>
                                    <Link to="/signup" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm md:text-lg lg:text-xl px-2 md:px-4 lg:px-5 py-1 md:py-2 lg:py-2.5 mr-1 sm:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                                        Sign up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}