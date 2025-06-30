import React, { useState } from 'react';
import {
  FaCalendarTimes,
  FaUser,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaEdit,
  FaTrash,
} from 'react-icons/fa';

const MyEventsPage = () => {
  const [myEvents, setMyEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEventIndex, setSelectedEventIndex] = useState(null);
  const [editedEvent, setEditedEvent] = useState({});

  const handleCreateEvent = () => {
    const newEvent = {
      title: 'My Created Event',
      organizer: 'You',
      date: '2025-07-14T17:00:00',
      location: 'Dhaka Conference Center',
      description: 'This is a demo event created by the user.',
      attendees: 24,
      image: 'https://source.unsplash.com/600x300/?event,conference',
    };
    setMyEvents([...myEvents, newEvent]);
  };

  const handleDelete = (index) => {
    const confirm = window.confirm("Are you sure you want to delete this event?");
    if (confirm) {
      setMyEvents(myEvents.filter((_, i) => i !== index));
    }
  };

  const handleUpdate = (index) => {
    setSelectedEventIndex(index);
    setEditedEvent(myEvents[index]);
    setShowModal(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  const handleUpdateSubmit = () => {
    const updatedEvents = [...myEvents];
    updatedEvents[selectedEventIndex] = editedEvent;
    setMyEvents(updatedEvents);
    setShowModal(false);
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
                    <FaCalendarAlt className="mr-2 text-purple-600" /> {new Date(event.date).toLocaleString()}
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
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(index)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md transition flex items-center"
                    >
                      <FaEdit className="mr-1" /> Update
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition flex items-center"
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Update Event</h2>
            <div className="space-y-3">
              <input
                type="text"
                name="title"
                value={editedEvent.title}
                onChange={handleUpdateChange}
                className="w-full border px-4 py-2 rounded-md"
                placeholder="Event Title"
              />
              <input
                type="text"
                name="organizer"
                value={editedEvent.organizer}
                onChange={handleUpdateChange}
                className="w-full border px-4 py-2 rounded-md"
                placeholder="Organizer"
              />
              <input
                type="datetime-local"
                name="date"
                value={editedEvent.date}
                onChange={handleUpdateChange}
                className="w-full border px-4 py-2 rounded-md"
              />
              <input
                type="text"
                name="location"
                value={editedEvent.location}
                onChange={handleUpdateChange}
                className="w-full border px-4 py-2 rounded-md"
                placeholder="Location"
              />
              <textarea
                name="description"
                value={editedEvent.description}
                onChange={handleUpdateChange}
                className="w-full border px-4 py-2 rounded-md"
                placeholder="Description"
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSubmit}
                className="px-4 py-2 bg-purple-600 text-white rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEventsPage;
