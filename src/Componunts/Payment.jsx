// Payment.jsx
import React from "react";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const { selectedDate, selectedTime, duration, price } = location.state || {};

  if (!selectedDate || !selectedTime || !duration || !price) {
    return <div>Error: Booking details are missing.</div>;
  }

  const handlePayment = () => {
    // Logic to handle payment processing
    console.log("Processing payment...");
    // Redirect or show confirmation after payment
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 max-w-sm w-full bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
        <div className="mb-4">
          <p className="text-gray-700 font-medium">Selected Date:</p>
          <p className="text-lg">{selectedDate.toDateString()}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 font-medium">Selected Time:</p>
          <p className="text-lg">{selectedTime}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 font-medium">Duration:</p>
          <p className="text-lg">{duration} hour(s)</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 font-medium">Price:</p>
          <p className="text-lg">₹ {price}</p>
        </div>
        <button
          onClick={handlePayment}
          className="w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
