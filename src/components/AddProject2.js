import React, { useState, useContext, useEffect } from "react";
import { FaRocket, FaRegCalendarAlt, FaTrash, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function AddProject() {
    const { token, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [msg,setMsg] = useState('');
    useEffect(() => {
        if (!token) navigate("/login");
    }, [token, navigate]);
    const [title,setTitle] = useState('');
    const [projectData, setProjectData] = useState({
        projectName: "",
        description: "",
        location: "",
        startDate: "",
        endDate: "",
        resourcesNeeded: "",
        priority: "",
        collaboratingDepartments: [],
        department: user.department,
    });

    const [departmentInput, setDepartmentInput] = useState({
        name: "",
        startDate: "",
        endDate: "",
    });

    const [priorityConflictModal, setPriorityConflictModal] = useState(false);

    const handleChange = (e) => {
        setProjectData({ ...projectData, [e.target.name]: e.target.value });
    };

    const handleDepartmentChange = (e) => {
        setDepartmentInput({ ...departmentInput, [e.target.name]: e.target.value });
    };

    const addDepartment = () => {
        if (departmentInput.name && departmentInput.startDate && departmentInput.endDate) {
            setProjectData({
                ...projectData,
                collaboratingDepartments: [...projectData.collaboratingDepartments, departmentInput],
            });
            setDepartmentInput({ name: "", startDate: "", endDate: "" });
        }
    };

    const removeDepartment = (index) => {
        const updatedDepartments = [...projectData.collaboratingDepartments];
        updatedDepartments.splice(index, 1);
        setProjectData({ ...projectData, collaboratingDepartments: updatedDepartments });
    };

    const priorityLevels = {
        sewage: 1,         // Must be laid first — foundational for drainage
        sewer: 1,          // Same as sewage; grouped together
        pipeline: 2,       // Water, gas, communication lines — before surfacing
        water: 2,          // Same trenching zone — often overlaps with pipeline
        electricity: 3,    // Underground cabling — must avoid interference with water/sewage
        road: 4,           // After all underground work is complete
        pavement: 5,       // Footpaths, usually aligned with road edges
        landscaping: 6     // Final beautification — never before construction!
      };
      

    const handleSubmit = async (e) => {
        e.preventDefault();
        const departmentPriority = priorityLevels[projectData.department?.toLowerCase()] || 3;
        const updatedProjectData = { ...projectData, priority: departmentPriority };

        try {
            const response = await axios.post(
                `${backendUrl}/api/departmentHead/addproject`,
                updatedProjectData,
                { headers: { "auth-token": token } }
            );

            if (response.data.success) {
                toast.success("🎉 Project created successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                });
                // setTimeout(() => navigate("/"), 3000); // Redirect after toast
            } else {
                setPriorityConflictModal(true);
                console.log(response.data)
                setTitle(response.data.title)
                setMsg(response.data.message)
            }
        } catch (err) {
            setPriorityConflictModal(true);
        }
    };

    return (
        <div className="min-h-screen flex items-center mb-20 justify-center bg-gray-900 text-white px-12">
            <ToastContainer />
            <div className="flex justify-between items-center w-full max-w-7xl gap-x-16">
                {/* Left Side Text */}
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

                <div className="w-[2px] h-80 bg-gradient-to-b from-blue-500 to-purple-500"></div>

                {/* Right Side Form */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="flex-1 max-w-lg bg-white bg-opacity-10 backdrop-blur-lg shadow-2xl rounded-3xl p-10 border mt-20 border-white/20"
                >
                    <h2 className="text-3xl font-bold text-center mb-6 text-gray-200">New Project Details</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Project Inputs */}
                        <input type="text" name="projectName" placeholder="Project Name" value={projectData.projectName} onChange={handleChange} className="w-full px-4 py-3 bg-transparent text-white border border-gray-500 rounded-lg outline-none focus:ring-2 focus:ring-pink-500 hover:border-pink-400" required />

                        <textarea name="description" placeholder="Project Description" value={projectData.description} onChange={handleChange} className="w-full px-4 py-3 bg-transparent text-white border border-gray-500 rounded-lg outline-none focus:ring-2 focus:ring-red-500 hover:border-red-400 resize-none" rows="3" required />

                        <input type="text" name="location" placeholder="Project Location" value={projectData.location} onChange={handleChange} className="w-full px-4 py-3 bg-transparent text-white border border-gray-500 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 hover:border-yellow-400" required />

                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative group">
                                <FaRegCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 text-xl transition-all group-hover:text-purple-500" />
                                <input type="date" name="startDate" value={projectData.startDate} onChange={handleChange} className="w-full pl-12 pr-6 py-4 bg-transparent text-white border border-gray-500 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 hover:border-purple-400" required />
                            </div>
                            <div className="relative group">
                                <FaRegCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 text-xl transition-all group-hover:text-indigo-500" />
                                <input type="date" name="endDate" value={projectData.endDate} onChange={handleChange} className="w-full pl-12 pr-6 py-4 bg-transparent text-white border border-gray-500 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-400" required />
                            </div>
                        </div>

                        {/* Collaborating Departments */}
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-white">Collaborating Departments</h3>
                            <div className="grid grid-cols-3 gap-2 mt-4">
                                <input type="text" name="name" placeholder="Department Name" value={departmentInput.name} onChange={handleDepartmentChange} className="col-span-1 px-4 py-2 bg-transparent text-white border border-gray-500 rounded-lg outline-none" />
                                <input type="date" name="startDate" value={departmentInput.startDate} onChange={handleDepartmentChange} className="px-4 py-2 bg-transparent text-white border border-gray-500 rounded-lg outline-none" />
                                <input type="date" name="endDate" value={departmentInput.endDate} onChange={handleDepartmentChange} className="px-4 py-2 bg-transparent text-white border border-gray-500 rounded-lg outline-none" />
                            </div>
                            <button type="button" onClick={addDepartment} className="mt-3 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                                <FaPlus /> Add Department
                            </button>
                            <ul className="mt-4">
                                {projectData.collaboratingDepartments.map((dept, index) => (
                                    <li key={index} className="flex items-center justify-between p-2 bg-gray-700 rounded-lg mt-2">
                                        <span>{dept.name} ({dept.startDate} - {dept.endDate})</span>
                                        <button onClick={() => removeDepartment(index)} className="text-red-400 hover:text-red-500">
                                            <FaTrash />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-blue-500 text-white text-lg font-semibold rounded-full hover:bg-blue-600 transition-all" type="submit">
                            <FaRocket /> Create Project
                        </motion.button>
                    </form>
                </motion.div>
            </div>

            {/* Modal for Priority Conflict */}
            {priorityConflictModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
                    <div className="bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl rounded-2xl p-6 w-[550px] text-white">
                        <h3 className="text-2xl font-bold mb-3 text-pink-400">{title} 🚫</h3>
                        <p className="text-xl text-gray-200 mb-6">
                            {msg}
                        </p>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setPriorityConflictModal(false)}
                                className="bg-pink-600 hover:bg-pink-700 px-5 py-2 text-sm rounded-full font-medium"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
