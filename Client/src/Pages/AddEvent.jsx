import React from 'react';
import { FaPlus } from 'react-icons/fa';

const AddEvent = () => {
  return (
    <div className="max-w-2xl my-12 mx-auto bg-white p-8 rounded-xl shadow">
      <h2 className="text-3xl font-bold mb-6">Create New Event</h2>

      <form className="space-y-6">

        {/* Event Title */}
        <div>
          <label className="block font-medium mb-1">
            Event Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter event title"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Organizer Name */}
        <div>
          <label className="block font-medium mb-1">
            Organizer Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter organizer name"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Date and Time */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">
              Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium mb-1">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter event location"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows="4"
            placeholder="Describe your event..."
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg flex justify-center items-center gap-2"
          >
            <FaPlus /> Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
