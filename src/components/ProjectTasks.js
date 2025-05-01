import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { backendUrl } from "../App";
import { FaPlus, FaSpinner } from "react-icons/fa";
import { useParams } from "react-router-dom";

export default function ProjectTasks() {
    const { token, user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
    });
    const { projectId } = useParams();
    const [statusUpdates, setStatusUpdates] = useState({});
    const [officers, setOfficers] = useState([]);

    useEffect(() => {
        fetchTasks();
        fetchOfficers();
    }, [projectId]);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${backendUrl}/api/departmentHead/gettasks/${projectId}`, {
                headers: { "auth-token": token }
            });
            setTasks(res.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
        setLoading(false);
    };

    const fetchOfficers = async () => {
        try {
            const res = await axios.post(`${backendUrl}/api/departmentHead/fetchofficers`, { department: user.department }, {
                headers: { "auth-token": token }
            });
            setOfficers(res.data.officers);
        } catch (error) {
            console.error("Error fetching officers:", error);
        }
    };

    const handleAddTask = async () => {
        if (!newTask.title.trim()) {
            alert("Please enter a task title");
            return;
        }
        try {
            await axios.post(`${backendUrl}/api/departmentHead/createtask`, {
                ...newTask,
                projectId,
                createdBy: user._id,
                assignedTo: newTask.assignedTo,
            }, {
                headers: { "auth-token": token }
            });
            setNewTask({ title: "", description: "", startDate: "", endDate: "" });
            setShowModal(false);
            fetchTasks();
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const handleStatusChange = (taskId, newStatus) => {
        setStatusUpdates(prev => ({ ...prev, [taskId]: newStatus }));
    };

    const handleSaveStatus = async (taskId) => {
        try {
            const newStatus = statusUpdates[taskId];
            if (!newStatus) {
                alert("Please select a status before saving.");
                return;
            }
            await axios.put(`${backendUrl}/api/departmentHead/tasks/${taskId}/status`,
                { status: newStatus },
                { headers: { "auth-token": token } }
            );
            fetchTasks();
            alert("Status updated successfully!");
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status.");
        }
    };

    const handleMarkProjectCompleted = async () => {
        const confirmMark = window.confirm("Are you sure you want to mark this project as completed?");
        if (confirmMark) {
            try {
                await axios.put(`${backendUrl}/api/departmentHead/markprojectcompleted/${projectId}`, {}, {
                    headers: { "auth-token": token }
                });
                alert("Project marked as completed successfully!");
            } catch (error) {
                console.error("Error marking project as completed:", error);
                alert("Failed to mark project as completed.");
            }
        }
    };

    const groupedTasks = {
        "Pending": [],
        "In Progress": [],
        "Completed": []
    };
    tasks.forEach(task => groupedTasks[task.status].push(task));

    return (
        <div className="min-h-screen bg-gray-900 text-white px-3 sm:px-6 py-6 sm:py-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                    📋 Project Tasks
                </h2>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
                    {/* New Task Button */}
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center justify-center w-full sm:w-auto gap-2 px-4 sm:px-5 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg text-sm sm:text-base"
                    >
                        <FaPlus /> New Task
                    </button>

                    {/* Mark Project Completed Checkbox */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="completeProject"
                            onChange={(e) => {
                                if (e.target.checked) {
                                    handleMarkProjectCompleted();
                                    e.target.checked = false; // Reset after action
                                }
                            }}
                            className="w-4 h-4 sm:w-5 sm:h-5 accent-green-500"
                        />
                        <label htmlFor="completeProject" className="text-gray-300 text-sm sm:text-base cursor-pointer">
                            Mark Project as Completed
                        </label>
                    </div>
                </div>
            </div>

            {/* Loading */}
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <FaSpinner className="animate-spin text-3xl sm:text-4xl text-blue-400" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {["Pending", "In Progress", "Completed"].map(status => (
                        <div key={status} className="mb-6 sm:mb-0">
                            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">{status}</h3>
                            <div className="space-y-3 sm:space-y-4">
                                {groupedTasks[status].length > 0 ? (
                                    groupedTasks[status].map(task => {
                                        const assignedOfficer = officers.find(officer => officer._id === task.assignedTo);
                                        return (
                                            <motion.div
                                                key={task._id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="bg-white/10 backdrop-blur-md p-3 sm:p-5 rounded-xl sm:rounded-2xl shadow-lg border border-white/20"
                                            >
                                                <h4 className="text-base sm:text-lg md:text-xl font-bold text-white">Name: {task.title}</h4>
                                                <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mt-1">
                                                    Assigned to: {assignedOfficer ? assignedOfficer.name : "Unknown"}
                                                </h4>
                                                <p className="text-gray-300 text-sm sm:text-base md:text-lg mt-2">Description: {task.description}</p>
                                                <div className="text-gray-400 text-xs sm:text-sm md:text-base mt-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                                    <span>From: {new Date(task.startDate).toLocaleDateString()}</span>
                                                    <span className="hidden sm:inline">➔</span>
                                                    <span>To: {new Date(task.endDate).toLocaleDateString()}</span>
                                                </div>

                                                {(user._id === task.assignedTo || user.role === "Department Head") && (
                                                    <div className="mt-3 sm:mt-4 flex flex-col xs:flex-row items-start xs:items-center gap-2">
                                                        <select
                                                            value={statusUpdates[task._id] || task.status}
                                                            onChange={(e) => handleStatusChange(task._id, e.target.value)}
                                                            className="bg-gray-700 text-white p-2 rounded-lg focus:outline-none text-sm sm:text-base w-full xs:w-auto"
                                                        >
                                                            <option>Pending</option>
                                                            <option>In Progress</option>
                                                            <option>Completed</option>
                                                        </select>
                                                        <button
                                                            onClick={() => handleSaveStatus(task._id)}
                                                            className="bg-green-500 hover:bg-green-600 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold w-full xs:w-auto"
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                )}
                                            </motion.div>
                                        );
                                    })
                                ) : (
                                    <p className="text-gray-400 text-sm">No tasks</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Task Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-gray-800 p-5 sm:p-8 rounded-xl sm:rounded-2xl w-full max-w-md space-y-3 sm:space-y-4"
                    >
                        <h3 className="text-xl sm:text-2xl font-bold text-center">Add New Task</h3>
                        <input
                            type="text"
                            placeholder="Title"
                            value={newTask.title}
                            onChange={e => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full p-2 sm:p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base"
                        />
                        <textarea
                            placeholder="Description"
                            value={newTask.description}
                            onChange={e => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full p-2 sm:p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base"
                            rows="3"
                        ></textarea>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                            <div className="w-full space-y-1">
                                <label className="text-xs text-gray-400">Start Date</label>
                                <input
                                    type="date"
                                    value={newTask.startDate}
                                    onChange={e => setNewTask(prev => ({ ...prev, startDate: e.target.value }))}
                                    className="w-full p-2 sm:p-3 rounded-lg bg-gray-700 text-white focus:outline-none text-sm"
                                />
                            </div>
                            <div className="w-full space-y-1">
                                <label className="text-xs text-gray-400">End Date</label>
                                <input
                                    type="date"
                                    value={newTask.endDate}
                                    onChange={e => setNewTask(prev => ({ ...prev, endDate: e.target.value }))}
                                    className="w-full p-2 sm:p-3 rounded-lg bg-gray-700 text-white focus:outline-none text-sm"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-gray-400">Assign To</label>
                            <select
                                value={newTask.assignedTo || ""}
                                onChange={e => setNewTask(prev => ({ ...prev, assignedTo: e.target.value }))}
                                className="w-full p-2 sm:p-3 rounded-lg bg-gray-700 text-white focus:outline-none text-sm sm:text-base"
                            >
                                <option value="">Select Officer</option>
                                {officers.map(officer => (
                                    <option key={officer._id} value={officer._id}>
                                        {officer.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-6">
                            <button
                                onClick={handleAddTask}
                                className="flex-1 bg-green-500 hover:bg-green-600 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base"
                            >
                                Create
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 bg-red-500 hover:bg-red-600 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}