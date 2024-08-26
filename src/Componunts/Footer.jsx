// Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col items-center">
        <h2 className="text-2xl text-white font-bold mb-4">Get Cabin Space</h2>
        <p className="text-center mb-4">Your solution for booking meeting rooms effortlessly.</p>
        <div className="flex space-x-4 mb-6">
          {/* Social media icons or additional links can be added here */}
        </div>
        <p className="text-sm">&copy; 2024 Get Cabin Space. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
