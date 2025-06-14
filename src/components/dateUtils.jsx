// Format MongoDB ISO date for datetime-local input
export const formatForInput = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  
  const tzOffset = date.getTimezoneOffset() * 60000;
  const localISOTime = new Date(date - tzOffset).toISOString();
  return localISOTime.slice(0, 16);
};


export const formatForDisplay = (dateString) => {
  if (!dateString) return "N/A";
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true
  };
  return new Date(dateString).toLocaleString('en-US', options);
};

// Separate date and time components
export const splitDateTime = (dateString) => {
  if (!dateString) return { date: "N/A", time: "N/A" };
  const date = new Date(dateString);
  return {
    date: date.toLocaleDateString('en-US'),
    time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  };
};