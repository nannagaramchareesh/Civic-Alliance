import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { backendUrl } from "../App";
import { motion } from "framer-motion";
import { FaCheck, FaTimes, FaHourglassHalf } from "react-icons/fa";
import { toast } from "react-toastify";

export default function SentCollaborationRequests() {


    const { user,token } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await axios.post(`${backendUrl}/api/departmentHead/sentCollaborationRequests`, {
                department: user.department
              });
              console.log(response.data)
            setRequests(response.data.requests);
        } catch (error) {
            toast.error("Failed to fetch collaboration requests.");
        }
    };

    const getStatusBadge = (status) => {
        const base = "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium";
        switch (status) {
            case "approved":
                return <span className={`${base} bg-green-200 text-green-900`}><FaCheck /> Approved</span>;
            case "rejected":
                return <span className={`${base} bg-red-200 text-red-900`}><FaTimes /> Rejected</span>;
            case "pending":
            default:
                return <span className={`${base} bg-yellow-200 text-yellow-900`}><FaHourglassHalf /> Pending</span>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 py-10 px-4 sm:px-8 text-white">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-2">📤 Sent Collaboration Requests</h1>
                <p className="text-gray-300 mb-8">
                    Track the collaboration requests your department has sent. Stay updated on approvals and responses.
                </p>

                {requests.length === 0 ? (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-gray-400 text-lg mt-20"
                    >
                        No collaboration requests sent yet.
                    </motion.p>
                ) : (
                    <div className="space-y-6">
                        {requests.map((req, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-gray-700 shadow-md rounded-lg p-5 border-l-4"
                                style={{
                                    borderColor:
                                        req.status === "approved"
                                            ? "#22c55e"
                                            : req.status === "rejected"
                                            ? "#ef4444"
                                            : "#facc15",
                                }}
                            >
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                    <div>
                                        <h2 className="text-xl font-semibold text-white">Project Name:{req.projectName}</h2>
                                        <p className="text-xl text-gray-300 mt-1">
                                            To: <span className=" text-xl text-gray-200">{req.departmentRequested}</span>
                                        </p>
                                        <p className="text-xl text-gray-400">Requested on {new Date(req.requestDate).toLocaleDateString()}</p>
                                        <p className="text-xl text-gray-400">Their message: {req.message}</p>
                                    </div>
                                    <div className="mt-3 sm:mt-0">{getStatusBadge(req.status)}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
