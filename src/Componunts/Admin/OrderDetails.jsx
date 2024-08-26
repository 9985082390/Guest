// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import { useOrderContext } from './OrderContext';

// const OrderDetails = () => {
//   const { id } = useParams(); 
//   const { orders, updateOrder } = useOrderContext(); // Destructure updateOrder from useOrderContext
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [selectedPaymode, setSelectedPaymode] = useState("");
//   const [updatingStatus, setUpdatingStatus] = useState(false);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         if (!id) {
//           throw new Error("Order ID parameter is missing.");
//         }

//         const response = await fetch(
//           `https://getcabinspace.nagpur.pro/api/order/details.php?o_id=${id}`
//         );
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         setOrder(data); 
//         setSelectedStatus(data.status);
//         setSelectedPaymode(data.paymode); 
//         setLoading(false); 
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError(error.message); 
//         setLoading(false); 
//       }
//     };

//     fetchOrderDetails();
//   }, [id]);   
  
//   const handleUpdate = async () => {
//     try {
//       const response = await fetch('https://getcabinspace.nagpur.pro/api/order/update.php', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           o_id: order.o_id,
//           status: selectedStatus,
//           payment_mode: selectedPaymode,
//         }),
//       });
  
//       const text = await response.text();
//       console.log('Response Text:', text);
      
//       if (!response.ok) {
//         throw new Error(`Failed to update order: ${response.statusText}`);
//       }
      
//       const data = JSON.parse(text);
//       if (data.message === "Order updated successfully") {
//         updateOrder({
//           o_id: order.o_id,
//           status: selectedStatus,
//           payment_mode: selectedPaymode,
//         });
//         alert("Failed to update order. Please try again.");
//       } else {
//         alert("Order updated successfully!");
//       }
//     } catch (error) {
//       console.error('Error updating order:', error);
//     }
//   };
  

//   const handleStatusChange = (event) => {
//     setSelectedStatus(event.target.value);
//   };

//   const handlePaymodeChange = (event) => {
//     setSelectedPaymode(event.target.value);
//   };

//   if (loading) {
//     return <div>Loading...</div>; 
//   }

//   if (error) {
//     return <div>Error: {error}</div>; 
//   }

//   if (!order) {
//     return <div>Error: Order details not found.</div>; 
//   }

//   return (
//     <div
//       className="flex"
//       style={{
//         background: "rgb(201,213,255)",
//         backgroundImage:
//           "linear-gradient(0deg, rgba(201,213,255,1) 0%, rgba(255,255,255,1) 100%)",
//       }}
//     >
//       <Sidebar />
//       <div className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-4">Order Details</h1>
//         <div className="bg-white shadow-md rounded-lg overflow-hidden">
//           <div className="p-12 flex justify-between">
//             <div className="orderID">
//               <p className="text-lg font-semibold text-gray-800">
//                 Order ID: {order.o_id}
//               </p>
//               <p className="text-sm text-gray-600">Date: {order.date}</p>
//               <p className="text-sm text-gray-600">
//                 Start Time: {order.o_start_time}
//               </p>
//               <p className="text-sm text-gray-600">
//                 Duration: {order.o_for_many_hours} hours
//               </p>
//               <p className="text-sm text-gray-600">
//                 Description: {order.o_details}
//               </p>
//               <p className="text-sm text-gray-600">Status: {order.status}</p>
//               <p className="text-sm text-gray-600 font-semibold">
//                 Price: {order.price}
//               </p>
//               {order.status === "Pending" && (
//                 <div className="text-sm text-gray-600 mb-4">
//                   <p className="font-semibold mb-2">Choose status:</p>
//                   <div className="flex space-x-4">
//                     <label className="inline-flex items-center">
//                       <input
//                         type="radio"
//                         value="Confirm"
//                         checked={selectedStatus === "Confirm"}
//                         onChange={handleStatusChange}
//                         disabled={updatingStatus}
//                         className="form-radio"
//                       />
//                       <span className="ml-2">Confirm</span>
//                     </label>
//                     <label className="inline-flex items-center">
//                       <input
//                         type="radio"
//                         value="Reject"
//                         checked={selectedStatus === "Reject"}
//                         onChange={handleStatusChange}
//                         disabled={updatingStatus}
//                         className="form-radio"
//                       />
//                       <span className="ml-2">Reject</span>
//                     </label>
//                   </div>
//                   {updatingStatus && <p className="mt-2">Updating status...</p>}
//                 </div>
//               )}
//             </div>
//             <div className="orderDate py-6">
//               <p className="text-sm text-gray-600">
//                 Created On: {order.o_created_on}
//               </p>
//               <p className="text-sm text-gray-600">
//                 Modified On: {order.o_modified_on}
//               </p>
//               <div className="text-sm text-gray-600">
//                 <p className="font-semibold m-2">Choose payment mode:</p>
//                 <select
//                   id="paymode"
//                   value={selectedPaymode}
//                   onChange={handlePaymodeChange}
//                   className="form-select"
//                 >
//                   <option value="">Select payment mode</option>
//                   <option value="Cash">Cash</option>
//                   <option value="Online">Online</option>
//                   <option value="Card">Card</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//           <div className="p-6 text-right">
//             <button
//               onClick={handleUpdate}
//               className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
//               disabled={updatingStatus}
//             >
//               Confirm Update Booking
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderDetails;



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useOrderContext } from './OrderContext';

