/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo } from "react";
import {
    FaUser,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaUsers,
    FaSearch,
} from "react-icons/fa";

const initialEvents = [
    {
        title: "Cloude Context",
        organizer: "Tech Cluder",
        date: "2025-06-27T22:20:00",
        location: "Chattogram",
        description: "This is from tech cluder community.",
        attendees: 0,
    },
    {
        title: "Green Energy Expo",
        organizer: "Lisa Anderson",
        date: "2024-08-10T11:00:00",
        location: "Expo Center",
        description:
            "Discover the latest in renewable energy technologies, sustainable solutions, and environmental innovations.",
        attendees: 156,
    },
    {
        title: "AI & Machine Learning Summit",
        organizer: "David Rodriguez",
        date: "2024-08-05T09:30:00",
        location: "University Conference Hall",
        description:
            "Explore the future of AI and machine learning with expert speakers, demos, and discussions on cutting-edge...",
        attendees: 89,
    },
];

const dateOptions = [
    { label: "All Events", value: "all" },
    { label: "Today", value: "today" },
    { label: "This Week", value: "thisWeek" },
    { label: "Last Week", value: "lastWeek" },
    { label: "This Month", value: "thisMonth" },
    { label: "Last Month", value: "lastMonth" },
];

const EventsPage = () => {
    const [events, setEvents] = useState(initialEvents);
    const [joinedEvents, setJoinedEvents] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filter, setFilter] = useState("all");

    const today = new Date();

    // Filter and Sort Events
    const filteredEvents = useMemo(() => {
        const filtered = events.filter((event) => {
            const eventDate = new Date(event.date);

            // Search filter
            if (
                searchText &&
                !event.title.toLowerCase().includes(searchText.toLowerCase())
            )
                return false;

            // Date filter
            if (filter !== "all") {
                const start = new Date(today);
                const end = new Date(today);

                if (filter === "today") {
                    return (
                        eventDate.toDateString() === today.toDateString()
                    );
                }

                if (filter === "thisWeek") {
                    const firstDay = today.getDate() - today.getDay();
                    start.setDate(firstDay);
                    end.setDate(firstDay + 6);
                }

                if (filter === "lastWeek") {
                    const firstDay = today.getDate() - today.getDay() - 7;
                    start.setDate(firstDay);
                    end.setDate(firstDay + 6);
                }

                if (filter === "thisMonth") {
                    start.setDate(1);
                    end.setMonth(today.getMonth() + 1);
                    end.setDate(0);
                }

                if (filter === "lastMonth") {
                    start.setMonth(today.getMonth() - 1);
                    start.setDate(1);
                    end.setMonth(today.getMonth());
                    end.setDate(0);
                }

                return eventDate >= start && eventDate <= end;
            }

            return true;
        });

        return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [searchText, filter, events]);

    const handleJoin = (index) => {
        if (joinedEvents.includes(index)) return;

        const updatedEvents = [...events];
        updatedEvents[index].attendees += 1;
        setEvents(updatedEvents);
        setJoinedEvents([...joinedEvents, index]);
    };

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
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow-sm hover:bg-purple-600 transition w-full md:w-auto"
                >
                    Clear Filter
                </button>
            </div>


            {/* Events Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event, index) => (
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
        </div>
    );
};

export default EventsPage;
