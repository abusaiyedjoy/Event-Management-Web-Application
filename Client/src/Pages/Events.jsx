/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaUser, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaSearch } from "react-icons/fa";

const dateOptions = [
  { label: "All Events", value: "all" },
  { label: "Today", value: "today" },
  { label: "This Week", value: "thisWeek" },
  { label: "Last Week", value: "lastWeek" },
  { label: "This Month", value: "thisMonth" },
  { label: "Last Month", value: "lastMonth" },
];

const EventsPage = () => {
  const axiosPublic = useAxiosPublic();
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("all");
  const [joinedEvents, setJoinedEvents] = useState([]);

  const today = new Date();

  const { data: events = [], refetch } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosPublic.get("/events");
      return res.data;
    },
  });

  const handleJoin = async (eventId) => {
    if (joinedEvents.includes(eventId)) return;
    try {
      await axiosPublic.patch(`/events/${eventId}/join`);
      setJoinedEvents([...joinedEvents, eventId]);
      refetch();
    } catch (error) {
      console.error("Failed to join event:", error);
    }
  };

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        const eventDate = new Date(event.date);
        if (searchText && !event.title.toLowerCase().includes(searchText.toLowerCase()))
          return false;

        if (filter !== "all") {
          const start = new Date(today);
          const end = new Date(today);

          if (filter === "today") {
            return eventDate.toDateString() === today.toDateString();
          }

          if (filter === "thisWeek") {
            const day = today.getDay();
            start.setDate(today.getDate() - day);
            end.setDate(today.getDate() + (6 - day));
          }

          if (filter === "lastWeek") {
            const day = today.getDay();
            start.setDate(today.getDate() - day - 7);
            end.setDate(today.getDate() - day - 1);
          }

          if (filter === "thisMonth") {
            start.setDate(1);
            end.setMonth(today.getMonth() + 1, 0);
          }

          if (filter === "lastMonth") {
            start.setMonth(today.getMonth() - 1, 1);
            end.setMonth(today.getMonth(), 0);
          }

          return eventDate >= start && eventDate <= end;
        }

        return true;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [searchText, filter, events]);

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">All Events</h1>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-10">
        <div className="relative w-full md:w-1/3">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search Events"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <select
          className="p-2 border border-gray-300 rounded-lg shadow-sm w-full md:w-1/4"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {dateOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setSearchText("");
            setFilter("all");
          }}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow-sm"
        >
          Clear Filter
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-xl shadow-lg p-5 flex flex-col hover:shadow-2xl"
          >
            <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
            <div className="text-sm text-gray-600 space-y-1 mb-4">
              <div className="flex items-center"><FaUser className="mr-2" /> {event.organizer}</div>
              <div className="flex items-center"><FaCalendarAlt className="mr-2" /> {new Date(event.date).toLocaleString()}</div>
              <div className="flex items-center"><FaMapMarkerAlt className="mr-2" /> {event.location}</div>
            </div>
            <p className="text-sm text-gray-700 flex-grow">{event.description}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm flex items-center"><FaUsers className="mr-1" /> {event.attendees} attending</span>
              <button
                onClick={() => handleJoin(event._id)}
                disabled={joinedEvents.includes(event._id)}
                className={`${joinedEvents.includes(event._id) ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"} text-white px-4 py-1.5 rounded-md`}
              >
                {joinedEvents.includes(event._id) ? "Joined" : "Join"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
