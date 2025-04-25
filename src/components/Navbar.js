import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import  AuthContext  from "../context/AuthContext"; 

export default function Navbar() {
    const { user } = useContext(AuthContext); 
    const navigate = useNavigate();

    return (
        <div>
            <header className="w-full">
                <nav className="border-gray-200 py-5 text-xl">
                    <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                        <Link to="/" className="flex items-center">
                            <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
                                Civic Alliance
                            </span>
                        </Link>

                        <div className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1">
                            <ul className="flex flex-col lg:flex-row lg:space-x-8">
                                <li><Link to="/" className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-gray-400 after:transition-all after:duration-300 hover:after:w-full">Home</Link></li>
                                <li><Link to="/about" className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-gray-400 after:transition-all after:duration-300 hover:after:w-full">About Us</Link></li>
                                <li><a href="#features" className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-gray-400 after:transition-all after:duration-300 hover:after:w-full">Features</a></li>
                                <li><a href="/overview" className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-gray-400 after:transition-all after:duration-300 hover:after:w-full">Dashboard</a></li>
                                <li><Link to="/contact" className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-gray-400 after:transition-all after:duration-300 hover:after:w-full">Contact Us</Link></li>
                            </ul>
                        </div>

                        <div className="flex items-center lg:order-2 mr-36">
                            {user ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-white text-lg font-semibold">
                                        Welcome, <span className="text-purple-400">{user.name}</span>!
                                    </span>
                                    <FaUserCircle
                                        className="text-gray-800 dark:text-white text-5xl cursor-pointer hover:opacity-80 transition-all"
                                        onClick={() => navigate("/profile")}
                                    />
                                </div>
                            ) : (
                                <>
                                    <Link to="/login" className="text-gray-800 text-xl dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                                        Log in
                                    </Link>
                                    <Link to="/signup" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xl px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
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
