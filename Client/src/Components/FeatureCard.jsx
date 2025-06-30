import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { PiPaintBrushBold, PiSpeakerHighBold, PiChartBarBold } from "react-icons/pi";

const events = [
  {
    id: 1,
    title: "Design Thinking Workshop",
    category: "Design",
    icon: <PiPaintBrushBold className="mr-2 text-purple-600" />,
    date: "Jul 12",
    location: "Creative Space, Art District",
    description: "Master the design thinking process through hands-on exercises and real-world examples.",
    attendees: 32,
    featured: true,
    past: true,
  },
  {
    id: 2,
    title: "Tech Conference 2024",
    category: "Technology",
    icon: <PiSpeakerHighBold className="mr-2 text-purple-600" />,
    date: "Jul 15",
    location: "Convention Center, Downtown",
    description: "Join us for the biggest tech conference of the year featuring keynotes from industry leaders.",
    attendees: 45,
    featured: true,
    past: true,
  },
  {
    id: 3,
    title: "Digital Marketing Workshop",
    category: "Marketing",
    icon: <PiChartBarBold className="mr-2 text-purple-600" />,
    date: "Jul 20",
    location: "Business Hub, Suite 200",
    description: "Learn the latest digital marketing strategies and tools in this hands-on workshop.",
    attendees: 28,
    featured: true,
    past: true,
  },
];

const FeaturedEvents = () => {
  return (
    <section className="py-10 px-4 md:px-10">
      <h2 className="text-2xl font-semibold mb-6">Featured Events</h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1 w-full max-w-sm"
          >
            <div className="relative h-36 bg-gradient-to-t from-gray-900 to-gray-600">
              {event.featured && (
                <span className="absolute top-3 left-3 bg-yellow-400 text-sm px-2 py-1 rounded text-black font-semibold">
                  Featured
                </span>
              )}
              <span className="absolute bottom-2 left-3 text-white text-sm">Past Event</span>
            </div>

            <div className="p-5 flex flex-col h-full">
              <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                <div className="flex items-center">{event.icon}{event.category}</div>
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-1 text-purple-600" />
                  {event.date}
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-2">{event.title}</h2>

              <div className="text-sm text-gray-600 space-y-1 mb-4">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-purple-600" />
                  {event.location}
                </div>
              </div>

              <p className="text-gray-700 text-sm flex-grow">{event.description}</p>

              <div className="flex justify-between items-center mt-5 text-sm text-gray-600">
                <span className="flex items-center">
                  <FaUsers className="mr-1 text-purple-600" />
                  {event.attendees} attendees
                </span>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-md transition">
                  Join Event
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedEvents;
