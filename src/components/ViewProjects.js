import React, { useState,useContext } from "react";
import { MapPin, Calendar } from "lucide-react";
import axios from 'axios'
import { useEffect } from "react";
import { backendUrl } from "../App";
import AuthContext from "../context/AuthContext";
const Card = ({ children, className }) => {
  return (
    <div className={`bg-gray-900 border border-2px border-solid border-white shadow-2xl rounded-2xl p-6 transition-transform w-[1200px]  transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r from-gray-800 to-gray-700 h-[330px] duration-300 ${className}`}>
      {children}
    </div>
  );
};

const CardContent = ({ children }) => {
  return <div className="mt-2 text-gray-300">{children}</div>;
};

const Button = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-indigo-700 transform hover:scale-110 ${className}`}
    >
      {children}
    </button>
  );
};


const ProjectsList = () => {
  const {token} = useContext(AuthContext)
  const [projects,setProjects] = useState([]);
  useEffect(() => {
    if (!token) return; // Prevent API call if token is not available
  
    const fetchProjects = async () => {
      try {
        console.log("Using Token:", token);
        const response = await axios.get(`${backendUrl}/api/departmentHead/viewprojects`, {
          headers: { 'auth-token': token },
        });
        console.log(response.data)
        setProjects(response.data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
  
    fetchProjects();
  }, [token]);  // Run only when token is available
  
 
  
  return (
    <div className="">

    <div className=" max-w-full p-12  text-white">
      <h1 className="text-3xl  font-bold  text-center bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text ">Ongoing & Upcoming Projects</h1>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
      <div className="grid gap-6 mt-10">
        {projects.map((project,index) => (
          <div className={`flex  justify-center`}>
            <Card key={project.id} className="relative overflow-hidden">
            <CardContent>
              <h2 className="text-2xl font-bold text-gray-100">{project.projectName}</h2>
              <p className="text-gray-400 font-extrabold mt-2 text-xl">{project.department}</p>
              <div className="flex items-center gap-2 text-gray-300 text-xl mt-5">
                <MapPin size={22} className="text-blue-400 text-xl" /> <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm mt-5">
                <Calendar size={22} className="text-green-400 " /> <span className="text-xl">{new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</span>
              </div>
              <p className="mt-6 leading-relaxed text-xl">{project.description}</p>
              <div className="mt-4 flex justify-end">
                <Button>View Details</Button>
              </div>
            </CardContent>
          </Card>
          
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ProjectsList;
