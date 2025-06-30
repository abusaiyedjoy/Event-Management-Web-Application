import React from 'react';
import { FaUser, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaSearch } from 'react-icons/fa';

const events = [
    {
        title: 'Cloude Context',
        organizer: 'Tech Cluder',
        date: 'Friday, June 27, 2025 at 10:20 PM',
        location: 'chattogram',
        description: 'This is from tech cluder community.',
        attendees: 0,
    },
    {
        title: 'Green Energy Expo',
        organizer: 'Lisa Anderson',
        date: 'Saturday, August 10, 2024 at 11:00 AM',
        location: 'Expo Center',
        description:
            'Discover the latest in renewable energy technologies, sustainable solutions, and environmental innovations.',
        attendees: 156,
    },
    {
        title: 'AI & Machine Learning Summit',
        organizer: 'David Rodriguez',
        date: 'Monday, August 5, 2024 at 9:30 AM',
        location: 'University Conference Hall',
        description:
            'Explore the future of AI and machine learning with expert speakers, demos, and discussions on cutting-edge...',
        attendees: 89,
    },
];

const EventsPage = () => {
    return (
        <div className="px-4 py-8 max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-center">All Events</h1>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-10">
                <div className="relative w-full md:w-1/3">
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search Events"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        defaultValue="digi"
                    />
                </div>
                <select className="p-2 border border-gray-300 rounded-lg shadow-sm w-full md:w-1/4">
                    <option>All Events</option>
                    <option> Events 1</option>
                    <option> Events 2</option>
                    <option> Events 3</option>
                </select>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg shadow-md transition">
                    Apply Filters
                </button>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
                    >

                        <div className="p-5 flex flex-col h-full">
                            <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>

                            <div className="text-sm text-gray-600 space-y-1 mb-4">
                                <div className="flex items-center">
                                    <FaUser className="mr-2 text-purple-600" /> {event.organizer}
                                </div>
                                <div className="flex items-center">
                                    <FaCalendarAlt className="mr-2 text-purple-600" /> {event.date}
                                </div>
                                <div className="flex items-center">
                                    <FaMapMarkerAlt className="mr-2 text-purple-600" /> {event.location}
                                </div>
                            </div>

                            <p className="text-gray-700 text-sm flex-grow">{event.description}</p>

                            <div className="flex justify-between items-center mt-5">
                                <span className="flex items-center text-sm text-gray-600">
                                    <FaUsers className="mr-1 text-purple-600" /> {event.attendees} attendees
                                </span>
                                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-md transition">
                                    Join Event
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventsPage;
