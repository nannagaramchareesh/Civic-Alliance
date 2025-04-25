import React, { useContext } from "react";
import { FaEnvelope, FaUser, FaBuilding, FaBriefcase, FaCheckCircle, FaTimesCircle, FaPhone, FaCalendar, FaSignOutAlt, FaClock } from "react-icons/fa";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const profilePic = "https://cdn-icons-png.flaticon.com/512/847/847969.png";
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user)
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-800">
        <p className="text-white text-3xl font-semibold animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gray-900 px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl items-center">
        
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={profilePic}
              alt="Profile"
              className="w-64 h-64 md:w-72 md:h-72 rounded-full border-4 border-gray-700 shadow-lg transition-transform transform hover:scale-105"
            />
            <div className="absolute -bottom-4 right-4 bg-green-500 text-white text-lg px-6 py-2 rounded-lg shadow-lg font-semibold">
              {user.status === "Approved" ? "Active" : "Inactive"}
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mt-6">{user.name.toUpperCase()}</h2>
          <p className="text-gray-400 text-2xl mt-3 flex items-center gap-2">
            <FaEnvelope className="text-red-400" /> {user.email}
          </p>
        </div>

        {/* Profile Details Box */}
        <div className="bg-gray-800 bg-opacity-80 backdrop-blur-md p-12 rounded-xl shadow-xl text-white w-full max-w-lg">
          <h3 className="text-3xl font-semibold text-center mb-6">Profile Details</h3>
          <hr className="mb-4"></hr>
          <div className="space-y-6 text-xl">
            <p className="flex items-center gap-4">
              <FaBuilding className="text-purple-400" /> <strong>Department:</strong> {user.department}
            </p>
            <p className="flex items-center gap-4">
              <FaBriefcase className="text-green-400" /> <strong>Role:</strong> {user.role}
            </p>
            <p className="flex items-center gap-4 ">
              {user.status === "Approved" ? (
                <FaCheckCircle className="text-green-400" />
              ) : (
                <FaTimesCircle className="text-red-400" />
              )}
              <strong>Status:</strong> {user.status}
            </p>     
            {user.phone && (
              <p className="flex items-center gap-4">
                <FaPhone className="text-yellow-400" /> <strong>Phone:</strong> {user.phone}
              </p>
            )}
            {user.date && (
              <p className="flex items-center gap-4">
                <FaCalendar className="text-blue-400" /> <strong>Registered Date:</strong> {new Date(user.date).toLocaleDateString()}
              </p>
            )}
            {/* Added Created Date Field */}
            {user.createdAt && (
              <p className="flex items-center gap-4">
                <FaClock className="text-orange-400" /> <strong>Account Created:</strong> {new Date(user.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col gap-6">
            <button className="w-full bg-blue-500 text-white text-xl font-semibold py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all transform hover:scale-105">
              Edit Profile
            </button>
            <button 
              onClick={() => { logout(); navigate("/login"); }} 
              className="w-full bg-red-500 text-white text-xl font-semibold py-3 rounded-lg shadow-md hover:bg-red-600 transition-all transform hover:scale-105 flex items-center justify-center gap-4"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
