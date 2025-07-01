import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import useAxiosSecure from './../hooks/useAxiosSequire';
import { toast } from 'react-hot-toast';

const AddEvent = () => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    title: '',
    organizer: '',
    date: '',
    time: '',
    location: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventDateTime = new Date(`${formData.date}T${formData.time}`);

    const newEvent = {
      title: formData.title,
      organizer: formData.organizer,
      date: eventDateTime.toISOString(),
      location: formData.location,
      description: formData.description,
      attendees: 0,
    };

    try {
      await axiosSecure.post('/events', newEvent);
      toast.success('Event created successfully!');
      setFormData({ title: '', organizer: '', date: '', time: '', location: '', description: '' });
    } catch (err) {
      console.log(err);
      toast.error('Failed to create event');
    }
  };

  return (
    <div className="max-w-2xl my-12 mx-auto bg-white p-8 rounded-xl shadow">
      <h2 className="text-3xl font-bold mb-6">Create New Event</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-1">Event Title <span className="text-red-500">*</span></label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter event title"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" required />
        </div>

        <div>
          <label className="block font-medium mb-1">Organizer Name <span className="text-red-500">*</span></label>
          <input type="text" name="organizer" value={formData.organizer} onChange={handleChange} placeholder="Enter organizer name"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" required />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1">Date <span className="text-red-500">*</span></label>
            <input type="date" name="date" value={formData.date} onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" required />
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">Time <span className="text-red-500">*</span></label>
            <input type="time" name="time" value={formData.time} onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" required />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Location <span className="text-red-500">*</span></label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Enter event location"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" required />
        </div>

        <div>
          <label className="block font-medium mb-1">Description <span className="text-red-500">*</span></label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Describe your event..."
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" required></textarea>
        </div>

        <div>
          <button type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg flex justify-center items-center gap-2">
            <FaPlus /> Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
