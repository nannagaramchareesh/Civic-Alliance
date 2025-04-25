import React, { useState ,useContext} from "react";
import { FaUser, FaEnvelope, FaLock, FaBuilding, FaUserTie, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import { backendUrl } from "../App";
import axios from 'axios'
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";
export default function AddOfficer() {
    const {token,department} = useContext(AuthContext)
    const [officerData, setOfficerData] = useState({
        name: "",
        email: "",
        password: "",
        role: "Officer",
    });

    const handleChange = (e) => {
        setOfficerData({ ...officerData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(department)
            const response = await axios.post(`${backendUrl}/api/departmentHead/addOfficer`,{officerData,department},{headers:{'auth-token':token}})
            console.log(response.data) 
            if(response.data.success){
                toast.success(response.data.message)
            }
            else{
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden w-full text-gray-100 px-6">
            {/* Background Gradient */}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 opacity-60"></div> */}

            <div className="flex items-center space-x-16">
                {/* Left Side Content */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="max-w-lg text-white hidden lg:block"
                >
                    <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-400 to-blue-400 text-transparent bg-clip-text">
                        Add a New Officer
                    </h1>
                    <p className="mt-4 text-lg text-gray-300">
                        Empower your team by adding officers to manage and oversee projects efficiently.
                    </p>
                </motion.div>

                {/* Vertical Line */}
                <div className="h-96 border-l border-gray-500"></div>

                {/* Form Section */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="relative w-full max-w-md bg-white bg-opacity-10 backdrop-blur-lg shadow-2xl rounded-3xl p-10 border border-white/20"
                >
                    <h2 className="text-3xl font-bold text-center mb-6 text-gray-200">Register Officer</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Input */}
                        <div className="relative">
                            <FaUser className="absolute left-4 top-4 text-white" />
                            <input
                                type="text"
                                name="name"
                                placeholder="Officer Name"
                                value={officerData.name}
                                onChange={handleChange}
                                className="w-full pl-12 p-3 bg-transparent text-white border border-gray-500 rounded-full outline-none focus:ring-2 focus:ring-pink-500 hover:border-pink-400 transition"
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div className="relative">
                            <FaEnvelope className="absolute left-4 top-4 text-white" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Officer Email"
                                value={officerData.email}
                                onChange={handleChange}
                                className="w-full pl-12 p-3 bg-transparent text-white border border-gray-500 rounded-full outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <FaLock className="absolute left-4 top-4 text-white" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={officerData.password}
                                onChange={handleChange}
                                className="w-full pl-12 p-3 bg-transparent text-white border border-gray-500 rounded-full outline-none focus:ring-2 focus:ring-green-500 hover:border-green-400 transition"
                                required
                            />
                        </div>

                        {/* Department Input */}
                        <div className="relative">
                            <FaBuilding className="absolute left-4 top-4 text-white" />
                            <input
                                type="text"
                                name="department"
                                placeholder="Department"
                                value={department}
                                onChange={handleChange}
                                className="w-full pl-12 p-3 bg-transparent text-white border border-gray-500 rounded-full outline-none focus:ring-2 focus:ring-yellow-500 hover:border-yellow-400 transition"
                                required
                            />
                        </div>

                        {/* Role - Static */}
                        <div className="relative">
                            <FaUserTie className="absolute left-4 top-4 text-white" />
                            <input
                                type="text"
                                name="role"
                                value="Officer"
                                disabled
                                className="w-full pl-12 p-3 bg-gray-700 text-white border border-gray-500 rounded-full outline-none cursor-not-allowed"
                            />
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-blue-500 text-white text-lg font-semibold rounded-full hover:bg-blue-600 transition-all"
                            type="submit"
                        >
                            <FaPaperPlane /> Add Officer
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
