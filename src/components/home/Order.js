import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../navbar/Navbar';
import './Order.css'; 

const Order = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://restaurant-472a5-default-rtdb.firebaseio.com/orders.json"
        );
        const data = response.data;
        const orderArray = Object.values(data);

        if (orderArray.length > 0) {
          setOrder(orderArray[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-page">
      <Navbar />
      <h2>Order Details</h2>
      <div className="cart-items-container">
        {order.cartItems.map((item, index) => (
          <div className="cart-item" key={index}>
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Amount:</strong> {item.amount} rs</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            <p><strong>Total:</strong> {item.amount * item.quantity} rs</p>
          </div>
        ))}
      </div>
      <div className="total-amount">
        <h3>Total Amount</h3>
        <p>{order.totalAmount} rs</p>
      </div>
      <div className="user-details">
        <h3>User Details</h3>
        <p><strong>Name:</strong> {order.userDetails.name}</p>
        <p><strong>Email:</strong> {order.userDetails.email}</p>
        <p><strong>Mobile:</strong> {order.userDetails.mobile}</p>
        <p><strong>Address:</strong> {order.userDetails.address}</p>
      </div>
    </div>
  );
};

export default Order;
