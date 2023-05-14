import React, { useState } from 'react';
import Modal from '../components/Modal';
import { Link } from "react-router-dom";
import "../App.css";

const ManagerDashboard = () => {
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);

  const handleButtonClick1 = async () => {
    try {
      const response = await fetch('http://localhost:9191/mng/order/pending');
      const data = await response.json();
      setPendingOrders(data);
      setShowModal1(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick2 = async () => {
    try {
        const response = await fetch('http://localhost:9191/mng/order/accepted');
        const data = await response.json();
        setAcceptedOrders(data);
        setShowModal2(true);
      } catch (error) {
        console.error(error);
      }
  };

  const handleButtonClick3 = () => {
    setShowModal3(true);
  };

  const handleModalClose1 = () => {
    setShowModal1(false);
  };

  const handleModalClose2 = () => {
    setShowModal2(false);
  };

  const handleModalClose3 = () => {
    setShowModal3(false);
  };

  return (
    <div>
      <h1>Manager Dashboard</h1>
      <button onClick={handleButtonClick1}>View Pending Orders</button>
      <button onClick={handleButtonClick2}>View Current Orders</button>
      <button onClick={handleButtonClick3}>Other Services</button>
      {showModal1 && (
        <Modal onClose={handleModalClose1}>
          <h2>Pending Orders</h2>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Title</th>
                <th>Order Description</th>
              </tr>
            </thead>
            <tbody>
              {pendingOrders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.title}</td>
                  <td>{order.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal>
      )}
      {showModal2 && (
        <Modal onClose={handleModalClose2}>
          <h2>Accepted Orders</h2>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Title</th>
                <th>Order Description</th>
              </tr>
            </thead>
            <tbody>
              {acceptedOrders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.title}</td>
                  <td>{order.description}</td>
                </tr>
              ))}
            </tbody>
            </table>
        </Modal>
      )}
      {showModal3 && (
        <Modal onClose={handleModalClose3}>
            <h2>Other Services</h2>
            <Link to='/manager/employeeaccount'>
                <button>Create Employee Account</button>
            </Link>
        </Modal>
      )}
    </div>
  );
};

export default ManagerDashboard;
