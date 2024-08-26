// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const OrderList = () => {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [dateFilter, setDateFilter] = useState(null);
//   const [nameFilter, setNameFilter] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBookings = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch('https://getcabinspace.nagpur.pro/api/order/list.php');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         console.log('API Response:', data); // Log the API response
//         const bookingsWithDateObjects = data.records.map(booking => ({
//           ...booking,
//           date: new Date(booking.date.split('-').reverse().join('-'))
//         }));
//         setBookings(bookingsWithDateObjects);
//         setFilteredBookings(bookingsWithDateObjects);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchBookings();

//     // Optionally check for new bookings from local storage
//     const newBooking = localStorage.getItem('newBooking');
//     if (newBooking) {
//       // Parse and add the new booking to the list
//       const parsedBooking = JSON.parse(newBooking);
//       setBookings(prevBookings => [parsedBooking, ...prevBookings]);
//       setFilteredBookings(prevBookings => [parsedBooking, ...prevBookings]);
//       localStorage.removeItem('newBooking'); // Clean up
//     }

//   }, []);

//   useEffect(() => {
//     applyFilters();
//   }, [dateFilter, nameFilter, statusFilter]);

//   const applyFilters = () => {
//     let filteredData = bookings.filter(booking => {
//       if (dateFilter && !isSameDay(new Date(booking.date), dateFilter)) {
//         return false;
//       }
//       if (nameFilter && !booking.name.toLowerCase().includes(nameFilter.toLowerCase())) {
//         return false;
//       }
//       if (statusFilter && booking.status.toLowerCase() !== statusFilter.toLowerCase()) {
//         return false;
//       }
//       return true;
//     });

//     setFilteredBookings(filteredData);
//   };

//   const isSameDay = (date1, date2) => {
//     return date1.getDate() === date2.getDate() &&
//            date1.getMonth() === date2.getMonth() &&
//            date1.getFullYear() === date2.getFullYear();
//   };

//   const handleOrderDetails = (bookingId) => {
//     navigate(`/orderDetails/${bookingId}`);
//   };

//   const renderTableRows = () => {
//     let serialNumber = 0;
//     if (filteredBookings.length === 0) {
//       return (
//         <tr>
//           <td colSpan="12" className="text-center py-4">No bookings found.</td>
//         </tr>
//       );
//     }
//     return filteredBookings.map((booking, index) => (
//       <React.Fragment key={booking.o_id}>
//         <tr className='cursor-pointer hover:bg-blue-100' onClick={() => handleOrderDetails(booking.o_id)}>
//           <td className="px-2 py-1 text-center">{++serialNumber}</td>
//           <td className="px-2 py-1 text-center">{booking.date.toLocaleDateString('en-GB')}</td>
//           <td className="px-2 py-1 text-center">{booking.name}</td>
//           <td className="px-2 py-1 text-center">{booking.room_name}</td>
//           <td className="px-2 py-1 text-center">{booking.email}</td>
//           <td className="px-2 py-1 text-center">{booking.phone}</td>
//           <td className="px-2 py-1 text-center">{booking.o_start_time}</td>
//           <td className="px-2 py-1 text-center">{booking.o_for_many_hours}</td>
//           <td className="px-2 py-1 text-left">{booking.o_details}</td>
//           <td className="px-2 py-1 text-center">{booking.add_on}</td>
//           <td className="px-2 py-1 text-center">{booking.status}</td>
//           <td className="px-2 py-1 text-center">{booking.price}</td>
//           <td className="px-2 py-1 text-center">{booking.payment_mode}</td>
//         </tr>
//         {index !== filteredBookings.length - 1 && (
//           <tr key={`divider-${index}`}>
//             <td colSpan="12" className="border-b border-gray-200"></td>
//           </tr>
//         )}
//       </React.Fragment>
//     ));
//   };

//   if (isLoading) {
//     return <div className="text-center py-4">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-4">Error: {error.message}</div>;
//   }

