import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { backendUrl } from "../App";
import { motion } from "framer-motion";
import { FaPaperPlane, FaCheckCircle, FaTimesCircle, FaHourglassHalf } from "react-icons/fa";
import { toast } from "react-toastify";
import "./sentCollab.css";

export default function SentCollaborationRequests() {
    const { token } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/departmentHead/sentCollaborationRequests`, {
                headers: { "auth-token": token },
            });
            setRequests(response.data.requests);
        } catch (error) {
            toast.error("Failed to fetch collaboration requests.");
        }
    };

    return (
        <div className="sent-collab-container">
            <h1 className="sent-collab-title">📤 Sent Collaboration Requests</h1>
            <p className="sent-collab-subtext">Track the pulse of your department’s outreach. See how your collaboration sparks are igniting responses!</p>

            <div className="timeline">
                {requests.length === 0 ? (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-xl text-slate-400 mt-10"
                    >
                        No requests sent yet.
                    </motion.p>
                ) : (
                    requests.map((req, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`timeline-entry ${req.status}`}
                        >
                            <div className="timeline-icon">
                                <FaPaperPlane />
                            </div>
                            <div className="timeline-content">
                                <h2>{req.projectName}</h2>
                                <p><strong>To:</strong> {req.departmentRequested}</p>
                                <p><strong>Requested On:</strong> {new Date(req.requestDate).toLocaleDateString()}</p>
                                <p className="status-label">
                                    {req.status === "approved" && <FaCheckCircle className="icon approved" />}
                                    {req.status === "rejected" && <FaTimesCircle className="icon rejected" />}
                                    {req.status === "pending" && <FaHourglassHalf className="icon pending" />}
                                    <span className={req.status}>{req.status.toUpperCase()}</span>
                                </p>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}
