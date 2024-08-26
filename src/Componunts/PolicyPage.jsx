// PolicyPage.js

import React from "react";

const PolicyPage = () => {
  return (
    <div
      className=""
      style={{
        background: "rgb(201,213,255)",
        backgroundImage:
          "linear-gradient(0deg, rgba(201,213,255,1) 0%, rgba(255,255,255,1) 100%)",
      }}
    >
      <div className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Cancellation Policy
        </h1>

        <div className="bg-white shadow-md rounded-lg px-8 py-6 mb-6">
          <h2 className="text-xl font-bold mb-4">
            Conditions for Cancellation:
          </h2>
          <ul className="list-disc pl-6">
            <li className="mb-3">
              Cancellations made at least 24 hours before the booking time will
              receive a full refund.
            </li>
            <li className="mb-3">
              Cancellations made within 24 hours of the booking time may incur a
              cancellation fee.
            </li>
            <li className="mb-3">
              Non-refundable bookings are specified at the time of booking and
              are subject to the terms agreed upon.
            </li>
          </ul>
        </div>

        <div className="bg-white shadow-md rounded-lg px-8 py-6">
          <h2 className="text-xl font-bold mb-4">Non-refundable Bookings:</h2>
          <p>
            Non-refundable bookings are clearly marked at the time of booking
            and cannot be cancelled or refunded.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
