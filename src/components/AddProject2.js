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
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!token) navigate("/login");
    }, [token, navigate]);

    const [title, setTitle] = useState('');
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
        category: "",
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
        sewage: 1,
        sewer: 1,
        pipeline: 2,
        water: 2,
        electricity: 3,
        road: 4,
        pavement: 5,
        landscaping: 6,
    };

    const formatDate = () => {
        const date = new Date(projectData.endDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const departmentPriority = priorityLevels[projectData.category?.toLowerCase()] || 3;
        const updatedProjectData = { ...projectData, priority: departmentPriority };
        console.log(formatDate());

        try {
            const response = await axios.post(
                `${backendUrl}/api/departmentHead/addproject`,
                {role:user.role,updatedProjectData,id:user._id},
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
            } else {
                setPriorityConflictModal(true);
                setTitle(response.data.title);
                setMsg(response.data.message);
            }
        } catch (err) {
            setPriorityConflictModal(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center mb-20 justify-center bg-gray-900 text-white">
            <ToastContainer />
            <div className="flex ml-36 items-center w-full max-w-7xl">
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

                <div className="w-[2px] h-80 bg-gradient-to-b from-blue-500 to-purple-500 mr-16 ml-10"></div>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="flex-1 max-w-lg bg-white bg-opacity-10 backdrop-blur-lg shadow-2xl rounded-3xl p-10 border mt-20 border-white/20"
                >
                    <h2 className="text-3xl font-bold text-center mb-6 text-gray-200">New Project Details</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
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

                        <select
                            name="category"
                            value={projectData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-transparent text-white border border-gray-500 rounded-lg outline-none focus:ring-2 focus:ring-green-500 hover:border-green-400"
                            required
                        >
                            <option className="bg-gray-900" value="">Select Category</option>
                            <option className="bg-gray-900" value="sewage">Sewage</option>
                            <option className="bg-gray-900" value="sewer">Sewer</option>
                            <option className="bg-gray-900" value="pipeline">Pipeline</option>
                            <option className="bg-gray-900" value="water">Water</option>
                            <option className="bg-gray-900" value="electricity">Electricity</option>
                            <option className="bg-gray-900" value="road">Road</option>
                            <option className="bg-gray-900" value="pavement">Pavement</option>
                            <option className="bg-gray-900" value="landscaping">Landscaping</option>
                        </select>

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

                        <motion.button
                            whileHover={!loading ? { scale: 1.05 } : {}}
                            whileTap={!loading ? { scale: 0.95 } : {}}
                            className={`w-full flex items-center justify-center gap-2 py-3 px-5 text-white text-lg font-semibold rounded-full transition-all 
                                ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-solid" />
                            ) : (
                                <>
                                    <FaRocket /> Create Project
                                </>
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            </div>

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
