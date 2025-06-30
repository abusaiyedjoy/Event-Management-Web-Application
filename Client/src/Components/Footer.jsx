import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPaperPlane, FaCalendarAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-gray-900 bg-white/70 border-t border-gray-300 px-6 md:px-16 py-10 rounded-t-2xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div>
          <div className="flex items-center mb-4">
            <FaCalendarAlt className="text-purple-500 text-2xl mr-2" />
            <span className="text-xl font-semibold">EventHub</span>
          </div>
          <p className="text-gray-600 mb-4">
            The ultimate platform for creating, managing, and discovering amazing events.
          </p>
          <div className="flex gap-4 text-gray-500">
            <FaFacebookF className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
            <FaLinkedinIn className="hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white mb-3">Quick Links</h3>
          <ul className="text-gray-500 space-y-2">
            <li><a href="#">Home</a></li>
            <li><a href="#">Explore Events</a></li>
            <li><a href="#">Create Event</a></li>
            <li><a href="#">My Events</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold text-white mb-3">Resources</h3>
          <ul className="text-gray-500 space-y-2">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        {/* Stay Updated */}
        <div>
          <h3 className="font-semibold text-white mb-3">Stay Updated</h3>
          <p className="text-gray-500 mb-4">Subscribe to our newsletter for the latest updates on events and features.</p>
          <div className="flex rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Your email"
              className="bg-gray-300 text-gray-800 px-4 py-2 w-full focus:outline-none"
            />
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 flex items-center justify-center">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>

      {/* Divider and bottom text */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        © 2025 EventHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
