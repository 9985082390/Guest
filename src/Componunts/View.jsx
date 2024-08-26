import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const View = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !location.state ||
      !location.state.selectedDate ||
      !location.state.selectedTime ||
      !location.state.duration ||
      !location.state.price
    ) {
      navigate("/login"); // Redirect to login page if state is missing or incomplete
    }
  }, [location.state, navigate]);

  if (
    !location.state ||
    !location.state.selectedDate ||
    !location.state.selectedTime ||
    !location.state.duration ||
    !location.state.price
  ) {
    return null; // Render nothing until state is valid
  }

  const handlePayment = () => {
    // Logic to handle payment processing
    console.log("Processing payment...");
    // Redirect or show confirmation after payment
  };

  const { selectedDate, selectedTime, duration, price } = location.state;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 max-w-sm w-full bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Booking Details</h2>
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
        <div className="payment">
          <button
            onClick={handlePayment}
            className="w-full py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-400 transition duration-300"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default View;
