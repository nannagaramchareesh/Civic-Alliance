import React, { useState, useContext, useEffect } from "react";
import { FaRocket, FaMapMarkerAlt, FaRegCalendarAlt, FaFileAlt, FaSitemap, FaTools } from "react-icons/fa";
import { motion } from "framer-motion";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AddProject() {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    // Redirect if no token
    useEffect(() => {
        if (!token) navigate("/login");
    }, [token, navigate]);

    const [projectData, setProjectData] = useState({
        projectName: "",
        department: "",
        location: "",
        description: "",
        startDate: "",
        endDate: "",
        resourcesNeeded: "",
    });

    const handleChange = (e) => {
        setProjectData({ ...projectData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Project Data:", projectData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-12">
            <div className="flex justify-between items-center w-full max-w-7xl gap-x-16">
                
                {/* Left Side: Text Section */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="flex-1 max-w-lg"
                >
                    <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-400 to-blue-400 text-transparent bg-clip-text">
                        Create Your Project 🚀
                    </h1>
                    <p className="mt-4 text-lg text-gray-300">
                        Define your project scope, set milestones, and collaborate seamlessly across departments.
                    </p>
                </motion.div>

                {/* Vertical Divider */}
                <div className="w-[2px] h-80 bg-gradient-to-b from-blue-500 to-purple-500"></div>

                {/* Right Side: Form */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="flex-1 max-w-lg bg-white bg-opacity-10 backdrop-blur-lg shadow-2xl rounded-3xl p-10 border border-white/20"
                >
                    <h2 className="text-3xl font-bold text-center mb-6 text-gray-200">New Project Details</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Project Name */}
                        <div className="relative group">
                            <FaRocket className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 text-xl transition-all group-hover:text-pink-500" />
                            <input
                                type="text"
                                name="projectName"
                                placeholder="Project Name"
                                value={projectData.projectName}
                                onChange={handleChange}
                                className="w-full pl-12 pr-6 py-4 bg-transparent text-white border border-gray-500 rounded-lg outline-none focus:ring-2 focus:ring-pink-500 hover:border-pink-400"
                                required
                            />
                        </div>

                        {/* Department */}
                        <div className="relative group">
                            <FaSitemap className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 text-xl transition-all group-hover:text-green-500" />
                            <input
                                type="text"
                                name="department"
                                placeholder="Department"
                                value={projectData.department}
                                onChange={handleChange}
                                className="w-full pl-12 pr-6 py-4 bg-transparent text-white border border-gray-500 rounded-lg outline-none focus:ring-2 focus:ring-green-500 hover:border-green-400"
                                required
                            />
                        </div>

                        {/* Location */}
                        <div className="relative group">
                            <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 text-xl transition-all group-hover:text-yellow-500" />
                            <input
                                type="text"
                                name="location"
                                placeholder="Project Location"
                                value={projectData.location}
                                onChange={handleChange}
                                className="w-full pl-12 pr-6 py-4 bg-transparent text-white border border-gray-500 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 hover:border-yellow-400"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="relative group">
                            <FaFileAlt className="absolute left-4 top-4 text-blue-400 text-xl transition-all group-hover:text-red-500" />
                            <textarea
                                name="description"
                                placeholder="Project Description"
                                value={projectData.description}
                                onChange={handleChange}
                                className="w-full pl-12 pr-6 py-4 bg-transparent text-white border border-gray-500 rounded-lg outline-none focus:ring-2 focus:ring-red-500 hover:border-red-400 resize-none"
                                rows="3"
                                required
                            />
                        </div>

                        {/* Start and End Dates */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative group">
                                <FaRegCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 text-xl transition-all group-hover:text-purple-500" />
                                <input
                                    type="date"
                                    name="startDate"
                                    value={projectData.startDate}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-6 py-4 bg-transparent text-white border border-gray-500 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 hover:border-purple-400"
                                    required
                                />
                            </div>

                            <div className="relative group">
                                <FaRegCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 text-xl transition-all group-hover:text-indigo-500" />
                                <input
                                    type="date"
                                    name="endDate"
                                    value={projectData.endDate}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-6 py-4 bg-transparent text-white border border-gray-500 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-400"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-blue-500 text-white text-lg font-semibold rounded-full hover:bg-blue-600 transition-all"
                            type="submit"
                        >
                            <FaRocket /> Create Project
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
