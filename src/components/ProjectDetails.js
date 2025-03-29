import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Calendar, ArrowLeft } from "lucide-react";
import axios from "axios";
import { backendUrl } from "../App";
import AuthContext from "../context/AuthContext";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!token) navigate("/login");

    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/departmentHead/projects/${id}`, {
          headers: { "auth-token": token },
        });
        setProject(response.data.project);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, [id, token]);

  if (!project) {
    return <div className="text-white text-center mt-20 text-3xl font-bold animate-pulse">Loading...</div>;
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center p-10">
      <div className="max-w-5xl w-full bg-white bg-opacity-10 backdrop-blur-xl border border-gray-600 shadow-2xl rounded-2xl p-10 relative">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-6 left-6 flex items-center text-gray-300 hover:text-white transition-all duration-300">
          <ArrowLeft size={24} className="mr-2 hover:scale-110 transform transition-all duration-300 text-gray-400" /> 
          <span className="text-lg font-semibold">Back</span>
        </button>

        {/* Project Header */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-white tracking-wide">{project.projectName}</h1>
          <p className="text-gray-300 text-lg mt-2 font-medium">{project.department}</p>
        </div>

        {/* Project Info Grid */}
        <div className="grid grid-cols-2 gap-6 mt-10 text-gray-300">
          <div className="flex items-center gap-3 bg-gray-800 p-5 rounded-lg shadow-lg hover:scale-105 transition-all duration-300">
            <MapPin size={26} className="text-blue-400" />
            <span className="text-xl">{project.location}</span>
          </div>
          <div className="flex items-center gap-3 bg-gray-800 p-5 rounded-lg shadow-lg hover:scale-105 transition-all duration-300">
            <Calendar size={26} className="text-green-400" />
            <span className="text-xl">
              {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Project Description */}
        <div className="mt-10 p-6 bg-gray-800 rounded-xl shadow-lg text-gray-200 text-lg leading-relaxed">
          {project.description}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
