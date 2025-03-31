import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { backendUrl } from "../App";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function CollaborationResults() {
    const { token } = useContext(AuthContext);
    const [projects, setProjects] = useState([]);
    const [filter, setFilter] = useState("approved");

    useEffect(() => {
        fetchProjects("approved");
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get(
                `${backendUrl}/api/departmentHead/sentCollaborationRequests`,
                { headers: { "auth-token": token } }
            );
            setProjects(response.data.requests);
        } catch (err) {
            console.error("Error fetching projects.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white px-8 py-12">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text">
                Collaboration Status
            </h1>

            {/* Filter Tabs */}
            <div className="flex gap-6 mt-8">
                {["approved", "rejected"].map((status) => (
                    <button
                        key={status}
                        onClick={() => {
                            setFilter(status);
                            fetchProjects();
                        }}
                        className={`px-6 py-3 rounded-full text-lg font-semibold transition-all ${
                            filter === status
                                ? "bg-blue-600 shadow-lg shadow-blue-400"
                                : "bg-gray-700 hover:bg-blue-500"
                        }`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>

            {/* Projects List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 w-full max-w-6xl">
                {projects.length > 0 ? (
                    projects.map((project, index) => (
                        <motion.div
                            key={project._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative p-6 bg-white bg-opacity-10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl"
                        >
                            <h3 className="text-2xl font-bold text-gray-200">{project.projectName}</h3>
                            <p className="mt-2 text-gray-300 text-xl">
                                Department: <span className="font-semibold">{project.department}</span>
                            </p>
                            <p className="mt-1 text-gray-400 text-xl">
                                Start: {new Date(project.startDate).toLocaleDateString()} | End: {new Date(project.endDate).toLocaleDateString()}
                            </p>

                            {/* Status Icons */}
                            <div className="absolute top-4 right-4 text-2xl">
                                {filter === "approved" && <FaCheckCircle className="text-green-400" />}
                                {filter === "rejected" && <FaTimesCircle className="text-red-400" />}
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <p className="text-gray-400 text-lg mt-6">No {filter} projects found.</p>
                )}
            </div>
        </div>
    );
}
