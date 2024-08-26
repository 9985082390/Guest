import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FaWifi, FaParking } from "react-icons/fa";
import { BiChalkboard } from "react-icons/bi";
import { MdRouter, MdDesktopWindows, MdBatteryChargingFull } from "react-icons/md";

const iconMap = {
  "Free WiFi": <FaWifi title="Free WiFi" />,
  "Air Conditioning": <MdRouter title="Air Conditioning" />,
  "Power Backup": <MdBatteryChargingFull title="Power Backup" />,
  Whiteboard: <BiChalkboard title="Whiteboard" />,
  Projector: <MdDesktopWindows title="Projector" />,
  Parking: <FaParking title="Parking" />,
};

const RoomOption = () => {
  const { id } = useParams(); // ol_id
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleViewDetails = (roomId) => {
    const url = `/roomoption/${id}/roomDetails/${roomId}`;
    console.log("Navigating to URL:", url); // Debug log
    navigate(url);
  };
  

  useEffect(() => {
    console.log("ol_id from URL:", id); // Check the ol_id here

    const fetchProperties = async () => {
      try {
        const response = await fetch(
          `https://getcabinspace.nagpur.pro/api/property/list.php?ol_id=${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("API Data:", data); // Log API data to console

        if (data.records && data.records.length > 0) {
          const updatedProperties = data.records.map(property => ({
            ...property,
            photos: JSON.parse(property.photos) || [],
            suited_for: JSON.parse(property.suited_for) || [],
            space_info: JSON.parse(property.space_info).map(space => ({
              type: space,
              icon: iconMap[space] || null,
            })) || [],
            building_info: JSON.parse(property.building_info) || [],
          }));

          setProperties(updatedProperties);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (properties.length === 0) {
    return <p>No properties found.</p>;
  }

  return (
    <div className="ROOMS"
      style={{
        background: 'rgb(201,213,255)',
        backgroundImage: 'linear-gradient(0deg, rgba(201,213,255,1) 0%, rgba(255,255,255,1) 100%)'
      }}
    >
      <h1 className='justify-end text-sm my-2 text-white p-1 text-center bg-black'>
        Explore the features of this property, read reviews, and check availability. Click 'View Room Details' to see specific room information.
      </h1>

      {properties.map(property => (
        <div
          key={property.p_id}
          className="border border-light-gray-300 text-black p-4 md:p-10 rounded-lg flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
        >
          {Array.isArray(property.photos) && property.photos.length > 0 && (
            <img
              src={property.photos[0].src}
              alt={`Photo of ${property.name}`}
              className="w-full md:w-60 h-60 object-cover rounded cursor-pointer shadow-black shadow-md"
              onClick={() => handleViewDetails(property.p_id)}
            />
          )}
          <div className="flex flex-col flex-1 space-y-5">
            <h1 className="text-xl md:text-2xl font-bold text-black">
              {property.name}
            </h1>
            <span className="text-xs md:text-sm font-semibold text-gray-600">
              {property.opening_hours} - {property.closing_hours}
            </span>
            <span className="text-xs md:text-sm font-semibold text-gray-600">
              Room Capacity: <span className="text-base font-extrabold">{property.no_of_seats}</span>
            </span>
            <div className="icon flex text-xl md:text-2xl space-x-7">
              {property.space_info.map((info, index) => (
                <span key={index} className="text-black">
                  {info.icon}
                </span>
              ))}
            </div>
            <div>
              <p className="text-xs md:text-sm font-semibold">
                Suited for: {property.suited_for.join(" | ")}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between space-y-2 md:space-y-0 md:w-1/3">
            <div className="flex justify-between items-center">
              {/* Additional details if needed */}
            </div>
            <div className="flex flex-col space-y-1 md:items-end">
              <p className="text-xs md:text-sm">Price Starts From</p>
              <span className="roomPrice text-lg md:text-2xl font-semibold">
                ₹ {property.price} /hr
              </span>
              <span className="text-xs md:text-sm text-gray-600">
                *Includes taxes
              </span>
              <button
                className="bg-black text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-gray-800 transition duration-300 text-xs md:text-sm"
                onClick={() => handleViewDetails(property.p_id)}
              >
                View Room Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomOption;
