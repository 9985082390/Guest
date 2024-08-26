// import React, { useState, useEffect } from 'react';
// import { useUser } from '../UserContext';
// import axios from 'axios';
// import Sidebar from '../Admin/Sidebar';

// const PreviousOrder = () => {
//   const { user } = useUser();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(
//           'https://getcabinspace.nagpur.pro/api/order/getOrdersByEmail.php',
//           {
//             params: { email: user.email },
//           }
//         );
//         setOrders(response.data.orders || []);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//         setError('Failed to fetch orders. Please try again later.');
//         setLoading(false);
//       }
//     };

//     if (user?.email) {
//       fetchOrders();
//     }
//   }, [user]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="flex"
//      style={{
//         background: 'rgb(201,213,255)',
//         backgroundImage: 'linear-gradient(0deg, rgba(201,213,255,1) 0%, rgba(255,255,255,1) 100%)'
//       }}
//     >
//     <Sidebar/>
//       <div className="flex-1 sm:p-6 lg:p-8">
//       <h2 className="text-2xl font-bold mb-4">My Previous Orders</h2>
//       {orders.length === 0 ? (
//         <p>No Previous Orders.</p>
//       ) : (
//         <table className="min-w-full bg-white border-collapse shadow-sm rounded-lg overflow-x-auto  border-gray-200 border-x">
//           <thead className="bg-gray-800 text-white">
//             <tr>
//               <th className="py-2 border">Sr No.</th>
//               <th className="py-2 border">Date</th>
//               <th className="py-2 border">Name</th>
//               <th className="py-2 border">Room</th>
//               <th className="py-2 border">Time</th>
//               <th className="py-2 border">Duration (hrs)</th>
//               <th className="py-2 border">Description</th>
//               <th className="py-2 border">Add Ons</th>
//               {/* <th className="py-2 border">Order Status</th> */}
//               <th className="py-2 border">Price</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order, index) => (
//               <tr className='cursor-pointer hover:bg-blue-100' key={order.o_id}>
//                 <td className="border px-4 py-2 text-center">{index + 1}</td>
//                 <td className="border px-4 py-2 text-center">{order.date}</td>
//                 <td className="border px-4 py-2 text-center">{order.name}</td>
//                 <td className="border px-4 py-2 text-center">{order.room_name}</td>
//                 <td className="border px-4 py-2 text-center">{order.o_start_time}</td>
//                 <td className="border px-4 py-2 text-center">{order.o_for_many_hours}</td>
//                 <td className="border px-4 py-2 text-center">{order.o_details}</td>
//                 <td className="border px-4 py-2 text-center">{order.add_on}</td>
//                 {/* <td className="border px-4 py-2">{order.status}</td> */}
//                 <td className="border px-4 py-2  text-center">₹ {order.price}</td>
//               </tr>
//             ))}
//           </tbody> 
//         </table>
//       )}
//       </div>
//     </div>
//   );
// };

// export default PreviousOrder;


import React, { useState, useEffect } from 'react';
import { useUser } from '../UserContext';
import axios from 'axios';
import Sidebar from '../Admin/Sidebar';

const PreviousOrder = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          'https://getcabinspace.nagpur.pro/api/order/getOrdersByEmail.php',
          {
            params: { email: user.email },
          }
        );
        setOrders(response.data.orders || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError('Failed to fetch orders. Please try again later.');
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchOrders();
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <h2 className="text-2xl font-bold mb-4">My Previous Orders</h2>
        {orders.length === 0 ? (
          <p>No Previous Orders.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-collapse shadow-sm rounded-lg border-gray-200 border-x">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-2 border">Sr No.</th>
                  <th className="py-2 border">Date</th>
                  <th className="py-2 border">Name</th>
                  <th className="py-2 border">Room</th>
                  <th className="py-2 border">Time</th>
                  <th className="py-2 border">Duration (hrs)</th>
                  <th className="py-2 border">Description</th>
                  <th className="py-2 border">Add Ons</th>
                  <th className="py-2 border">Price</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr className='cursor-pointer hover:bg-blue-100' key={order.o_id}>
                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                    <td className="border px-4 py-2 text-center">{order.date}</td>
                    <td className="border px-4 py-2 text-center">{order.name}</td>
                    <td className="border px-4 py-2 text-center">{order.room_name}</td>
                    <td className="border px-4 py-2 text-center">{order.o_start_time}</td>
                    <td className="border px-4 py-2 text-center">{order.o_for_many_hours}</td>
                    <td className="border px-4 py-2 text-center">{order.o_details}</td>
                    <td className="border px-4 py-2 text-center">{order.add_on}</td>
                    <td className="border px-4 py-2 text-center">₹ {order.price}</td>
                  </tr>
                ))}
              </tbody> 
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviousOrder;
