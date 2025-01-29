import React from "react";
import { MapPin, Calendar } from "lucide-react";

const Card = ({ children, className }) => {
  return (
    <div className={`bg-gray-900 shadow-2xl rounded-2xl p-6 transition-transform w-[900px]  transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r from-gray-800 to-gray-700 h-[330px] duration-300 ${className}`}>
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

const projects = [
  {
    id: 1,
    name: "City Road Development",
    department: "Public Works Department",
    location: "MG Road, Delhi",
    startDate: "2025-02-10",
    endDate: "2025-08-15",
    description: "Expansion and resurfacing of MG Road."
  },
  {
    id: 2,
    name: "Gas Pipeline Installation",
    department: "Energy Department",
    location: "MG Road, Delhi",
    startDate: "2025-04-01",
    endDate: "2025-06-30",
    description: "Laying underground gas pipeline along MG Road."
  },
  {
    id: 3,
    name: "Smart Traffic Management",
    department: "Transport Department",
    location: "Connaught Place, Delhi",
    startDate: "2025-03-15",
    endDate: "2025-09-20",
    description: "Implementing AI-based traffic control signals."
  }
];

const ProjectsList = () => {
  return (
    <div className=" max-w-4xl p-12  text-white">
      <h1 className="text-3xl font-bold  text-center bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text ">Ongoing & Upcoming Projects</h1>
      <div className="grid gap-6 mt-10">
        {projects.map((project) => (
          <Card key={project.id} className="relative overflow-hidden">
            <CardContent>
              <h2 className="text-2xl font-bold text-gray-100">{project.name}</h2>
              <p className="text-gray-400 font-extrabold mt-2 text-xl">{project.department}</p>
              <div className="flex items-center gap-2 text-gray-300 text-xl mt-5">
                <MapPin size={22} className="text-blue-400 text-xl" /> <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm mt-5">
                <Calendar size={22} className="text-green-400 " /> <span className="text-xl">{project.startDate} - {project.endDate}</span>
              </div>
              <p className="mt-6 leading-relaxed text-xl">{project.description}</p>
              <div className="mt-4 flex justify-end">
                <Button>View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;
