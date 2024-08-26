import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { PiTrainFill, PiCoffeeFill } from "react-icons/pi";
import { MdRestaurant, MdBatteryChargingFull, MdDesktopWindows } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import { FaParking, FaRestroom, FaWifi } from "react-icons/fa";
import { BiChalkboard } from "react-icons/bi";

const iconMap = {
  "Free WiFi": <FaWifi />,
  "Air Conditioning": <TbAirConditioning />,
  "Power Backup": <MdBatteryChargingFull />,
  Whiteboard: <BiChalkboard />,
  Projector: <MdDesktopWindows />,
  Parking: <FaParking />,
  "Free Parking": <FaParking />,
  "Rest Rooms": <FaRestroom />,
  "Coffee/Tea": <PiCoffeeFill />,
  "Near By Metro": <PiTrainFill />,
  "Outside Food Allowed": <MdRestaurant />,
};

const RoomDetails = () => {
  const navigate = useNavigate();
  const { id, roomId } = useParams(); // Extract both parameters from the URL
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogin = () => {
    // Construct the URL with both id and roomId
    navigate(`/roomoption/${id}/roomDetails/${roomId}/login`);
  };

  useEffect(() => {
    console.log("ID from URL:", id); // Debug log
    console.log("Room ID from URL:", roomId); // Debug log

    const fetchRoomData = async () => {
      try {
        const response = await fetch(
          `https://getcabinspace.nagpur.pro/api/property/details.php?p_id=${roomId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRoom(data);
      } catch (error) {
        console.error("Error fetching room data:", error);
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [roomId]);
  
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!room) {
    return (
      <div className="text-center">Error: Unable to fetch room details.</div>
    );
  }

  const parseArray = (str) => {
    try {
      return JSON.parse(str);
    } catch {
      return [];
    }
  };

  const spaceInfo = parseArray(room.space_info).map((info) => ({
    name: info,
    icon: iconMap[info] || null,
  }));

  const buildingInfo = parseArray(room.building_info).map((info) => ({
    name: info,
    icon: iconMap[info] || null,
  }));

  return (
    <div className="hotelContainer ">
      <div
        className="BACKGROUND py-4"
        style={{
          background: "rgb(201,213,255)",
          backgroundImage:
            "linear-gradient(0deg, rgba(201,213,255,1) 0%, rgba(255,255,255,1) 100%)",
        }}
      >
        <div className="InstructionHead">
          <h1 className="text-sm p-1 my-2 text-white bg-black text-center">
            Check out the room's amenities, view its availability, and book your
            slot. Click 'Book Now' to proceed with your booking.
          </h1>
        </div>

        <div className="hotelWrapper rounded-lg p-4 shadow-md flex flex-col md:flex-row items-start md:items-center">
          <div className="w-full md:w-2/3 mb-4 md:mb-0">
            <div className="flex items-center text-sm text-gray-500">
              <FontAwesomeIcon icon={faLocationDot} className="text-blue-500" />
              <span className="text-black ml-2">{room.location}</span>
            </div>
            <span className="text-gray-600 font-semibold block md:inline-block">
              {room.near_by}
            </span>
            <h1 className="text-2xl md:text-4xl font-semibold">{room.name}</h1>
            <div className="flex flex-wrap gap-4 mt-4 shadow-black shadow-sm">
              <Carousel
                showArrows={true}
                showThumbs={false}
                dynamicHeight={true}
                emulateTouch={true}
                infiniteLoop={true}
                showStatus={false}
                swipeable={true}
              >
                {Array.isArray(room.photos) &&
                  room.photos.map((photo, i) => (
                    <div key={i}>
                      <img
                        src={photo.src}
                        alt={`Room photo ${i + 1}`}
                        className="w-full md:w-96 h-auto md:h-[500px] object-cover rounded-lg"
                      />
                    </div>
                  ))}
              </Carousel>
            </div>
          </div>
          <div className="w-full md:w-1/3 ml-0 md:ml-4">
            <div className="w-full">
              <h1 className="text-lg md:text-xl font-semibold">
                Room Description:
              </h1>
              <ul className="list-disc list-inside mt-2 text-gray-600">
                <li className="font-bold">{room.description}</li>
              </ul>
            </div>
            <div className="block2 bg-blue-50 shadow-black shadow-md p-4 mt-4 rounded-lg">
              <h1 className="text-md md:text-lg font-semibold text-gray-700">
                Perfect for your Meetings!
              </h1>
              <h2 className="text-lg md:text-xl font-bold mt-2">
                ₹ {room.price} (1 hr)
              </h2>
              <button
                className="w-full py-2 bg-black text-white font-semibold rounded cursor-pointer hover:bg-gray-700 transition duration-300 mt-2 md:mt-4"
                onClick={handleLogin}
              >
                Book Now!
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="BACKGROUND2"
        style={{
          background: "rgb(201,213,255)",
          backgroundImage:
            "linear-gradient(0deg, rgba(201,213,255,1) 0%, rgba(255,255,255,1) 100%)",
        }}
      >
        {/* Space Suited */}
        <div className="Space py-20 ">
          <h1 className="text-xl text-center md:text-3xl pb-10 font-semibold">
            Space Best Suited for
          </h1>
          <div className="suited flex flex-wrap items-center justify-center text-center">
            {parseArray(room.suited_for).map((item, index) => (
              <p
                key={index}
                className="border border-blue-600 rounded p-1 px-8 m-2 md:m-5"
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="Amenities py-5">
          <h1 className="text-xl md:text-3xl py-10 text-center font-semibold">
            Amenities
          </h1>
          <div className="INFOiconText">
            <div className="flex flex-wrap -mx-2">
              {spaceInfo.map((info, index) => (
                <div key={index} className="w-1/3 px-2 py-4">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-black text-2xl">{info.icon}</span>
                    <p className="text-sm mt-2">{info.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="BUILDINGiconText">
            <div className="flex flex-wrap -mx-2">
              {buildingInfo.map((info, index) => (
                <div key={index} className="w-1/3 px-2 py-4">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-black text-2xl">{info.icon}</span>
                    <p className="text-sm mt-2">{info.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
