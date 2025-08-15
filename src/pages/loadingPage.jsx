import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OauthSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const role = params.get('role');
    const hasProfile = params.get('hasProfile') === 'true';

    fetch('https://competition-backend-1-ewes.onrender.com/api/me', {
      credentials: 'include',
    })
    .then(res => res.ok ? res.json() : null)
    .then(user => {
      if (!user) {
        navigate('/login');
        return;
      }
      if (role === 'host') {
        navigate('/host-dashboard');
      } else if (hasProfile) {
        navigate('/user');
      } else {
        navigate('/profile');
      }
    })
    .catch(() => {
      navigate('/login');
    });
  }, [location, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 text-white px-4">
      <svg
        className="animate-spin -ml-1 mr-3 h-16 w-16 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" cy="12" r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" 
        />
      </svg>
      <h2 className="text-2xl font-semibold mb-2">Logging you in...</h2>
      <p className="max-w-md text-center text-indigo-200">
        Please wait while we securely sign you in and prepare your dashboard.
      </p>
    </div>
  );
};

export default OauthSuccessPage;
