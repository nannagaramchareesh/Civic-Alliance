import React from 'react';

export default function Aboutus() {
  return (
    <div>
      {/* Background Color Applied */}
      <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900 text-gray-300 p-8">
        <div className="relative bg-gray-800 bg-opacity-60 rounded-3xl p-10 shadow-2xl max-w-5xl w-full text-center backdrop-blur-md border border-gray-700">
          <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-6">
            About Us
          </h1>
          <p className="text-lg text-gray-300 mb-8 text-center max-w-3xl mx-auto leading-relaxed">
            We are committed to revolutionizing urban governance in India through our digital platform designed for interdepartmental cooperation.
            In a landscape where the multiplicity of authorities often leads to inefficiencies, our platform aims to streamline collaboration
            and enhance resource utilization among various implementing agencies.
          </p>
          
          <h2 className="text-4xl font-semibold mt-12 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-400">Our Mission</h2>
          <p className="text-lg text-gray-300 mb-8 text-center max-w-3xl mx-auto leading-relaxed">
            Our mission is to foster a collaborative environment among urban governance bodies to ensure effective project execution,
            reduce delays caused by miscoordination, and ultimately deliver better urban infrastructure for the citizens of India.
          </p>

          <h2 className="text-4xl font-semibold mt-12 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-green-400">What We Offer</h2>
          <ul className="list-disc list-inside text-lg text-gray-200 mb-8 max-w-3xl mx-auto space-y-4">
            <li className="transition-transform transform hover:scale-105 duration-300"><span className="text-teal-300">🗂️ Exchange of data</span> and resources between various agencies.</li>
            <li className="transition-transform transform hover:scale-105 duration-300"><span className="text-teal-300">🗓️ Scheduling of tasks</span> and project reports for seamless coordination.</li>
            <li className="transition-transform transform hover:scale-105 duration-300"><span className="text-teal-300">🔍 Identification of overlapping projects</span> to avoid resource wastage.</li>
            <li className="transition-transform transform hover:scale-105 duration-300"><span className="text-teal-300">📚 Training and capacity-building workshops</span> for all stakeholders.</li>
            <li className="transition-transform transform hover:scale-105 duration-300"><span className="text-teal-300">💬 A discussion forum</span> for intra and inter-department collaboration.</li>
          </ul>

          <h2 className="text-4xl font-semibold mt-12 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Join Us</h2>
          <p className="text-lg text-gray-300 mb-8 text-center max-w-3xl mx-auto leading-relaxed">
            Together, we can build a more efficient urban governance framework. Join us in our journey to enhance collaboration
            among departments and transform the urban landscape for the better.
          </p>
        </div>
      </div>
    </div>
  );
}
