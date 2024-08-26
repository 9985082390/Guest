import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaWifi, FaParking } from 'react-icons/fa';
import { BiChalkboard } from 'react-icons/bi';
import { MdRouter, MdDesktopWindows, MdBatteryChargingFull } from 'react-icons/md';

// Icon map for space_info
const iconMap = {
  "Free WiFi": <FaWifi title="Free WiFi" />,
  "Air Conditioning": <MdRouter title="Air Conditioning" />,
  "Power Backup": <MdBatteryChargingFull title="Power Backup" />,
  Whiteboard: <BiChalkboard title="Whiteboard" />,
  Projector: <MdDesktopWindows title="Projector" />,
  Parking: <FaParking title="Parking" />,
};

function CalendarSlot() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Hook to navigate

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get('https://getcabinspace.nagpur.pro/api/calendarSlot/list.php');
        const data = response.data.records.map(slot => {
          // Parse data and ensure correct format
          const spaceInfo = Array.isArray(JSON.parse(slot.space_info)) ? JSON.parse(slot.space_info) : [];
          const suitedFor = Array.isArray(JSON.parse(slot.suited_for)) ? JSON.parse(slot.suited_for) : [];

          return {
            ...slot,
            available_dates: JSON.parse(slot.available_dates) || [],
            space_info: spaceInfo.map(space => ({
              type: space,
              icon: iconMap[space] || null,
            })),
            suited_for: suitedFor,
          };
        });
        setSlots(data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  const handleViewDetails = (cs_id) => {
    navigate(`/slotDetail/${cs_id}`);
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div
      className="ROOMS"
      style={{
        background: 'rgb(201,213,255)',
        backgroundImage: 'linear-gradient(0deg, rgba(201,213,255,1) 0%, rgba(255,255,255,1) 100%)'
      }}
    >
      <h1 className="text-sm my-2 text-white p-1 text-center bg-black">
        Explore the features of this property, read reviews, and check availability. Click 'View Room Details' to see specific room information.
      </h1>

      {slots.map(slot => (
        <div
          key={slot.cs_id}
          className="border border-light-gray-300 text-black p-4 md:p-10 rounded-lg flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
        >
          <div className="flex-shrink-0">
            {Array.isArray(slot.photos) && slot.photos.length > 0 && (
              <img
                src={slot.photos[0].src}
                alt={`Photo of ${slot.name}`}
                className="w-full md:w-60 h-60 object-cover rounded cursor-pointer shadow-md"
                onClick={() => handleViewDetails(slot.cs_id)}
              />
            )}
          </div>

          <div className="flex flex-col flex-1 space-y-5">
            <h1 className="text-xl md:text-2xl font-bold text-black">
              {slot.name}
            </h1>
            <span className="text-xs md:text-sm font-semibold text-gray-600">
              {slot.opening_hours} - {slot.closing_hours}
            </span>

            <span className="text-xs md:text-sm font-semibold  text-gray-600">
              Room Capacity: <span className="text-base font-extrabold">{slot.no_of_seats}</span>
            </span>

            <div className="icon flex text-xl md:text-2xl space-x-7">
              {slot.space_info.map((info, index) => (
                <span key={index} className="text-black">
                  {info.icon}
                </span>
              ))}
            </div>
            <div>
              <p className="text-xs md:text-sm font-semibold">
                Suited for: {slot.suited_for.join(" | ")}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-2 md:space-y-0 md:w-1/3">
            <div className="flex flex-col space-y-1 md:items-end">
              <p className="text-xs md:text-sm">Price Starts From</p>
              <span className="text-lg md:text-2xl font-semibold">
                ₹ {slot.price} /hr
              </span>
              <span className="text-xs md:text-sm text-gray-600">
                *Includes taxes
              </span>
              <button
                className="bg-black text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-gray-800 transition duration-300 text-xs md:text-sm"
                onClick={() => handleViewDetails(slot.cs_id)}
              >
                View Room Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CalendarSlot;
