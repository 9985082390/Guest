import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any necessary logout actions here
    navigate('/'); // Redirect to the home page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-center">
        Your booking is currently pending. We will send you a confirmation message via WhatsApp once it's processed.
      </h1>
      {/* <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-center">
      Thanks for filling the application form! Our team will reach out to you soon. In case of any query, chat with us
      </h1> */}
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-black hover:bg-gray-700 text-white font-semibold rounded-md text-sm sm:text-base"
      >
        Logout
      </button>
      {/* <button
        onClick={handleLogout}
        className="px-4 py-2 bg-black hover:bg-gray-700 text-white font-semibold rounded-md text-sm sm:text-base"
      >
        Click to chat
      </button> */}
    </div>
  );
};

export default ThankYou;
