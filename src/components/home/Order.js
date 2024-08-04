import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../navbar/Navbar';

const Order = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://restaurant-472a5-default-rtdb.firebaseio.com/orders.json"
        );
        const data = response.data;
        // Assuming data is an object where each key is an order ID and contains order details
        const orderArray = Object.values(data);
        
        // Here, we take the first order for example purposes; you can handle multiple orders as needed
        if (orderArray.length > 0) {
          setOrder(orderArray[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Check if order data is available
  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <Navbar/>
      <h2>Order Details</h2>
      <div>
        <h3>Cart Items</h3>
        <ul>
          {order.cartItems.map((item, index) => (
            <li key={index}>
              <p>{item.name}</p>
              <p>Amount: {item.amount} rs</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: {item.amount * item.quantity} rs</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Total Amount</h3>
        <p>{order.totalAmount} rs</p>
      </div>
      <div>
        <h3>User Details</h3>
        <p>Name: {order.userDetails.name}</p>
        <p>Email: {order.userDetails.email}</p>
        <p>Mobile: {order.userDetails.mobile}</p>
        <p>Address: {order.userDetails.address}</p>
      </div>
    </div>
  );
};

export default Order;
