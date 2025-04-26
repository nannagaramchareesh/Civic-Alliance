import React, { useState, useContext, useEffect } from "react";
import { MapPin } from "lucide-react";
import axios from "axios";
import { backendUrl } from "../App";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Card = ({ children, className }) => (
  <div className={`relative bg-white bg-opacity-10 backdrop-blur-lg border border-gray-300 border-opacity-20 shadow-lg rounded-2xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children }) => <div className="mt-2 text-gray-100">{children}</div>;

const Button = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg shadow-md transition-transform transform hover:scale-110 hover:from-pink-600 hover:to-purple-700 ${className}`}
  >
    {children}
  </button>
);

const ProjectsList = () => {
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    if (!token) navigate("/login");

    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/departmentHead/viewprojects`, {
          headers: { "auth-token": token },
        });
        console.log(response.data)
        setProjects(response.data.projects);
        setFilteredProjects(response.data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [token]);

  useEffect(() => {
    let filtered = projects;
    const today = new Date();

    if (searchTerm) {
      filtered = filtered.filter((project) =>
        project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedDepartment) {
      filtered = filtered.filter((project) => project.department === selectedDepartment);
    }
    if (selectedLocation) {
      filtered = filtered.filter((project) => project.location === selectedLocation);
    }
    if (statusFilter) {
      filtered = filtered.filter((project) => {
        const startDate = new Date(project.startDate);
        return statusFilter === "ongoing" ? startDate <= today : startDate > today;
      });
    }
    if (sortOrder === "latest") {
      filtered.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    } else {
      filtered.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    }

    setFilteredProjects(filtered);
  }, [searchTerm, selectedDepartment, selectedLocation, sortOrder, statusFilter, projects]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
          Ongoing & Upcoming Projects
        </h1>
        <p className="text-gray-300 text-center mt-2">Explore the latest projects in different departments.</p>
        <hr className="my-8 border-gray-600" />

        {/* Collaboration Requests Button - Visible only for Department Heads */}
        {user && user.role === "Department Head" && (
          <div className="flex justify-center mb-6">
            <Button onClick={() => navigate("/collaborationrequests")}>
              Manage Collaboration Requests
            </Button>
          </div>
        )}

        {/* Filters Section */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Search by Project Name..."
            className="px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {[{ value: selectedDepartment, setter: setSelectedDepartment, label: "All Departments", data: projects.map((p) => p.department) },
          { value: selectedLocation, setter: setSelectedLocation, label: "All Locations", data: projects.map((p) => p.location) },
          { value: statusFilter, setter: setStatusFilter, label: "All Status", data: ["ongoing", "upcoming"] },
          { value: sortOrder, setter: setSortOrder, label: "Sort Order", data: ["latest", "oldest"] }]
            .map(({ value, setter, label, data }, index) => (
              <select
                key={index}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                value={value}
                onChange={(e) => setter(e.target.value)}
              >
                <option value="">{label}</option>
                {[...new Set(data)].map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {filteredProjects.map((project) => {
            const isOngoing = new Date(project.startDate) <= new Date();
            return (
              <Card key={project._id}>
                <span className={`absolute top-2 right-2 px-3 py-1 text-xs font-bold rounded ${isOngoing ? 'bg-green-500' : 'bg-yellow-500'}`}>
                  {isOngoing ? 'Ongoing' : 'Upcoming'}
                </span>
                <CardContent>
                  <h2 className="text-2xl font-bold">{project.projectName}</h2>
                  <p className="text-pink-300 font-semibold mt-1">{project.department}</p>
                  <div className="flex items-center gap-2 text-gray-300 mt-4">
                    <MapPin size={22} className="text-blue-400" />
                    <span>{project.location}</span>
                  </div>
                  <p className="mt-6 text-gray-200">{project.description}</p>
                  <div className="mt-6 flex justify-end">
                    <Button onClick={() => navigate(`/projects/${project._id}`)}>View Details</Button>
                  </div>
                  <Link to={`/projects/${project._id}/tasks`}>
                    <button className="your-button-class">Manage Tasks</button>
                  </Link>

                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;
