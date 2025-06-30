import React from 'react';
import { FaCalendarAlt, FaUsers, FaSearch } from 'react-icons/fa';
import FeaturedEvents from '../Components/FeatureCard';
import ExtraSection from '../Components/ExtraSection';

const LandingPage = () => {
  return (
    <div className="w-full mt-6">
      {/* Banner Section */}
      <div
        className="bg-cover bg-center rounded-2xl text-white relative overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
        }}
      >
        <div className="bg-purple-800/40 rounded-2xl py-16 md:py-24 px-5 lg:p-30 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to EventHub</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-6">
            Your ultimate platform for creating, managing, and discovering amazing events.
            Join thousands of event organizers and attendees in building memorable experiences.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-purple-700 font-semibold px-6 py-2 rounded-full shadow hover:bg-purple-100 transition">
              Explore Events
            </button>
            <button className="border border-white text-white font-semibold px-6 py-2 rounded-full hover:bg-white hover:text-purple-700 transition">
              Create Event
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-black px-6 md:px-16 pb-12">
        <div className="bg-gray-50 cursor-pointer hover:scale-105 easy-in-out duration-150 rounded-xl p-6 shadow-md text-center">
          <FaCalendarAlt className="text-purple-700 text-3xl mb-2 mx-auto" />
          <h3 className="font-bold text-lg mb-1">Easy Event Creation</h3>
          <p>Create and manage your events with our intuitive interface. Add all the details your attendees need to know.</p>
        </div>
        <div className="bg-gray-50 cursor-pointer hover:scale-105 easy-in-out duration-150 rounded-xl p-6 shadow-md text-center">
          <FaUsers className="text-purple-700 text-3xl mb-2 mx-auto" />
          <h3 className="font-bold text-lg mb-1">Community Driven</h3>
          <p>Connect with like-minded people and discover events that match your interests and passions.</p>
        </div>
        <div className="bg-gray-50 cursor-pointer hover:scale-105 easy-in-out duration-150 rounded-xl p-6 shadow-md text-center">
          <FaSearch className="text-purple-700 text-3xl mb-2 mx-auto" />
          <h3 className="font-bold text-lg mb-1">Smart Discovery</h3>
          <p>Use our advanced search and filtering system to find exactly the events you're looking for.</p>
        </div>
      </div>

      {/* Features Cards */}
      <FeaturedEvents/>

      {/* Extra Section */}
      <ExtraSection/>
    </div>
  );
};

export default LandingPage;
