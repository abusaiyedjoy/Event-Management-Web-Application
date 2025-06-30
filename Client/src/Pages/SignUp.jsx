import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "./../Provider/AuthProvider";
import { toast } from "react-hot-toast";
import { FaEnvelope, FaLock, FaUser, FaImage } from "react-icons/fa";
import { BsPersonPlusFill } from "react-icons/bs";

const SignUp = () => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    createUser(email, password)
      .then(() => {
        return updateUserProfile({
          displayName: name,
          photoURL: photo,
        });
      })
      .then(() => {
        toast.success("User created successfully");
        navigate("/");
        setName("");
        setEmail("");
        setPassword("");
        setPhoto("");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 border border-gray-200 rounded-xl shadow-md">
        {/* Top Icon and Heading */}
        <div className="flex flex-col items-center mb-6">
          <BsPersonPlusFill className="text-4xl text-purple-600 mb-2" />
          <h2 className="text-2xl font-bold text-center text-gray-900">Create Account</h2>
          <p className="text-gray-500 text-sm mt-1 text-center">
            Join EventHub to create and discover events
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
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

          {/* Email */}
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

          {/* Password */}
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

          {/* Photo URL (optional) */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-800 text-white py-2 rounded-md hover:opacity-90 transition"
          >
            Create Account
          </button>
        </form>

        {/* Footer Link */}
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
