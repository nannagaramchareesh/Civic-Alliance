import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaBuilding, FaUserTie, FaPaperPlane, FaCheckCircle } from "react-icons/fa";

export default function AddOfficer() {
  const [officerData, setOfficerData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    role: "Officer",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setOfficerData({ ...officerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000); // Reset form after 3 seconds
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full bg-gray-900 overflow-hidden">
      
    
      {/* Floating Form Card */}
      <motion.div 
        initial={{ rotateY: 0 }} 
        animate={{ rotateY: submitted ? 180 : 0 }} 
        transition={{ duration: 0.8 }} 
        className="relative w-[500px] h-[450px] perspective-1000"
      >
        {/* Front Side */}
        <AnimatePresence>
          {!submitted && (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: -50 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, rotateY: 180 }} 
              className="absolute w-full h-full bg-gray-900 rounded-xl shadow-lg border border-gray-700 p-8 flex flex-col justify-center items-center"
            >
              <h2 className="text-3xl font-extrabold text-white bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mb-6">
                Add a New Officer
              </h2>
              <form onSubmit={handleSubmit} className="w-full space-y-5">
                
                {/* Name Input */}
                <motion.div whileHover={{ scale: 1.1 }} className="relative">
                  <FaUser className="absolute left-4 top-3 text-white" />
                  <input 
                    type="text"
                    name="name"
                    placeholder="Officer Name"
                    value={officerData.name}
                    onChange={handleChange}
                    className="w-full pl-12 p-3 bg-transparent text-white border border-gray-500 rounded-full outline-none focus:ring-2 focus:ring-pink-500 hover:border-pink-400"
                    required
                  />
                </motion.div>

                {/* Email Input */}
                <motion.div whileHover={{ scale: 1.1 }} className="relative">
                  <FaEnvelope className="absolute left-4 top-3 text-white" />
                  <input 
                    type="email"
                    name="email"
                    placeholder="Officer Email"
                    value={officerData.email}
                    onChange={handleChange}
                    className="w-full pl-12 p-3 bg-transparent text-white border border-gray-500 rounded-full outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
                    required
                  />
                </motion.div>

                {/* Password Input */}
                <motion.div whileHover={{ scale: 1.1 }} className="relative">
                  <FaLock className="absolute left-4 top-3 text-white" />
                  <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={officerData.password}
                    onChange={handleChange}
                    className="w-full pl-12 p-3 bg-transparent text-white border border-gray-500 rounded-full outline-none focus:ring-2 focus:ring-green-500 hover:border-green-400"
                    required
                  />
                </motion.div>

                {/* Department Input */}
                <motion.div whileHover={{ scale: 1.1 }} className="relative">
                  <FaBuilding className="absolute left-4 top-3 text-white" />
                  <input 
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={officerData.department}
                    onChange={handleChange}
                    className="w-full pl-12 p-3 bg-transparent text-white border border-gray-500 rounded-full outline-none focus:ring-2 focus:ring-yellow-500 hover:border-yellow-400"
                    required
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-pink-500 text-white text-lg font-semibold rounded-full hover:bg-pink-600 transition"
                  type="submit"
                >
                  <FaPaperPlane /> Add Officer
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back Side (Success Message) */}
        {submitted && (
          <motion.div 
            key="success"
            initial={{ rotateY: 180, opacity: 0 }} 
            animate={{ rotateY: 0, opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute w-full h-full bg-green-500 rounded-xl shadow-lg flex flex-col items-center justify-center text-white"
          >
            <FaCheckCircle className="text-6xl mb-4" />
            <h2 className="text-3xl font-bold">Success!</h2>
            <p className="text-lg">Officer has been added.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
