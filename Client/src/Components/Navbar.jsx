import { useState, useEffect, useContext } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { user, signOutUser } = useContext(AuthContext)
      const [dropdownOpen, setDropdownOpen] = useState(false);
      const navigate = useNavigate()
      const handleLogout = () => {
        signOutUser()
          .then(() => {
            toast.success("Logged out successfully");
            setDropdownOpen(false);
            navigate("/")
          })
          .catch((err) => {
            toast.error(err.message);
          });
      }

    const Navlinks = [
        {
            id: "/",
            title: "Home",
        },
        {
            id: "/event",
            title: "Events",
        },
        {
            id: "/add-event",
            title: "Add Events",
        },
        {
            id: "/my-event",
            title: "My Events",
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`w-full border-b border-gray-200 z-40 transition-all duration-300 ${isScrolled
                ? "bg-white backdrop-blur-md shadow-md"
                : "bg-transparent shadow-md"
                }`}
        >
            <div className="px-4 flex items-center justify-between py-4">
                {/* Logo */}
                <div className="flex items-center text-xl font-bold text-purple-700">
                    <FaCalendarAlt className="text-purple-700 text-xl mr-2" />
                    <span className="text-black">EventHub</span>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-4 lg:space-x-8 text-lg">
                    {Navlinks.map((item, index) => (
                        <li key={index}>
                            <Link
                                to={item.id}
                                className="hover:text-purple-500 text-gray-800 transition-colors duration-300"
                            >
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex justify-center space-x-4 items-center">
                    {/* Right Side*/}
                    <div className="relative">
                        {!user ? (
                            <Link to="/signin"

                                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                            >
                                Sign In
                            </Link>
                        ) : (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center space-x-2 bg-purple-100 rounded-full px-3 py-2 hover:bg-purple-200 transition"
                                >
                                    <FaUserCircle className="text-xl text-purple-900" />
                                    <span className="text-sm text-black">▼</span>
                                </button>
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow rounded py-2 z-10">
                                        <div className="px-4 py-2 text-gray-800">{user.displayName}</div>
                                        <hr className="text-gray-300" />
                                        <button
                                            onClick={handleLogout}
                                            className="w-full cursor-pointer px-4 py-2 text-left text-red-600 hover:bg-gray-100 flex items-center gap-2"
                                        >
                                            <FaSignOutAlt />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end items-center md:hidden gap-2">

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className=" focus:outline-none text-gray-800"
                        >
                            {isMenuOpen ? <IoCloseSharp size={26} />
                                : <HiOutlineMenuAlt2 size={26} />}
                        </button>
                    </div>
                </div>

            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white/50 pb-6 px-5">
                    <ul className="space-y-4 py-4">
                        {Navlinks.map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.id}
                                    className="block text-lg font-md hover:text-purple-500 transition-colors duration-300"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="w-full">
                        <Link to={"/signin"} className="w-full bg-purple-800 text-white py-2 px-5 rounded-md hover:opacity-90 transition">
                            Sign In
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
