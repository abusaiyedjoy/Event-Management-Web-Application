import { FaUser, FaCalendarAlt, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";



const FeaturedEvents = () => {
  const [joinedEvents, setJoinedEvents] = useState([]);
  const axiosPublic = useAxiosPublic();

  const { data: events = [] } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const res = await axiosPublic.get('/events');
      console.log("Fetched events data 👇:", res.data);
      return Array.isArray(res.data) ? res.data : [];
    }
  });


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
        {events?.slice(0, 3).map((event, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <div className="p-5 flex flex-col h-full">
              <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>

              <div className="text-sm text-gray-600 space-y-1 mb-4">
                <div className="flex items-center">
                  <FaUser className="mr-2 text-purple-600" />{" "}
                  {event.organizer}
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-purple-600" />{" "}
                  {new Date(event.date).toLocaleString()}
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-purple-600" />{" "}
                  {event.location}
                </div>
              </div>

              <p className="text-gray-700 text-sm flex-grow">
                {event.description}
              </p>

              <div className="flex justify-between items-center mt-5">
                <span className="flex items-center text-sm text-gray-600">
                  <FaUsers className="mr-1 text-purple-600" />{" "}
                  {event.attendees} attendees
                </span>
                <button
                  onClick={() => handleJoin(events.indexOf(event))}
                  disabled={joinedEvents.includes(events.indexOf(event))}
                  className={`${joinedEvents.includes(events.indexOf(event))
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                    } text-white px-4 py-1.5 rounded-md transition`}
                >
                  {joinedEvents.includes(events.indexOf(event))
                    ? "Joined"
                    : "Join Event"}
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
