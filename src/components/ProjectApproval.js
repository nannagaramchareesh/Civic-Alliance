// src/pages/ProjectApprovals.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";

const ProjectApprovals = () => {
  const [pendingProjects, setPendingProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingProjects();
  }, []);

  const fetchPendingProjects = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/departmentHead/viewpendingprojects`);
      setPendingProjects(response.data.projects);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleApprove = async (projectId) => {
    try {
      await axios.patch(`${backendUrl}/api/departmentHead/approve`, { projectId, action: "approve" });
      fetchPendingProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (projectId) => {
    try {
      await axios.patch(`${backendUrl}/api/departmentHead/approve`, { projectId, action: "reject" });
      fetchPendingProjects();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-semibold text-white bg-gray-900 min-h-screen">
        Loading pending projects...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
        🛠️ Pending Project Approvals
      </h1>

      {pendingProjects.length === 0 ? (
        <div className="text-center text-gray-400">No pending projects at the moment!</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingProjects.map((project) => (
            <div
              key={project._id}
              className="bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300 flex flex-col justify-between border border-white/10"
            >
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-cyan-400">{project.name}</h2>
                <p className="text-gray-300 mb-1"><strong>Location:</strong> {project.location}</p>
                <p className="text-gray-300 mb-1"><strong>Description:</strong> {project.description}</p>
                <p className="text-gray-300 mb-1"><strong>Collaborating Departments:</strong> {project.collaboratingDepartments.join(", ")}</p>
                <p className="text-gray-500 text-sm mt-2">Added by Officer: {project.createdByOfficerEmail}</p>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => handleApprove(project._id)}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  Approve ✅
                </button>
                <button
                  onClick={() => handleReject(project._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  Reject ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectApprovals;
