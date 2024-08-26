import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaClock } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { format } from "date-fns";

const DateTime = () => {
  const { roomId } = useParams();
  const navigateToSummary = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [duration, setDuration] = useState(1);
  const [price, setPrice] = useState("");
  const [initialPrice, setInitialPrice] = useState(""); // New state for initial price
  const [selectedTime, setSelectedTime] = useState("");

  const endTimeLimit = new Date(selectedDate);
  endTimeLimit.setHours(21, 0, 0, 0); // Set to 9:00 PM

  const today = new Date();
  const options = { weekday: "long" };
  const day = today.toLocaleDateString("en-US", options);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await fetch(
          `https://getcabinspace.nagpur.pro/api/calendarSlot/details.php?cs_id=${roomId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const parsedAvailableDates = JSON.parse(data.available_dates);
        setAvailableSlots(parsedAvailableDates);
        setRoom(data);
        setInitialPrice(parseFloat(data.price)); // Store initial price
        setPrice(parseFloat(data.price)); // Set initial price to price state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [roomId]);

  const formatDate = (date) => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getAvailableSlots = (date) => {
    if (!date || !Array.isArray(availableSlots)) return [];
    const formattedDate = formatDate(date);
    const availableDate = availableSlots.find(
      (ad) => ad.date === formattedDate
    );
    return availableDate ? availableDate.available_slots : [];
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(""); // Reset time when date changes
    setDuration(1); // Reset duration to default value
    setPrice(initialPrice); // Reset price to initial price
    setShowDatePicker(false);
  };

  const availableSlotsForDate = getAvailableSlots(selectedDate);

  const handleTimeSelection = () => {
    const p_id = room ? room.p_id : null; // Ensure p_id is defined
    navigateToSummary(`/login/datetime/${roomId}/bookingform`, {
      state: {
        roomID: p_id,
        selectedDate: selectedDate,
        selectedTime: selectedTime,
        duration: duration,
        price: price,
        room_name: room.name,
      },
    });
  };

  const handleTimeSelect = (event) => {
    const selectedTime = event.target.value;
    setSelectedTime(selectedTime);

    const selectedTimeDate = new Date(selectedDate);
    const [hours, minutes, period] = selectedTime.split(/:| /);
    selectedTimeDate.setHours(
      period === "PM" && hours !== "12" ? parseInt(hours) + 12 : parseInt(hours),
      parseInt(minutes)
    );

    const maxDuration = Math.max(
      1,
      Math.floor((endTimeLimit - selectedTimeDate) / (1000 * 60 * 60))
    );

    setDuration(Math.min(duration, maxDuration));
  };

  const handleIncrement = () => {
    const selectedTimeDate = new Date(selectedDate);
    const [hours, minutes, period] = selectedTime.split(/:| /);
    selectedTimeDate.setHours(
      period === "PM" && hours !== "12" ? parseInt(hours) + 12 : parseInt(hours),
      parseInt(minutes)
    );

    const maxDuration = Math.floor((endTimeLimit - selectedTimeDate) / (1000 * 60 * 60));

    if (duration < maxDuration) {
      setDuration(duration + 1);
      setPrice(price + parseFloat(room.price)); // Increase price based on room price
    }
  };

  const handleDecrement = () => {
    if (duration > 1) {
      setDuration(duration - 1);
      setPrice(price - parseFloat(room.price)); // Decrement price based on room price
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="main flex flex-col lg:flex-row gap-4 lg:gap-10 justify-center items-center p-5 lg:p-4"
    style={{
           background: 'rgb(201,213,255)',
           backgroundImage: 'linear-gradient(0deg, rgba(201,213,255,1) 0%, rgba(255,255,255,1) 100%)'
         }}
    >
      <div className="Details flex flex-col justify-center w-full lg:w-1/2 lg:px-4 mt-4 lg:mt-0">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-2xl md:text-3xl font-bold text-center leading-9 tracking-tight text-gray-900">
            Opening Hours
          </h2>
        </div>

        <div className="details2 sm:mx-auto sm:w-full sm:max-w-md mt-2">
          <div className="space-y-4">
            <div>
            <p>{room.name}</p>
              <p>Today ( {day} )</p>
              <p className="font-medium text-lg">
                {room.opening_hours} - {room.closing_hours}
              </p>
            </div>
            <div className="border-2 p-3 px-6 justify-between flex flex-col md:flex-row md:space-x-8 bg-gray-100 rounded-lg">
              <div className="flex items-center mb-4 md:mb-0">
                <FaClock className="text-gray-500 mr-3" />
                <div>
                  <p className="font-semibold">
                    {room.opening_day} - {room.closing_day}
                  </p>
                  <p>
                    {room.opening_hours} - {room.closing_hours}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <FaClock className="text-gray-500 mr-3" />
                <div>
                  <p className="font-semibold">{room.holiday}</p>
                  <p>Holiday</p>
                </div>
              </div>
            </div>

            <div className="calTime mt-2">
              <div className="p-4 bg-white shadow rounded-lg">
                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-medium">
                    Select your desired date
                  </label>
                  <div className="relative">
                    <button
                      className="flex items-center px-4 py-2 border rounded-md bg-white shadow-sm text-sm text-gray-700 focus:outline-none"
                      onClick={() => setShowDatePicker(!showDatePicker)}
                    >
                      <SlCalender className="w-5 h-5 mr-2" />
                      {format(selectedDate, "dd-MM-yyyy")}{" "}
                      {/* Format date as dd-MM-yyyy */}
                    </button>
                  
                    {showDatePicker && (
                      <div className="absolute z-10">
                        <DatePicker
                          selected={selectedDate}
                          onChange={(date) => handleDateChange(date)}
                          inline
                          minDate={new Date()} // Prevent selecting past dates
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-medium">
                    Select your desired time
                  </label>
                  <select
                    onChange={(event) => handleTimeSelect(event)}
                    value={selectedTime}
                    className="w-full px-4 py-2 border rounded-md"
                    disabled={availableSlotsForDate.length === 0}
                  >
                    <option value="">Select time</option>
                    {availableSlotsForDate.map((slot, index) => (
                      <option key={index} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center mb-4">
                  <button
                    onClick={handleDecrement}
                    className="px-4 py-2 border rounded-md bg-gray-200 text-gray-700"
                    disabled={duration <= 1}
                  >
                    -
                  </button>
                  <span className="mx-4 text-xl">{duration} Hour(s)</span>
                  <button
                    onClick={handleIncrement}
                    className="px-4 py-2 border rounded-md bg-gray-200 text-gray-700"
                    disabled={duration >= 10} // Assuming a max duration of 10 hours
                  >
                    +
                  </button>
                </div>

                <div className="text-lg font-bold">
                  Total Price: ${price.toFixed(2)} {/* Display price with two decimal places */}
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleTimeSelection}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="imageContainer w-full lg:w-1/2 flex justify-center items-center mt-4 lg:mt-0">
        <img
          src={room.photos}
          alt="Room"
          className="w-full lg:w-4/5 h-auto object-cover rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default DateTime;
