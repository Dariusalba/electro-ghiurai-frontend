import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { Link } from "react-router-dom";
import "../App.css";

const ManagerDashboard = () => {
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderRemarks, setOrderRemarks] = useState([]);

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

  const handleCloseOrderModal = () => {
    setSelectedOrder(null);
  };

  const fetchCustomerDetails = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:9191/customer/order/${orderId}`);
      const data = await response.json();
      const customerId = data.customerId;

      const customerResponse = await fetch(`http://localhost:9191/customer/${customerId}`);
      const customerData = await customerResponse.json();
      const customerFullName = `${customerData.firstName} ${customerData.lastName}`;

      return customerFullName;
    } catch (error) {
      console.error(error);
      return '';
    }
  };

  const fetchOrderRemarks = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:9191/customer/order/remark/${orderId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:9191/customer/order/${orderId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      const customerInfo = {};
      for (const order of pendingOrders) {
        const customerFullName = await fetchCustomerDetails(order.orderId);
        customerInfo[order.orderId] = customerFullName;
      }
      setCustomerDetails(customerInfo);
    };

    fetchCustomerInfo();
  }, [pendingOrders]);

  const handleViewOrder = async (orderId) => {
    try {
      const remarks = await fetchOrderRemarks(orderId);
      const customerFullName = await fetchCustomerDetails(orderId);
      const order = await fetchOrderDetails(orderId);

      setOrderRemarks(remarks);
      setSelectedOrder({
        orderId: orderId,
        remarks: remarks,
        title: order.title,
        description: order.description,
        customerFullName: customerFullName
      });
    } catch (error) {
      console.error(error);
    }
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
          <table className="order-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Client</th>
              </tr>
            </thead>
            <tbody>
              {pendingOrders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.title}</td>
                  <td>{customerDetails[order.orderId]}</td>
                  <td>
                    <button className="view-button" onClick={() => handleViewOrder(order.orderId)}>
                      View
                    </button>
                  </td>
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
          <Link to="/manager/employeeaccount">
            <button>Create Employee Account</button>
          </Link>
        </Modal>
      )}
      {selectedOrder && (
        <Modal onClose={handleCloseOrderModal}>
          <h2>Order Details</h2>
          <h3>Order ID: {selectedOrder.orderId}</h3>
          <h3>Title: {selectedOrder.title}</h3>
          <h3>Description: {selectedOrder.description}</h3>
          <h3>Remarks:</h3>
            {orderRemarks.length === 0 ? (
              <p>No remarks added</p>
            ) : (
              <ul>
                {orderRemarks.map((remark) => (
                  <li key={remark.remarkId}>{remark.description}</li>
                ))}
              </ul>
            )}
        </Modal>
      )}
    </div>
  );
};

export default ManagerDashboard;