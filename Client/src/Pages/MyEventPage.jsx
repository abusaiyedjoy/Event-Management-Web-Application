import { useContext, useEffect, useState } from "react";
import {
  FaCalendarTimes,
  FaUser,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSequire";
import { AuthContext } from "../Provider/AuthProvider";

const MyEventsPage = () => {
  const [myEvents, setMyEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get("/events").then((res) => {
        const filtered = res.data.filter(
          (event) => event.organizer === user.name
        );
        setMyEvents(filtered);
      });
    }
  }, [axiosSecure, user]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (confirmDelete) {
      try {
        await axiosSecure.delete(`/events/${id}`);
        setMyEvents((prev) => prev.filter((event) => event._id !== id));
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const handleUpdate = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setSelectedEvent({ ...selectedEvent, [name]: value });
  };

  const handleUpdateSubmit = async () => {
    try {
      await axiosSecure.put(`/events/${selectedEvent._id}`, selectedEvent);
      const updated = myEvents.map((event) =>
        event._id === selectedEvent._id ? selectedEvent : event
      );
      setMyEvents(updated);
      setShowModal(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
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
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {myEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
            >
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
                    <FaUsers className="mr-1 text-purple-600" /> {event.attendees || 0} attendees
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(event)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-md"
                    >
                      <FaEdit className="inline mr-1" /> Update
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md"
                    >
                      <FaTrash className="inline mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Update Event</h2>

            <div className="space-y-6">
              <div>
                <label className="block font-medium mb-1">Event Title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="title"
                  value={selectedEvent.title || ""}
                  onChange={handleUpdateChange}
                  placeholder="Enter event title"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Organizer Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="organizer"
                  value={selectedEvent.organizer || ""}
                  onChange={handleUpdateChange}
                  placeholder="Enter organizer name"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block font-medium mb-1">Date <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    name="date"
                    value={selectedEvent.date?.split("T")[0] || ""}
                    onChange={handleUpdateChange}
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-medium mb-1">Time <span className="text-red-500">*</span></label>
                  <input
                    type="time"
                    name="time"
                    value={selectedEvent.date?.split("T")[1]?.slice(0, 5) || ""}
                    onChange={(e) => {
                      const newTime = e.target.value;
                      const datePart = selectedEvent.date?.split("T")[0] || "";
                      const updatedDateTime = new Date(`${datePart}T${newTime}`).toISOString();
                      setSelectedEvent({ ...selectedEvent, date: updatedDateTime });
                    }}
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1">Location <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="location"
                  value={selectedEvent.location || ""}
                  onChange={handleUpdateChange}
                  placeholder="Enter event location"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Description <span className="text-red-500">*</span></label>
                <textarea
                  name="description"
                  value={selectedEvent.description || ""}
                  onChange={handleUpdateChange}
                  rows="4"
                  placeholder="Describe your event..."
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateSubmit}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                >
                  Update Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyEventsPage;
