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
        <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                    📋 Project Tasks
                </h2>

                <div className="flex items-center gap-6">
                    {/* New Task Button */}
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg"
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
                            className="w-5 h-5 accent-green-500"
                        />
                        <label htmlFor="completeProject" className="text-gray-300 cursor-pointer">
                            Mark Project as Completed
                        </label>
                    </div>
                </div>
            </div>

            {/* Loading */}
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <FaSpinner className="animate-spin text-4xl text-blue-400" />
                </div>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">
                    {["Pending", "In Progress", "Completed"].map(status => (
                        <div key={status}>
                            <h3 className="text-2xl font-semibold mb-4">{status}</h3>
                            <div className="space-y-4">
                                {groupedTasks[status].length > 0 ? (
                                    groupedTasks[status].map(task => {
                                        const assignedOfficer = officers.find(officer => officer._id === task.assignedTo);
                                        return (
                                            <motion.div
                                                key={task._id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="bg-white/10 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-white/20"
                                            >
                                                <h4 className="text-xl font-bold text-white">Name: {task.title}</h4>
                                                <h4 className="text-xl font-bold text-white">
                                                    Assigned to: {assignedOfficer ? `${assignedOfficer.name} (${assignedOfficer._id})` : "Unknown"}
                                                </h4>
                                                <p className="text-gray-300 text-xl mt-2">Description: {task.description}</p>
                                                <p className="text-gray-400 text-xl mt-1">
                                                    From: {new Date(task.startDate).toLocaleDateString()} ➔ To: {new Date(task.endDate).toLocaleDateString()}
                                                </p>

                                                {(user._id === task.assignedTo || user.role === "Department Head") && (
                                                    <div className="mt-4 flex items-center gap-2">
                                                        <select
                                                            value={statusUpdates[task._id] || task.status}
                                                            onChange={(e) => handleStatusChange(task._id, e.target.value)}
                                                            className="bg-gray-700 text-white p-2 rounded-lg focus:outline-none"
                                                        >
                                                            <option>Pending</option>
                                                            <option>In Progress</option>
                                                            <option>Completed</option>
                                                        </select>
                                                        <button
                                                            onClick={() => handleSaveStatus(task._id)}
                                                            className="bg-green-500 hover:bg-green-600 px-3 py-2 rounded-lg text-sm font-semibold"
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
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-gray-800 p-8 rounded-2xl w-full max-w-md space-y-4"
                    >
                        <h3 className="text-2xl font-bold text-center">Add New Task</h3>
                        <input
                            type="text"
                            placeholder="Title"
                            value={newTask.title}
                            onChange={e => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
                        />
                        <textarea
                            placeholder="Description"
                            value={newTask.description}
                            onChange={e => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
                            rows="3"
                        ></textarea>
                        <div className="flex gap-4">
                            <input
                                type="date"
                                value={newTask.startDate}
                                onChange={e => setNewTask(prev => ({ ...prev, startDate: e.target.value }))}
                                className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
                            />
                            <input
                                type="date"
                                value={newTask.endDate}
                                onChange={e => setNewTask(prev => ({ ...prev, endDate: e.target.value }))}
                                className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
                            />
                        </div>
                        <select
                            value={newTask.assignedTo || ""}
                            onChange={e => setNewTask(prev => ({ ...prev, assignedTo: e.target.value }))}
                            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
                        >
                            <option value="">Select Officer</option>
                            {officers.map(officer => (
                                <option key={officer._id} value={officer._id}>
                                    {officer.name}
                                </option>
                            ))}
                        </select>

                        <div className="flex gap-4 mt-6">
                            <button
                                onClick={handleAddTask}
                                className="flex-1 bg-green-500 hover:bg-green-600 py-3 rounded-xl font-semibold"
                            >
                                Create
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold"
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
