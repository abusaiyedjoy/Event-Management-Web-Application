import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { BsCalendar3Fill } from "react-icons/bs";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SignIn = () => {
  const axiosPublic = useAxiosPublic();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axiosPublic.post("/login", {
        email,
        password,
      });

      // Save token to localStorage
      localStorage.setItem("token", result.data.token);

      toast.success("Signed in successfully");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 border rounded-xl shadow-md">
        <div className="flex flex-col items-center mb-6">
          <BsCalendar3Fill className="text-4xl text-purple-600 mb-2" />
          <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="flex items-center border rounded-md px-3 py-2 bg-white shadow-sm">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="flex items-center border rounded-md px-3 py-2 bg-white shadow-sm">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full focus:outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-800 text-white py-2 rounded-md hover:opacity-90 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
