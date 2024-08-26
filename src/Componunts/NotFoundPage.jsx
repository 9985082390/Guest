import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-400">404</h1>
        <p className="text-2xl font-semibold text-gray-700">Page Not Found</p>
        <p className="mt-4 text-gray-500">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <a href="/" className="mt-6 inline-block px-6 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-700">
          Go to Home
        </a>
      </div>
    </div>
  );
}

export default NotFoundPage;
