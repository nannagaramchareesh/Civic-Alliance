import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../App";
import { FaClock, FaCheck, FaTimes } from "react-icons/fa";

export default function SentCollaborationRequests() {
    const { token, user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/departmentHead/sentCollaborationRequests`, {
                headers: { "auth-token": token },
            });
            console.log(response.data);
            setRequests(response.data.requests);
            console.log(requests);
        } catch (err) {
            toast.error("Error fetching sent requests.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900     text-white px-10 py-16 flex flex-col items-center">
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-6xl font-extrabold bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500 text-transparent bg-clip-text"
            >
                Sent Collaboration Requests
            </motion.h1>

            {/* Glowing request container */}
            <div className="mt-12 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {requests.length > 0 ? (
                    requests.map((req, index) => (
                        <motion.div
                            key={req.projectId}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative p-6 rounded-2xl shadow-lg backdrop-blur-lg border border-purple-500 bg-white bg-opacity-10 transform hover:scale-105 transition-all"
                        >
                            {/* Neon glow around card */}
                            <div className="absolute inset-0 rounded-2xl border-4 border-transparent hover:border-purple-500 transition-all"></div>

                            <h3 className="text-3xl font-bold text-gray-200">{req.projectName}</h3>
                            <p className="mt-2 text-gray-300 text-lg">To: <span className="font-semibold">{req.departmentRequested}</span></p>
                            <p className="mt-1 text-gray-400">Sent On: {new Date(req.requestDate).toLocaleDateString()}</p>

                            {/* Animated Status Icons */}
                            <div className="absolute top-4 right-4 text-3xl">
                                {req.status === "pending" && (
                                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
                                        <FaClock className="text-yellow-400" />
                                    </motion.div>
                                )}
                                {req.status === "approved" && <FaCheck className="text-green-400 animate-pulse" />}
                                {req.status === "rejected" && <FaTimes className="text-red-400 animate-bounce" />}
                            </div>

                            {/* Animated Glowing Status */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className={`mt-4 px-4 py-2 text-lg font-semibold text-center rounded-lg transition-all ${
                                    req.status === "pending"
                                        ? "bg-yellow-500 text-black shadow-yellow-500"
                                        : req.status === "approved"
                                        ? "bg-green-500 text-black shadow-green-500"
                                        : "bg-red-500 text-black shadow-red-500"
                                }`}
                            >
                                {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                            </motion.div>
                        </motion.div>
                    ))
                ) : (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-gray-400 text-xl mt-6"
                    >
                        No sent requests found.
                    </motion.p>
                )}
            </div>
        </div>
    );
}
