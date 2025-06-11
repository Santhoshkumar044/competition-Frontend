import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreateEvent = ({ onCreateEvent, onCreateTemplate, templates }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    collegeName: '',
    venueDetails: {
      venueId: '',
      roomName: '',
      capacity: '',
      location: ''
    },
    startTime: '',
    endTime: '',
    eventDate: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('venue.')) {
      const venueField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        venueDetails: {
          ...prev.venueDetails,
          [venueField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.collegeName.trim()) {
      newErrors.collegeName = 'College name is required';
    }

    if (!formData.venueDetails.venueId.trim()) {
      newErrors['venue.venueId'] = 'Venue ID is required';
    }

    if (!formData.venueDetails.roomName.trim()) {
      newErrors['venue.roomName'] = 'Room name is required';
    }

    if (!formData.venueDetails.capacity.trim()) {
      newErrors['venue.capacity'] = 'Capacity is required';
    } else if (isNaN(formData.venueDetails.capacity) || parseInt(formData.venueDetails.capacity) <= 0) {
      newErrors['venue.capacity'] = 'Capacity must be a positive number';
    }

    if (!formData.venueDetails.location.trim()) {
      newErrors['venue.location'] = 'Location is required';
    }

    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    }

    if (!formData.endTime) {
      newErrors.endTime = 'End time is required';
    }

    if (!formData.eventDate) {
      newErrors.eventDate = 'Event date is required';
    }

    // Validate time logic
    if (formData.startTime && formData.endTime) {
      if (formData.startTime >= formData.endTime) {
        newErrors.endTime = 'End time must be after start time';
      }
    }

    // Validate date is not in the past
    if (formData.eventDate) {
      const selectedDate = new Date(formData.eventDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.eventDate = 'Event date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setMessage('Please fix the errors below');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Create template first
      const templateData = {
        ...formData,
        templateName: `${formData.title} Template`,
        createdAt: new Date().toISOString()
      };

      const template = await onCreateTemplate(templateData);
      
      if (template) {
        setMessage('Template created successfully!');
      }

      // Create event
      const event = onCreateEvent(formData);
      
      if (event) {
        setMessage('Event created successfully!');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (error) {
      setMessage('Error creating event. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      collegeName: '',
      venueDetails: {
        venueId: '',
        roomName: '',
        capacity: '',
        location: ''
      },
      startTime: '',
      endTime: '',
      eventDate: ''
    });
    setErrors({});
    setMessage('');
  };

  return (
    <div className="create-event">
      <div className="nav-links">
        <Link to="/" className="btn btn-outline">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="form-container">
        <h2>Create New Event</h2>
        
        {message && (
          <div className={`alert ${message.includes('Error') ? 'alert-error' : 'alert-success'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Basic Event Information */}
          <div className="form-section">
            <h3>Event Information</h3>
            
            <div className="form-group">
              <label htmlFor="title">Event Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`form-control ${errors.title ? 'error' : ''}`}
                placeholder="Enter event title"
              />
              {errors.title && <div className="error-message">{errors.title}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={`form-control ${errors.description ? 'error' : ''}`}
                placeholder="Enter event description"
                rows="4"
              ></textarea>
              {errors.description && <div className="error-message">{errors.description}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="collegeName">College Name *</label>
              <input
                type="text"
                id="collegeName"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleInputChange}
                className={`form-control ${errors.collegeName ? 'error' : ''}`}
                placeholder="Enter college name"
              />
              {errors.collegeName && <div className="error-message">{errors.collegeName}</div>}
            </div>
          </div>

          {/* Venue Details */}
          <div className="form-section">
            <h3>Venue Details</h3>
            
            <div className="grid grid-2">
              <div className="form-group">
                <label htmlFor="venueId">Venue ID *</label>
                <input
                  type="text"
                  id="venueId"
                  name="venue.venueId"
                  value={formData.venueDetails.venueId}
                  onChange={handleInputChange}
                  className={`form-control ${errors['venue.venueId'] ? 'error' : ''}`}
                  placeholder="Enter venue ID"
                />
                {errors['venue.venueId'] && <div className="error-message">{errors['venue.venueId']}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="roomName">Room Name *</label>
                <input
                  type="text"
                  id="roomName"
                  name="venue.roomName"
                  value={formData.venueDetails.roomName}
                  onChange={handleInputChange}
                  className={`form-control ${errors['venue.roomName'] ? 'error' : ''}`}
                  placeholder="Enter room name"
                />
                {errors['venue.roomName'] && <div className="error-message">{errors['venue.roomName']}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="capacity">Capacity *</label>
                <input
                  type="number"
                  id="capacity"
                  name="venue.capacity"
                  value={formData.venueDetails.capacity}
                  onChange={handleInputChange}
                  className={`form-control ${errors['venue.capacity'] ? 'error' : ''}`}
                  placeholder="Enter capacity"
                  min="1"
                />
                {errors['venue.capacity'] && <div className="error-message">{errors['venue.capacity']}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="location">Location *</label>
                <input
                  type="text"
                  id="location"
                  name="venue.location"
                  value={formData.venueDetails.location}
                  onChange={handleInputChange}
                  className={`form-control ${errors['venue.location'] ? 'error' : ''}`}
                  placeholder="Enter location"
                />
                {errors['venue.location'] && <div className="error-message">{errors['venue.location']}</div>}
              </div>
            </div>
          </div>

          {/* Date and Time */}
          <div className="form-section">
            <h3>Date & Time</h3>
            
            <div className="grid grid-3">
              <div className="form-group">
                <label htmlFor="eventDate">Event Date *</label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  className={`form-control ${errors.eventDate ? 'error' : ''}`}
                />
                {errors.eventDate && <div className="error-message">{errors.eventDate}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="startTime">Start Time *</label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className={`form-control ${errors.startTime ? 'error' : ''}`}
                />
                {errors.startTime && <div className="error-message">{errors.startTime}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="endTime">End Time *</label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className={`form-control ${errors.endTime ? 'error' : ''}`}
                />
                {errors.endTime && <div className="error-message">{errors.endTime}</div>}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              onClick={resetForm}
              className="btn btn-outline"
              disabled={loading}
            >
              Reset Form
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Creating...
                </>
              ) : (
                'Create Event'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;