import { useState, useEffect } from 'react';

// Create a variable outside the hook to maintain state between instances
let globalOrders = [
  
];

export const useOrders = () => {
  const [orders, setOrders] = useState(globalOrders);

  // Sync local state with global state
  useEffect(() => {
    setOrders(globalOrders);
  }, [globalOrders]);

  const addOrder = (newOrder) => {
    const orderWithMetadata = {
      ...newOrder,
      id: `ord_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      client: 'Current Client'
    };
    
    globalOrders = [...globalOrders, orderWithMetadata];
    setOrders(globalOrders);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    globalOrders = globalOrders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(globalOrders);
  };

  const uploadOrderVideo = (orderId, videoUrl) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, videoUrl } : order
    ));
  };

  return {
    orders,
    addOrder,
    uploadOrderVideo,
    updateOrderStatus
  };
};