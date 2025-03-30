import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../App";
import { FaClock, FaCheck, FaTimes, FaTools, FaFileAlt, FaBuilding } from "react-icons/fa";


export default function CollaborationRequests() {
    const { token } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [filter, setFilter] = useState("pending");

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/departmentHead/collaborationRequests`, {
                headers: { "auth-token": token },
            });
            console.log(response.data)
            setRequests(response.data.requests);
        } catch (err) {
            toast.error("Error fetching requests.");
        }
    };

    const handleAction = async (id, status) => {
        try {
            const response = await axios.post(
                `${backendUrl}/api/departmentHead/updateRequest`,
                { id, status },
                { headers: { "auth-token": token } }
            );
            toast.success(response.data.message);
            fetchRequests();
        } catch (err) {
            toast.error("Error updating request.");
        }
    };

    const filteredRequests = requests.filter(req => req.status === filter);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white px-8 py-12">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text">
                Collaboration Requests
            </h1>

            {/* Filter Tabs */}
            <div className="flex gap-6 mt-8">
                {["pending", "approved", "rejected"].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
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

            {/* Requests List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 w-full max-w-6xl">
                {filteredRequests.length > 0 ? (
                    filteredRequests.map((req, index) => (
                        <motion.div
                            key={req.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative p-6 bg-white bg-opacity-10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl"
                        >
                            <h3 className="text-2xl font-bold text-gray-200">{req.projectName}</h3>
                            <p className="mt-2 text-gray-300 text-xl">Requested by: <span className="font-semibold">{req.requestedBy}</span></p>
                            <p className="mt-1 text-gray-400 text-xl">Start: {new Date(req.startDate).toLocaleDateString()} | End: {new Date(req.endDate).toLocaleDateString()}</p>
                            
                            {/* Status Icons */}
                            <div className="absolute top-4 right-4 text-2xl">
                                {req.status === "pending" && <FaClock className="text-yellow-400" />}
                                {req.status === "approved" && <FaCheck className="text-green-400" />}
                                {req.status === "rejected" && <FaTimes className="text-red-400" />}
                            </div>

                            {/* Action Buttons */}
                            {req.status === "pending" && (
                                <div className="mt-4 flex gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleAction(req.id, "approved")}
                                        className="px-5 py-2 bg-green-500 text-white rounded-lg text-xl hover:bg-green-600"
                                    >
                                        <FaCheck /> Accept
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleAction(req.id, "rejected")}
                                        className="px-5 py-2 text-xl bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    >
                                        <FaTimes /> Reject
                                    </motion.button>
                                </div>
                            )}
                        </motion.div>
                    ))
                ) : (
                    <p className="text-gray-400 text-lg mt-6">No {filter} requests found.</p>
                )}
            </div>
        </div>
    );
}
