import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const PropertyList = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nameFilter, setNameFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('https://getcabinspace.nagpur.pro/api/offices/list.php');
      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }
      const data = await response.json();
      
      const updatedProperties = data.records.map(property => ({
        ...property,
        photo: JSON.parse(property.photo) // Parse the 'photo' string into an object
      }));

      setProperties(updatedProperties);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setLoading(false);
    }
  };

  const handleSearch = (id) => {
    navigate(`/roomoption/${id}`);
  };

  const filteredProperties = properties.filter(room =>
    room.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
    room.location.toLowerCase().includes(locationFilter.toLowerCase())
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (properties.length === 0) {
    return <p>No properties found.</p>;
  }

  return (
    <div className="p-4"
     style={{
           background: 'rgb(201,213,255)',
backgroundImage: 'linear-gradient(0deg, rgba(201,213,255,1) 0%, rgba(255,255,255,1) 100%)'
         }}>

    <div className="flex justify-center items-center">
      <div className="text-center px-4 sm:px-6 lg:px-8">
      <h1 className="text-xs md:text-base lg:text-3xl text-black max-w-3xl max-w-full md:max-w-3xl mx-auto px-4">
  Use the search bar and filters to find the perfect space for your needs.
  Click 'More Details' for more information about each property.
</h1>

      </div>
    </div>
 {/* FILTER */}
 <div className="filter flex flex-col sm:flex-row gap-4 my-4 justify-center">
  <input
    type="text"
    placeholder="Search By Name"
    value={nameFilter}
    onChange={(e) => setNameFilter(e.target.value)}
    className="p-2 sm:p-3 border text-sm sm:text-base md:text-lg border-blue-300 rounded-md w-full sm:w-auto"
  />
  <input
    type="text"
    placeholder="Search By Location"
    value={locationFilter}
    onChange={(e) => setLocationFilter(e.target.value)}
    className="p-2 sm:p-3 border text-sm sm:text-base md:text-lg border-blue-300 rounded-md w-full sm:w-auto"
  />
</div>



      <div className="flex flex-wrap justify-center gap-4 ">
        {filteredProperties.length === 0 ? (
          <p>No properties match the filters.</p>
        ) : (
          filteredProperties.map((room) => (
            <div key={room.ol_id} className="bg-white shadow rounded-lg flex flex-col border border-gray-300 text-black p-4 rounded-lg space-y-4 w-80 h-96">
              <img
                src={room.photo.src}
                alt={room.name}
                className="w-full h-48 object-cover rounded cursor-pointer"
                onClick={() => handleSearch(room.ol_id)}
              />
              
              <div className="flex flex-col h-full justify-between">
                <div className="text-center flex-grow">
                  <h1 className="text-xl font-bold">{room.name}</h1>
                  <div className="flex items-center justify-center text-sm text-gray-600 mt-2">
                    
                    <span><FontAwesomeIcon icon={faLocationDot} className="text-blue-500 mr-2" />{room.location}</span>
                  </div>
                  {/* <h3 className='items-center justify-center text-sm text-gray-600 mt-2'>Room Options : {room.option}</h3> */}
                </div>
                <button
                  className="bg-black text-white w-full text-sm py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 mt-2"
                  onClick={() => handleSearch(room.ol_id)}
                >
                  More Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PropertyList;
