import { FaUser, FaCalendarAlt, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

const events = [
  {
    id: 1,
    title: "Design Thinking Workshop",
    organizer: "Alice Johnson",
    date: "2025-07-12T10:00:00",
    location: "Creative Space, Art District",
    description: "Master the design thinking process through hands-on exercises and real-world examples.",
    attendees: 32,
  },
  {
    id: 2,
    title: "Tech Conference 2025",
    organizer: "John Smith",
    date: "2025-07-15T09:30:00",
    location: "Convention Center, Downtown",
    description: "Join us for the biggest tech conference of the year featuring keynotes from industry leaders.",
    attendees: 45,
  },
  {
    id: 3,
    title: "Digital Marketing Bootcamp",
    organizer: "Sara Lee",
    date: "2025-07-20T14:00:00",
    location: "Business Hub, Suite 200",
    description: "Learn the latest digital marketing strategies and tools in this hands-on workshop.",
    attendees: 28,
  },
];

const FeaturedEvents = () => {
  const [joinedEvents, setJoinedEvents] = useState([]);

  const handleJoin = (index) => {
    if (!joinedEvents.includes(index)) {
      setJoinedEvents([...joinedEvents, index]);
    }
  };

  return (
    <section className="py-12 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-center mb-10 text-purple-700">
        Featured Events
      </h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <div className="p-5 flex flex-col h-full">
              <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>

              <div className="text-sm text-gray-600 space-y-1 mb-4">
                <div className="flex items-center">
                  <FaUser className="mr-2 text-purple-600" />
                  {event.organizer}
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-purple-600" />
                  {new Date(event.date).toLocaleString()}
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-purple-600" />
                  {event.location}
                </div>
              </div>

              <p className="text-gray-700 text-sm flex-grow">{event.description}</p>

              <div className="flex justify-between items-center mt-5">
                <span className="flex items-center text-sm text-gray-600">
                  <FaUsers className="mr-1 text-purple-600" />
                  {event.attendees} attendees
                </span>
                <button
                  onClick={() => handleJoin(index)}
                  disabled={joinedEvents.includes(index)}
                  className={`${
                    joinedEvents.includes(index)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700"
                  } text-white px-4 py-1.5 rounded-md transition`}
                >
                  {joinedEvents.includes(index) ? "Joined" : "Join Event"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/event"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition"
        >
          View All Events
        </Link>
      </div>
    </section>
  );
};

export default FeaturedEvents;