const OrderDetails = () => {
  const { id } = useParams(); 
  const { orders, updateOrder } = useOrderContext(); 
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPaymode, setSelectedPaymode] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (!id) {
          throw new Error("Order ID parameter is missing.");
        }

        const response = await fetch(
          `https://getcabinspace.nagpur.pro/api/order/details.php?o_id=${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setOrder(data); 
        setSelectedStatus(data.status);
        setSelectedPaymode(data.paymode); 
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message); 
        setLoading(false); 
      }
    };

    fetchOrderDetails();
  }, [id]);   
  
  const handleUpdate = async () => {
    try {
      const response = await fetch('https://getcabinspace.nagpur.pro/api/order/update.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          o_id: order.o_id,
          status: selectedStatus,
          payment_mode: selectedPaymode,
        }),
      });
  
      const text = await response.text();
      console.log('Response Text:', text);
      
      if (!response.ok) {
        throw new Error(`Failed to update order: ${response.statusText}`);
      }
      
      const data = JSON.parse(text);
      if (data.message === "Order updated successfully") {
        updateOrder({
          o_id: order.o_id,
          status: selectedStatus,
          payment_mode: selectedPaymode,
        });
        alert("Failed to update order. Please try again.");
      } else {
        alert("Order updated successfully!");
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };
  

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handlePaymodeChange = (event) => {
    setSelectedPaymode(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  if (!order) {
    return <div>Error: Order details not found.</div>; 
  }

  return (
    <div
      className="flex lg:flex-row"
      style={{
        background: "rgb(201,213,255)",
        backgroundImage:
          "linear-gradient(0deg, rgba(201,213,255,1) 0%, rgba(255,255,255,1) 100%)",
      }}
    >
      <Sidebar className="" />
      <div className="flex-1 p-4 lg:p-6">
        <h1 className="text-xl lg:text-2xl font-bold mb-4">Order Details</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 lg:p-6 flex flex-col lg:flex-row">
            <div className="orderID flex-1 mb-4 lg:mb-0 lg:pr-4">
              <p className="text-md lg:text-lg font-semibold text-gray-800">
                Order ID: {order.o_id}
              </p>
              <p className="text-sm text-gray-600">Date: {order.date}</p>
              <p className="text-sm text-gray-600">
                Start Time: {order.o_start_time}
              </p>
              <p className="text-sm text-gray-600">
                Duration: {order.o_for_many_hours} hours
              </p>
              <p className="text-sm text-gray-600">
                Description: {order.o_details}
              </p>
              <p className="text-sm text-gray-600">Status: {order.status}</p>
              <p className="text-sm text-gray-600 font-semibold">
                Price: {order.price}
              </p>
              {order.status === "Pending" && (
                <div className="text-sm text-gray-600 mb-4">
                  <p className="font-semibold mb-2">Choose status:</p>
                  <div className="flex flex-col lg:flex-row lg:space-x-4">
                    <label className="inline-flex items-center mb-2 lg:mb-0">
                      <input
                        type="radio"
                        value="Confirm"
                        checked={selectedStatus === "Confirm"}
                        onChange={handleStatusChange}
                        disabled={updatingStatus}
                        className="form-radio"
                      />
                      <span className="ml-2">Confirm</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        value="Reject"
                        checked={selectedStatus === "Reject"}
                        onChange={handleStatusChange}
                        disabled={updatingStatus}
                        className="form-radio"
                      />
                      <span className="ml-2">Reject</span>
                    </label>
                  </div>
                  {updatingStatus && <p className="mt-2">Updating status...</p>}
                </div>
              )}
            </div>
            <div className="orderDate flex-1">
              <p className="text-sm text-gray-600">
                Created On: {order.o_created_on}
              </p>
              <p className="text-sm text-gray-600">
                Modified On: {order.o_modified_on}
              </p>
              <div className="text-sm text-gray-600 mt-4">
                <p className="font-semibold mb-2">Choose payment mode:</p>
                <select
                  id="paymode"
                  value={selectedPaymode}
                  onChange={handlePaymodeChange}
                  className="form-select w-full"
                >
                  <option value="">Select payment mode</option>
                  <option value="Cash">Cash</option>
                  <option value="Online">Online</option>
                  <option value="Card">Card</option>
                </select>
              </div>
            </div>
          </div>
          <div className="p-4 lg:p-6 text-right">
          <button
  onClick={handleUpdate}
  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition w-full max-w-xs lg:max-w-sm"
  disabled={updatingStatus}
>
  Confirm Update Booking
</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
