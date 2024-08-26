import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedDate, selectedTime, duration, price, roomID, room_name } = location.state || {};

  useEffect(() => {
    if (!selectedDate || !selectedTime || !duration || !price || !roomID || !room_name) {
      navigate("/date-time"); // Redirect to date-time page if any data is missing
    }
  }, [selectedDate, selectedTime, duration, price, roomID, room_name, navigate]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validDuration = parseInt(duration, 10);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number length
    if (phone.length !== 10) {
      setErrorMessage("Phone number must be exactly 10 digits.");
      return;
    }

    if (isNaN(validDuration) || validDuration <= 0) {
      setErrorMessage("Duration must be a valid positive integer.");
      return;
    }

    // Ensure duration is a valid number
    // const validDuration = duration && Number.isInteger(Number(duration)) ? Number(duration) : 1; // Default to 1 hour if not valid

    // Format the date as dd-MM-yyyy
    const formattedDate = format(selectedDate, "dd-MM-yyyy");

    const bookingData = {
      u_id: 1,
      p_id: roomID,
      name,
      room_name,
      email,
      phone,
      add_on: selectedAddons.join(", "),
      payment_mode: "",
      date: formattedDate,
      o_for_many_hours: validDuration,
      o_start_time: selectedTime,
      price: price ? price.toFixed(2) : "",
      status: "Pending",
      o_details: description,
    };

    console.log("Data to be sent to backend:", bookingData);

    try {
      const response = await fetch("https://getcabinspace.nagpur.pro/api/order/create.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const text = await response.text(); // Get the raw response text

        console.log("Raw response text:", text);

        try {
          const data = JSON.parse(text); // Attempt to parse as JSON
          console.log("Parsed response data:", data);
          localStorage.setItem("newBooking", JSON.stringify(data));
          navigate("/thankyou");
        } catch (error) {
          console.error("Failed to parse response as JSON:", error);
          setErrorMessage("Unexpected response format. Please try again.");
        }
      } else {
        const errorText = await response.text(); // Get the raw response text if response is not ok
        console.error("Server responded with an error:", errorText);
        setErrorMessage("Server responded with an error. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("There was an error submitting your booking. Please try again.");
    }
  };

  const handleAddonChange = (addon) => {
    if (selectedAddons.includes(addon)) {
      setSelectedAddons(selectedAddons.filter(item => item !== addon));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };
  console.log("Selected Time:", selectedTime);

  return (
    <div className="main flex flex-col lg:flex-row gap-4 lg:gap-10 justify-center items-center p-4 lg:p-6"
      style={{
           background: 'rgb(201,213,255)',
           backgroundImage: 'linear-gradient(0deg, rgba(201,213,255,1) 0%, rgba(255,255,255,1) 100%)'
         }}
    >
      <div className="Details flex flex-col justify-center w-full lg:w-1/2 bg-white shadow-lg rounded-lg p-4 lg:p-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-2xl sm:text-3xl font-bold text-center leading-9 tracking-tight text-gray-900">
            Booking Form
          </h2>
        </div>

        <div className="details2 sm:mx-auto sm:w-full sm:max-w-md mt-4">
          <div className="space-y-4">
            <div className="border-2 p-3 px-6 bg-blue-100 rounded-lg">
              <p><strong> {room_name  || "Not provided"}</strong></p>
              <p>Date: {selectedDate ? format(selectedDate, "dd-MM-yyyy") : "Not selected"}</p>
              <p>Time: {selectedTime || "Not selected"}</p>
              <p>Duration: {validDuration || "Not selected"} hours</p>
              <p>Price: ₹{price ? price.toFixed(2) : "Not calculated"}</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="flex flex-col">
                <label className="text-gray-700">Name</label>
                <input
                  type="text"
                  className="px-4 py-2 border rounded-md"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col">
              <label className="text-gray-700">Email</label>
              <input
                type="email"
                className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

              <div className="flex flex-col">
                <label className="text-gray-700">Phone</label>
                <input
                  type="number"
                  className={`px-4 py-2 border rounded-md ${phone.length !== 10 ? 'border-red-500' : ''}`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  minLength="10"
                  maxLength="10"
                  placeholder="Enter 10-digit phone number"
                />
                {phone.length !== 10 && (
                  <p className="text-red-500 text-sm mt-1">Phone number must be exactly 10 digits.</p>
                )}
              </div>

              {/* Add-ons section */}
              <div className="flex flex-col">
                <label className="text-gray-700">Add-ons</label>
                <div className="space-y-2 space-x-2">
                  <label className="inline-flex items-center mt-2">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-gray-600"
                      checked={selectedAddons.includes("whiteboard")}
                      onChange={() => handleAddonChange("whiteboard")}
                    />
                    <span className="ml-2">Whiteboard</span>
                  </label>
                  <label className="inline-flex items-center mt-2">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-gray-600"
                      checked={selectedAddons.includes("projector")}
                      onChange={() => handleAddonChange("projector")}
                    />
                    <span className="ml-2">Projector</span>
                  </label>
                </div>
              </div>

              {/* Description textarea */}
              <div className="flex flex-col">
                <label className="text-gray-700">Description</label>
                <textarea
                  className="px-4 py-2 border rounded-md"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter any additional details or requirements"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-black hover:bg-gray-700 text-white font-semibold rounded-md focus:outline-none"
              >
                {/* Request For QR */} Submit
              </button>
            </form>

            {errorMessage && (
              <div className="mt-4 p-4 text-red-700 bg-red-100 rounded-lg">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;