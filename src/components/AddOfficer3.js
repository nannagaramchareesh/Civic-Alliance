import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUserPlus, FaEnvelope, FaBuilding, FaKey, FaRocket } from "react-icons/fa";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AddOfficer() {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🔹 Ensure `user` is not null before accessing `department`
  const [officer, setOfficer] = useState({
    name: "",
    email: "",
    password: "",
    department: user ? user.department : "", // Fix: Prevent crash if user is null
  });

  // 🔹 Prevent access if token is missing (Redirect to login)
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  // 🔹 If user is null, show a loading state to prevent accessing `user.department`
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white text-2xl">
        Loading...
      </div>
    );
  }

  const handleChange = (e) => {
    setOfficer({ ...officer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Officer Data:", officer);
  };

  return (
    <div className="relative flex justify-center items-center h-screen overflow-hidden">
      {/* Background Pulse Animation */}
      <div className="absolute w-[300vw] h-[300vw] bg-gradient-to-r from-blue-500 to-indigo-700 rounded-full opacity-10"></div>

      {/* Floating Form Card */}
      <motion.div

        className="relative z-10 w-[90%] max-w-5xl bg-black bg-opacity-40 backdrop-blur-lg border border-gray-700 rounded-3xl p-10 shadow-2xl text-white"
      >
        {/* Title with Animation */}
        <motion.h1
          
          className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 tracking-widest"
        >
          ADD NEW OFFICER
        </motion.h1>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Name Field */}
          <motion.div className="relative group transition-all duration-300">
            <FaUserPlus className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 text-xl transition-all group-hover:text-pink-500" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={officer.name}
              onChange={handleChange}
              className="w-full pl-12 pr-6 py-4 bg-transparent text-white border border-gray-500 rounded-lg outline-none focus:ring-2 focus:ring-pink-500 hover:border-pink-400"
              required
            />
          </motion.div>

          {/* Email Field */}
          <motion.div className="relative group transition-all duration-300">
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 text-xl transition-all group-hover:text-green-500" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={officer.email}
              onChange={handleChange}
              className="w-full pl-12 pr-6 py-4 bg-transparent text-white border border-gray-500 rounded-lg outline-none focus:ring-2 focus:ring-green-500 hover:border-green-400"
              required
            />
          </motion.div>

          {/* Password Field */}
          <motion.div className="relative group transition-all duration-300">
            <FaKey className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 text-xl transition-all group-hover:text-yellow-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={officer.password}
              onChange={handleChange}
              className="w-full pl-12 pr-6 py-4 bg-transparent text-white border border-gray-500 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 hover:border-yellow-400"
              required
            />
          </motion.div>

          {/* Department Field (Disabled) */}
          <motion.div className="relative group">
            <FaBuilding className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
            <input
              type="text"
              name="department"
              value={officer.department}
              disabled
              className="w-full pl-12 pr-6 py-4 bg-gray-800 text-gray-400 border border-gray-600 rounded-lg outline-none cursor-not-allowed"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-full py-4 mt-6 text-xl font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all"
          >
            <FaRocket className="inline-block mr-2 text-xl" /> Register Officer
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
