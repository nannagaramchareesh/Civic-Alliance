import { useState } from "react";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "employee",
  });
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (frontend only, no API call)
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Employee added successfully!"); // Simulate success message
    setFormData({ name: "", email: "", role: "employee" }); // Reset form
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md text-white w-[1500px] flex justify-center">
      <h2 className="text-xl font-bold mb-4">Add Employee</h2>

      {message && <p className="mb-4 text-sm text-yellow-400">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border rounded bg-gray-800 text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border rounded bg-gray-800 text-white"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 w-full p-2 rounded text-white font-bold hover:bg-blue-600"
        >
          Create Employee
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;