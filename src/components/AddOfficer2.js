import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaBuilding, FaUserTie, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AddOfficer() {
    const [officerData, setOfficerData] = useState({
        name: "",
        email: "",
        password: "",
        department: "",
        role: "Officer",
    });

    const handleChange = (e) => {
        setOfficerData({ ...officerData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(officerData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden w-full text-gray-100">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-gray-800 to-blue-900 opacity-50"></div>

            {/* Left Side Content */}
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute left-10 top-1/3 max-w-lg text-white"
            >
                <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-400 to-blue-400 text-transparent bg-clip-text">
                    Add a New Officer
                </h1>
                <p className="mt-4 text-lg text-gray-300">
                    Empower your team by adding officers to manage and oversee projects efficiently.
                </p>
            </motion.div>

            {/* Form Section */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="relative w-[550px] bg-white bg-opacity-10 backdrop-blur-lg shadow-2xl rounded-3xl p-10 border border-white/20"
            >
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
                            className="w-full pl-12 p-3 bg-transparent text-white border border-gray-400 rounded-full outline-none focus:ring-2 focus:ring-pink-500"
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
                            className="w-full pl-12 p-3 bg-transparent text-white border border-gray-400 rounded-full outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="w-full pl-12 p-3 bg-transparent text-white border border-gray-400 rounded-full outline-none focus:ring-2 focus:ring-green-500"
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
                            value={officerData.department}
                            onChange={handleChange}
                            className="w-full pl-12 p-3 bg-transparent text-white border border-gray-400 rounded-full outline-none focus:ring-2 focus:ring-yellow-500"
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
                            className="w-full pl-12 p-3 bg-gray-700 text-white border border-gray-400 rounded-full outline-none cursor-not-allowed"
                        />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-blue-500 text-white text-lg font-semibold rounded-full hover:bg-blue-600 transition"
                        type="submit"
                    >
                        <FaPaperPlane /> Add Officer
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}
