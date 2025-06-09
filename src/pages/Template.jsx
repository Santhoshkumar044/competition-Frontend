import React, { useState, useEffect } from 'react';
import { Calendar, Edit, Save, ArrowLeft, Plus } from 'lucide-react';

const EventManagementApp = () => {
  const [events, setEvents] = useState([]);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'create', 'edit'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock API functions - replace with your actual API calls
  const mockAPI = {
    getEvents: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return [
        {
          id: 1,
          name: 'Summer Music Festival',
          type: 'seasonal',
          date: '2025-07-15',
          location: 'Central Park',
          description: 'Annual summer music celebration',
          capacity: 5000,
          season: 'summer'
        },
        {
          id: 2,
          name: 'Winter Holiday Market',
          type: 'seasonal',
          date: '2025-12-20',
          location: 'Downtown Square',
          description: 'Holiday shopping and festivities',
          capacity: 2000,
          season: 'winter'
        }
      ];
    },
    
    createEvent: async (eventData) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newEvent = {
        ...eventData,
        id: Date.now(), // Simple ID generation
        type: 'seasonal'
      };
      return newEvent;
    },
    
    updateEvent: async (id, eventData) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { ...eventData, id };
    }
  };

  // Load events on component mount
  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const eventsData = await mockAPI.getEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error('Failed to load events:', error);
      }
      setLoading(false);
    };
    
    loadEvents();
  }, []);

  // Event Form Component
  const EventForm = ({ event = null, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      name: event?.name || '',
      date: event?.date || '',
      location: event?.location || '',
      description: event?.description || '',
      capacity: event?.capacity || '',
      season: event?.season || 'spring'
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleSubmit = async () => {
      setIsSubmitting(true);
      
      try {
        if (event) {
          // Update existing event
          const updatedEvent = await mockAPI.updateEvent(event.id, formData);
          onSave(updatedEvent, 'update');
        } else {
          // Create new event
          const newEvent = await mockAPI.createEvent(formData);
          onSave(newEvent, 'create');
        }
      } catch (error) {
        console.error('Failed to save event:', error);
      }
      
      setIsSubmitting(false);
    };

    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {event ? 'Edit Event' : 'Create New Event'}
          </h2>
          <button
            onClick={onCancel}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            Back
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Season
              </label>
              <select
                name="season"
                value={formData.season}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
                <option value="fall">Fall</option>
                <option value="winter">Winter</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event location"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Capacity
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Maximum attendees"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Event description"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save size={20} />
              {isSubmitting ? 'Saving...' : 'Save Event'}
            </button>
            <button
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Event Card Component
  const EventCard = ({ event, onEdit }) => {
    const seasonColors = {
      spring: 'bg-green-100 text-green-800',
      summer: 'bg-yellow-100 text-yellow-800',
      fall: 'bg-orange-100 text-orange-800',
      winter: 'bg-blue-100 text-blue-800'
    };

    return (
      <div 
        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => onEdit(event)}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{event.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${seasonColors[event.season]}`}>
            {event.season}
          </span>
        </div>
        
        <div className="space-y-2 text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Capacity:</strong> {event.capacity.toLocaleString()}</p>
          <p className="text-sm">{event.description}</p>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Edit size={16} className="text-blue-600" />
        </div>
      </div>
    );
  };

  // Handle event save (create or update)
  const handleEventSave = (savedEvent, action) => {
    if (action === 'create') {
      setEvents(prev => [...prev, savedEvent]);
    } else if (action === 'update') {
      setEvents(prev => prev.map(event => 
        event.id === savedEvent.id ? savedEvent : event
      ));
    }
    
    setCurrentView('list');
    setSelectedEvent(null);
  };

  // Handle event edit
  const handleEventEdit = (event) => {
    setSelectedEvent(event);
    setCurrentView('edit');
  };

  // Handle create new event
  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setCurrentView('create');
  };

  // Handle cancel
  const handleCancel = () => {
    setCurrentView('list');
    setSelectedEvent(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Event Management</h1>
          <p className="text-gray-600">Manage your seasonal events</p>
        </div>

        {/* Main Content */}
        {currentView === 'list' && (
          <div>
            {/* Create Event Button */}
            <div className="mb-6">
              <button
                onClick={handleCreateEvent}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={20} />
                Create Seasonal Event
              </button>
            </div>

            {/* Events Grid */}
            {events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map(event => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onEdit={handleEventEdit}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">No events yet</h3>
                <p className="text-gray-600 mb-4">Create your first seasonal event to get started</p>
                <button
                  onClick={handleCreateEvent}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Create Event
                </button>
              </div>
            )}
          </div>
        )}

        {(currentView === 'create' || currentView === 'edit') && (
          <EventForm
            event={selectedEvent}
            onSave={handleEventSave}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default EventManagementApp;