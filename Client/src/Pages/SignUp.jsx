import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaUser, FaImage } from "react-icons/fa";
import { BsPersonPlusFill } from "react-icons/bs";
import { AuthContext } from "../Provider/AuthProvider";

const SignUp = () => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("All fields except photo are required.");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    try {
      await register(name, email, password, photo);
      toast.success("Registered and logged in successfully");
      navigate("/"); // Redirect after successful signup/login
    } catch (err) {
      // Show backend error message if exists
      toast.error(err.response?.data?.message || err.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 border border-gray-200 rounded-xl shadow-md">
        <div className="flex flex-col items-center mb-6">
          <BsPersonPlusFill className="text-4xl text-purple-600 mb-2" />
          <h2 className="text-2xl font-bold text-center">Create Account</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <div className="flex items-center border rounded-md px-3 py-2 bg-white shadow-sm">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full focus:outline-none"
                required
              />
            </div>
          </div>

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

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="flex items-center border rounded-md px-3 py-2 bg-white shadow-sm">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full focus:outline-none"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1 ml-1">Must be at least 6 characters</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Photo URL (optional)</label>
            <div className="flex items-center border rounded-md px-3 py-2 bg-white shadow-sm">
              <FaImage className="text-gray-400 mr-2" />
              <input
                type="text"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                placeholder="Enter profile photo URL"
                className="w-full focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-800 text-white py-2 rounded-md hover:opacity-90 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-700">
          Already have an account?{" "}
          <Link to="/signin" className="text-purple-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
