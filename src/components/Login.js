import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/departmentHead/login`, { email, password });
      console.log(response.data)
      if (response.data.success) {
        localStorage.setItem("authToken", response.data.token);
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div>
        <div className="font-[sans-serif]">
          <div className="text-center bg-gradient-to-r from-blue-800 to-blue-400 min-h-[160px] sm:p-6 p-4"></div>
  
          <div className="mx-4 mb-4 -mt-16">
            <form className="w-[600px] mx-auto bg-white shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md">
              <div className="md:grid-cols-2 flex flex-col gap-8">
                <button
                  type="button"
                  className="w-full px-6 py-3 flex items-center justify-center rounded-md text-gray-800 text-sm tracking-wider font-semibold border-none outline-none bg-gray-100 hover:bg-gray-200"
                >
                  Continue with Google
                </button>
                <button
                  type="button"
                  className="w-full px-6 py-3 flex items-center justify-center rounded-md text-white text-sm tracking-wider font-semibold border-none outline-none bg-black hover:bg-[#333]"
                >
                  Continue with Apple
                </button>
              </div>
  
              <div className="my-8 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 text-center">Or</p>
              </div>
  
              <div className="flex flex-col md:grid-cols-2 gap-8">
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
                  <input
                    name="email"
                    type="text"
                    className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
  
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Password</label>
                  <input
                    name="password"
                    type="password"
                    className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
  
  
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  className="py-3 px-6 text-sm tracking-wider font-semibold w-[500px] rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
  
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          </div>
        </div>
      </div>
  );
}
