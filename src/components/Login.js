import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext"; // Import Auth Context

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, setToken, token } = useContext(AuthContext); // Get login function from context

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/departmentHead/login`, {
        email,
        password,
      });
      console.log(response.data);
      if (response.data.success) {
        login(response.data.user, response.data.token); // Update user in context
        setToken(response.data.token);
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
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

            <div className="my-8 flex items-center before:flex-1 before:border-t before:border-neutral-300 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 text-center">Or</p>
            </div>

            <div className="flex flex-col md:grid-cols-2 gap-8">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
                <input
                  name="email"
                  type="text"
                  className="bg-gray-100 focus:bg-transparent w-full text-sm text-black px-4 py-3 rounded-md outline-blue-500 transition-all"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <input
                  name="password"
                  type="password"
                  className="bg-gray-100 focus:bg-transparent w-full text-sm text-black px-4 py-3 rounded-md outline-blue-500 transition-all"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                className="py-3 px-6 text-sm tracking-wider font-semibold w-[500px] rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none flex items-center justify-center"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                    Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        </div>
      </div>
    </div>
  );
}
