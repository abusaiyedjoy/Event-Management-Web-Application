import React, { useState } from 'react';
import { FaCalendarTimes, FaUser, FaCalendarAlt, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

const MyEventsPage = () => {
  const [myEvents, setMyEvents] = useState([]);

  const handleCreateEvent = () => {
    // Mocked event creation — replace with real form logic later
    const newEvent = {
      title: 'My Created Event',
      organizer: 'You',
      date: 'Sunday, July 14, 2025 at 5:00 PM',
      location: 'Dhaka Conference Center',
      description: 'This is a demo event created by the user.',
      attendees: 24,
      image: 'https://source.unsplash.com/600x300/?event,conference',
    };
    setMyEvents([...myEvents, newEvent]);
  };

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">My Events</h1>
      <p className="text-gray-600 mb-8">Manage your created events</p>

      {myEvents.length === 0 ? (
        <div className="text-center mt-20">
          <FaCalendarTimes className="mx-auto text-6xl text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-1">No events yet</h2>
          <p className="text-gray-600 mb-4">Create your first event to get started!</p>
          <button
            onClick={handleCreateEvent}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition"
          >
            Create Event
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {myEvents.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
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
                    Manage
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEventsPage;
