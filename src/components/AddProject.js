import React, { useState } from 'react';

const AddProject = () => {

    const [projectData, setProjectData] = useState({
        projectName: '',
        department: '',
        location: '',
        description: '',
        startDate: '',
        endDate: '',
        resourcesNeeded: '',
        interDepartmental: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProjectData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(projectData); // Handle form submission logic
    };

    return (
        <div className="px-52 w-[1500px] mb-32">
                <h2 className="text-[60px] mt-20 font-bold  mb-10 text-center text-white">Add New Project</h2>
            <div className="p-8  bg-white bg-opacity-5 backdrop-blur-lg rounded-xl shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-200 font-medium">Project Name</label>
                        <input
                            type="text"
                            name="projectName"
                            value={projectData.projectName}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 bg-white bg-opacity-10 rounded-lg mt-2 backdrop-blur-md text-white placeholder-gray-200 hover:bg-white hover:bg-opacity-30 transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter project name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-200 font-medium">Department</label>
                        <input
                            type="text"
                            name="department"
                            value={projectData.department}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 bg-white bg-opacity-10 rounded-lg mt-2 backdrop-blur-md text-white placeholder-gray-200 hover:bg-white hover:bg-opacity-30 transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter department name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-200 font-medium">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={projectData.location}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 bg-white bg-opacity-10 rounded-lg mt-2 backdrop-blur-md text-white placeholder-gray-200 hover:bg-white hover:bg-opacity-30 transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter location"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-200 font-medium">Description</label>
                        <textarea
                            name="description"
                            value={projectData.description}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 bg-white bg-opacity-10 rounded-lg mt-2 backdrop-blur-md text-white placeholder-gray-200 hover:bg-white hover:bg-opacity-30 transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Describe the project"
                            rows="4"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-200 font-medium">Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={projectData.startDate}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 bg-white bg-opacity-10 rounded-lg mt-2 backdrop-blur-md text-white hover:bg-white hover:bg-opacity-30 transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-200 font-medium">End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                value={projectData.endDate}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 bg-white bg-opacity-10 rounded-lg mt-2 backdrop-blur-md text-white hover:bg-white hover:bg-opacity-30 transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-200 font-medium">Resources Needed</label>
                        <input
                            type="text"
                            name="resourcesNeeded"
                            value={projectData.resourcesNeeded}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 bg-white bg-opacity-10 rounded-lg mt-2 backdrop-blur-md text-white placeholder-gray-200 hover:bg-white hover:bg-opacity-30 transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="List any resources required"
                        />
                    </div>
                    <div className="flex items-center mt-4">
                        <input
                            type="checkbox"
                            name="interDepartmental"
                            checked={projectData.interDepartmental}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <label className="ml-2 text-gray-200 font-medium">Is this an inter-departmental project?</label>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 bg-opacity-80 text-white font-semibold py-3 rounded-lg mt-6 hover:bg-opacity-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit Project
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProject;