//   return (
//     <div className="container mx-auto p-4 sm:p-6 lg:p-8"
//       style={{
//         background: 'rgb(201,213,255)',
//         backgroundImage: 'linear-gradient(0deg, rgba(201,213,255,1) 0%, rgba(255,255,255,1) 100%)'
//       }}
//     >
//       <div className="my-4 flex flex-col sm:flex-row gap-4 justify-center">
//         <DatePicker
//           selected={dateFilter}
//           onChange={date => setDateFilter(date)}
//           dateFormat="dd-MM-yyyy"
//           placeholderText="Filter by Date"
//           className="p-2 border border-blue-300 rounded-md text-base sm:text-lg w-full sm:w-auto"
//         />
//         <input
//           type="text"
//           placeholder="Filter by Name"
//           value={nameFilter}
//           onChange={(e) => setNameFilter(e.target.value)}
//           className="p-2 border border-blue-300 rounded-md text-base sm:text-lg w-full sm:w-auto"
//         />
//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="p-2 border border-blue-300 rounded-md text-base sm:text-lg w-full sm:w-auto"
//         >
//           <option value="">Show All Status</option>
//           <option value="Pending">Pending</option>
//           <option value="Confirm">Confirm</option>
//           <option value="Reject">Reject</option>
//         </select>
//       </div>
//       <div className="overflow-x-auto max-w-5xl">
//         <table className="min-w-[800px] bg-white border-collapse shadow-sm rounded-lg border-gray-200 border-x">
//           <thead className="bg-gray-800 text-white">
//             <tr>
//               <th className="px-4 py-2">Sr No.</th>
//               <th className="px-4 py-2 hidden md:table-cell">Date</th>
//               <th className="px-4 py-2 hidden md:table-cell">Name</th>
//               <th className="px-4 py-2 hidden md:table-cell">Room</th>
//               <th className="px-4 py-2 hidden md:table-cell">Email</th>
//               <th className="px-4 py-2 hidden md:table-cell">Phone</th>
//               <th className="px-4 py-2 hidden md:table-cell">Time</th>
//               <th className="px-4 py-2 hidden md:table-cell">Duration (hrs)</th>
//               <th className="px-4 py-2 hidden lg:table-cell">Description</th>
//               <th className="px-4 py-2 hidden lg:table-cell">Add Ons</th>
//               <th className="px-4 py-2 hidden lg:table-cell">Order Status</th>
//               <th className="px-4 py-2 hidden lg:table-cell">Price</th>
//               <th className="px-4 py-2 hidden lg:table-cell">Payment Mode</th>
//             </tr>
//           </thead>
//           <tbody>
//             {renderTableRows()}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default OrderList;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const OrderList = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState(null);
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://getcabinspace.nagpur.pro/api/order/list.php');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('API Response:', data);
        const bookingsWithDateObjects = data.records.map(booking => ({
          ...booking,
          date: new Date(booking.date.split('-').reverse().join('-'))
        }));
        setBookings(bookingsWithDateObjects);
        setFilteredBookings(bookingsWithDateObjects);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();

    const newBooking = localStorage.getItem('newBooking');
    if (newBooking) {
      const parsedBooking = JSON.parse(newBooking);
      setBookings(prevBookings => [parsedBooking, ...prevBookings]);
      setFilteredBookings(prevBookings => [parsedBooking, ...prevBookings]);
      localStorage.removeItem('newBooking');
    }

  }, []);

  useEffect(() => {
    applyFilters();
  }, [dateFilter, nameFilter, statusFilter]);

  const applyFilters = () => {
    let filteredData = bookings.filter(booking => {
      if (dateFilter && !isSameDay(new Date(booking.date), dateFilter)) {
        return false;
      }
      if (nameFilter && !booking.name.toLowerCase().includes(nameFilter.toLowerCase())) {
        return false;
      }
      if (statusFilter && booking.status.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }
      return true;
    });

    setFilteredBookings(filteredData);
  };

  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const handleOrderDetails = (bookingId) => {
    navigate(`/orderDetails/${bookingId}`);
  };

  const renderTableRows = () => {
    let serialNumber = 0;
    if (filteredBookings.length === 0) {
      return (
        <tr>
          <td colSpan="12" className="text-center py-4">No bookings found.</td>
        </tr>
      );
    }
    return filteredBookings.map((booking, index) => (
      <React.Fragment key={booking.o_id}>
        <tr className="cursor-pointer hover:bg-blue-100" onClick={() => handleOrderDetails(booking.o_id)}>
          <td className="px-2 py-1 text-center">{++serialNumber}</td>
          <td className="px-2 py-1 text-center">{booking.date.toLocaleDateString('en-GB')}</td>
          <td className="px-2 py-1 text-center">{booking.name}</td>
          <td className="px-2 py-1 text-center">{booking.room_name}</td>
          <td className="px-2 py-1 text-center">{booking.email}</td>
          <td className="px-2 py-1 text-center">{booking.phone}</td>
          <td className="px-2 py-1 text-center">{booking.o_start_time}</td>
          <td className="px-2 py-1 text-center">{booking.o_for_many_hours}</td>
          <td className="px-2 py-1 text-left">{booking.o_details}</td>
          <td className="px-2 py-1 text-center">{booking.add_on}</td>
          <td className="px-2 py-1 text-center">{booking.status}</td>
          <td className="px-2 py-1 text-center">{booking.price}</td>
          <td className="px-2 py-1 text-center">{booking.payment_mode}</td>
        </tr>
        {index !== filteredBookings.length - 1 && (
          <tr key={`divider-${index}`}>
            <td colSpan="12" className="border-b border-gray-200"></td>
          </tr>
        )}
      </React.Fragment>
    ));
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8"
      style={{
        background: 'rgb(201,213,255)',
        backgroundImage: 'linear-gradient(0deg, rgba(201,213,255,1) 0%, rgba(255,255,255,1) 100%)'
      }}
    >
    <div className="my-4 flex flex-col sm:flex-row gap-4 justify-start items-start">
  <input
    type="text"
    placeholder="Filter by Name"
    value={nameFilter}
    onChange={(e) => setNameFilter(e.target.value)}
    className="p-2 border border-blue-300 rounded-md text-base sm:text-lg w-auto sm:w-auto"
  />
  <DatePicker
    selected={dateFilter}
    onChange={date => setDateFilter(date)}
    dateFormat="dd-MM-yyyy"
    placeholderText="Filter by Date"
    className="p-2 border border-blue-300 rounded-md text-base sm:text-lg w-full sm:w-auto"
  />
  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="p-2 border border-blue-300 rounded-md text-base sm:text-lg w-auto sm:w-auto"
  >
    <option value="">Show All Status</option>
    <option value="Pending">Pending</option>
    <option value="Confirm">Confirm</option>
    <option value="Reject">Reject</option>
  </select>
</div>

<div className="overflow-x-auto  sm:max-w-lg md:max-w-5xl max-w-5xl">
  <table className="max-w-[600px] sm:max-w-[200px] bg-white border-collapse shadow-sm rounded-lg border-gray-200 border-x">
    <thead className="bg-gray-800 text-white">
      <tr>
        <th className="px-4 py-2">Sr No.</th>
        <th className="px-4 py-2">Date</th>
        <th className="px-4 py-2">Name</th>
        <th className="px-4 py-2">Room</th>
        <th className="px-4 py-2">Email</th>
        <th className="px-4 py-2">Phone</th>
        <th className="px-4 py-2">Time</th>
        <th className="px-4 py-2">Duration (hrs)</th>
        <th className="px-4 py-2">Description</th>
        <th className="px-4 py-2">Add Ons</th>
        <th className="px-4 py-2">Order Status</th>
        <th className="px-4 py-2">Price</th>
        <th className="px-4 py-2">Payment Mode</th>
      </tr>
    </thead>
    <tbody>
      {renderTableRows()}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default OrderList;



