import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { FaClock } from 'react-icons/fa';
import { SlCalender } from 'react-icons/sl';
import { useUser } from '../UserContext';

function SlotDetail() {
  const { p_id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [slot, setSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [duration, setDuration] = useState(1);
  const [price, setPrice] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [initialPrice, setInitialPrice] = useState(0);
  const [remainingFreeHours, setRemainingFreeHours] = useState(0);
  const [userEmail, setUserEmail] = useState(user?.email || "");

  const endTimeLimit = new Date(selectedDate);
  endTimeLimit.setHours(21, 0, 0, 0); // Cap end time to 9:00 PM

  const today = new Date();
  const options = { weekday: "long" };
  const day = today.toLocaleDateString("en-US", options);

  useEffect(() => {
    const fetchSlotDetail = async () => {
      try {
        // Fetch slot details
        const response = await axios.get('https://getcabinspace.nagpur.pro/api/calendarSlot/list.php');
        const slots = response.data.records.map(slot => ({
          ...slot,
          available_dates: JSON.parse(slot.available_dates)
        }));

        // Find selected slot
        const parsed_p_id = parseInt(p_id, 10);
        const selectedSlot = slots.find(slot => parseInt(slot.p_id, 10) === parsed_p_id);

        setSlot(selectedSlot || {});
        if (selectedSlot) {
          setInitialPrice(parseFloat(selectedSlot.price));
          setPrice(parseFloat(selectedSlot.price));
        } else {
          console.error(`No slot found for p_id: ${parsed_p_id}`);
        }

        // Fetch user role and free hours
        const userResponse = await axios.get(`https://getcabinspace.nagpur.pro/api/user/getUserRole.php?email=${userEmail}`);
        if (userResponse.data.success) {
          const { free_hours } = userResponse.data;
          setRemainingFreeHours(free_hours);
        } else {
          console.error("Failed to fetch user data:", userResponse.data);
          setError("Failed to fetch user data");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchSlotDetail();
    }
  }, [p_id, userEmail]);

  useEffect(() => {
    // Update price whenever initialPrice or remainingFreeHours changes
    if (slot) {
      updatePrice(duration);
    }
  }, [initialPrice, remainingFreeHours, slot, duration]);

  const formatDate = (date) => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getAvailableSlots = (date) => {
    if (!date || !Array.isArray(slot?.available_dates)) return [];
    const formattedDate = formatDate(date);
    const availableDate = slot.available_dates.find(ad => ad.date === formattedDate);
    return availableDate ? availableDate.available_slots : [];
  };

  const updatePrice = (newDuration) => {
    if (newDuration > remainingFreeHours) {
      const extraHours = newDuration - remainingFreeHours;
      setPrice(extraHours * parseFloat(slot.price));
    } else {
      setPrice(0); // Price is free if within free hours
    }
  };

  const handleTimeSelection = async () => {
    try {
      // Navigate to member booking form
      navigate(`/${p_id}/memberbookingform`, {
        state: {
          p_id: p_id,
          selectedDate: selectedDate,
          selectedTime: selectedTime,
          duration: duration,
          price: price,
          room_name: slot.name,
        },
      });

      // Deduct hours from free hours
      if (user.role === 'member' && remainingFreeHours >= duration) {
        const updatedFreeHours = remainingFreeHours - duration;
        await axios.post('https://getcabinspace.nagpur.pro/api/user/updateFreeHours.php', {
          email: userEmail,
          hours: duration
        });

        // Update local state
        setRemainingFreeHours(updatedFreeHours);
      }
    } catch (err) {
      console.error('Error updating free hours:', err);
    }
  };

  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 15);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(""); // Reset time when date changes
    setDuration(1); // Reset duration to default value
  
    // Calculate the price based on remaining free hours
    if (remainingFreeHours > 0) {
      if (remainingFreeHours >= duration) {
        setPrice(0); // Price is free if remainingFreeHours can cover the duration
      } else {
        setPrice(initialPrice); // Otherwise, use initialPrice
      }
    } else {
      setPrice(initialPrice); // Default to initialPrice if no free hours are left
    }
  
    setShowDatePicker(false);
  };
  
  const handleTimeSelect = (timeSlot) => {
    if (!timeSlot) {
      console.error("Selected time is undefined or empty.");
      return;
    }
  
    setSelectedTime(timeSlot);
    setShowTimePicker(false);
  
    // Reset price to initialPrice when selecting a new time
    setPrice(initialPrice);
  
    // Parse the selected time to calculate duration
    const [hours, minutes, period] = timeSlot.split(/:| /);
  
    if (!hours || !minutes || !period) {
      console.error("Time format is invalid.");
      return;
    }
  
    const selectedTimeDate = new Date(selectedDate);
    selectedTimeDate.setHours(
      period === "PM" && hours !== "12" ? parseInt(hours) + 12 : parseInt(hours),
      parseInt(minutes)
    );
  
    const maxDuration = Math.max(
      1,
      Math.floor((endTimeLimit - selectedTimeDate) / (1000 * 60 * 60))
    );
  
    setDuration(prevDuration => {
      const newDuration = Math.min(prevDuration, maxDuration);
      updatePrice(newDuration); // Update price based on the new duration
      return newDuration;
    });
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
      setDuration(prevDuration => {
        const newDuration = prevDuration + 1;
        updatePrice(newDuration);
        return newDuration;
      });
    }
  };

  const handleDecrement = () => {
    if (duration > 1) {
      setDuration(prevDuration => {
        const newDuration = prevDuration - 1;
        updatePrice(newDuration);
        return newDuration;
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const availableSlotsForDate = getAvailableSlots(selectedDate);

  return (
    <div
      className="main flex flex-col lg:flex-row gap-4 lg:gap-10 justify-center items-center p-5 lg:p-4"
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
              <p>{slot.name}</p>
              <p>Today ( {day} )</p>
              <p className="font-medium text-lg">
                {slot.opening_hours} - {slot.closing_hours}
              </p>
            </div>
            <div className="border-2 p-3 px-6 justify-between flex flex-col md:flex-row md:space-x-8 bg-gray-100 rounded-lg">
              <div className="flex items-center mb-4 md:mb-0">
                <FaClock className="text-gray-500 mr-3" />
                <div>
                  <p className="font-semibold">
                    {slot.opening_day} - {slot.closing_day}
                  </p>
                  <p>
                    {slot.opening_hours} - {slot.closing_hours}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <FaClock className="text-gray-500 mr-3" />
                <div>
                  <p className="font-semibold">{slot.holiday}</p>
                  <p>Holiday</p>
                </div>
              </div>
            </div>

            <div className="calTime mt-2"> 
              <div className="p-4 bg-white shadow rounded-lg">
                <div className="my-4 text-center font-bold">
                  <p className="text-sm text-gray-500">
                    Remaining Free Hours: {Math.max(remainingFreeHours - (duration - 1), 0)} hours
                  </p>
                </div> 
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
                      {format(selectedDate, "dd-MM-yyyy")}
                    </button>
                    {showDatePicker && (
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => {handleDateChange(date)}}
                        inline
                        minDate={new Date()} // Prevent selecting past dates
                          // maxDate={maxDate} // Prevent selecting dates more than 15 days from today

                        dateFormat="dd-MM-yyyy"
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between">
                  <div className="mb-2 md:mb-0">
                    <label className="block text-gray-700 text-sm font-medium">
                      Choose an available time slot.
                    </label>
                    <div className="relative">
                      <button
                        className="flex items-center px-4 py-2 border rounded-md bg-white shadow-sm text-sm text-gray-700 focus:outline-none"
                        onClick={() => setShowTimePicker(!showTimePicker)}
                      >
                        <FaClock className="w-5 h-5 mr-2" />
                        {selectedTime || "Select a time slot"}
                      </button>
                      {showTimePicker && (
                        <div className="absolute z-10 mt-2 w-full md:w-40 bg-white border rounded-md shadow-lg">
                          {availableSlotsForDate.length > 0 ? (
                            availableSlotsForDate.map((timeSlot, index) => (
                              <div
                                key={index}
                                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => {
                                  handleTimeSelect(timeSlot);
                                  setShowTimePicker(false);
                                  setDuration(1);
                                }}
                              >
                                {timeSlot}
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-red-500">
                              No Slots
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-medium">
                      Duration
                    </label>
                    <div className="flex items-center">
                      <button
                        className="px-4 py-2 border rounded-md bg-white shadow-sm text-sm text-gray-700 focus:outline-none"
                        onClick={handleDecrement}
                      >
                        -
                      </button>
                      <span className="mx-4 text-lg font-medium">
                        {duration} {duration === 1 ? "hr" : "hrs"}
                      </span>
                      <button
                        className="px-4 py-2 border rounded-md bg-white shadow-sm text-sm text-gray-700 focus:outline-none"
                        onClick={handleIncrement}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between bg-blue-100 p-3 rounded-lg">
                  <p>Total</p>
                  <span className="text-xl font-semibold">₹ {price}</span>
                </div>

                <div className="login my-2">
                  <button
                    onClick={handleTimeSelection}
                    disabled={!selectedDate || !selectedTime}
                    className={`w-full bg-blue-500 hover:bg-blue-400 text-white py-2 rounded ${
                      !selectedDate || !selectedTime
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    Confirm Booking
                  </button>
                </div>

                <div className="text-center mt-4 text-sm text-red-700">
                  *Review our{" "}
                  <Link to="/policy" className="underline font-semibold">
                    cancellation policy
                  </Link>{" "}
                  before confirming your booking.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlotDetail;
