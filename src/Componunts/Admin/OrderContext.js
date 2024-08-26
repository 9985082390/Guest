import React, { createContext, useState, useContext, useEffect } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://getcabinspace.nagpur.pro/api/order/list.php');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrders(data.records);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const updateOrder = async (updatedOrder) => {
    try {
      const response = await fetch('https://getcabinspace.nagpur.pro/api/order/update.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOrder),
      });

      if (!response.ok) {
        throw new Error('Failed to update order');
      }

      // Update the order in the local state
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.o_id === updatedOrder.o_id ? { ...order, ...updatedOrder } : order
        )
      );
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <OrderContext.Provider value={{ orders, updateOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext);
