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
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [juniorDevelopers, setJuniorDevelopers] = useState([]);
  const [seniorDevelopers, setSeniorDevelopers] = useState([]);
  const [reviewers, setReviewers] = useState([]);
  const [selectedJuniorDeveloper, setSelectedJuniorDeveloper] = useState(null);
  const [selectedSeniorDeveloper, setSelectedSeniorDeveloper] = useState(null);
  const [selectedReviewer, setSelectedReviewer] = useState(null);
  const [showDevelopers, setShowDevelopers] = useState(true);
  const [showReviewers, setShowReviewers] = useState(true);





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

  const handleReportButtonClick = async () => {
    window.location.href = '/manager/report'
  };

  const handleEmployeeReportButtonClick = async () => {
    window.location.href = '/manager/employee/report'
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

  const handleCloseAcceptedOrderModal = () => {
    setShowSecondModal(null);
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

  const handleDownloadSpec = async () => {
    try {
      const response = await fetch(`http://localhost:9191/mng/download/spec/${selectedOrder.orderId}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `spec-${selectedOrder.orderId}.pdf`;

      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
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



  const handleAcceptOrder = async () => {
    try {
      await fetch(`http://localhost:9191/mng/order/accept/${selectedOrder.orderId}`, {
        method: 'POST',
      });
      setAcceptedOrders([...acceptedOrders, selectedOrder]);
      setPendingOrders(pendingOrders.filter((order) => order.orderId !== selectedOrder.orderId));
      handleCloseOrderModal();
    } catch (error) {
      console.error(error);
    }
  };

  const formatString = (str) => {
    switch (str) {
      case 1:
        return "SPEC NEEDS ASSIGNMENT"
      case 2:
        return "SPEC PENDING"
      case 3:
        return "SPEC COMPLETED"
      case 4:
        return "CODE PENDING"
      case 5:
        return "CODE COMPLETED"
      case 6:
        return "REVIEW PENDING"
      case 7:
        return "COMPLETED"
      case 8:
        return "SPEC ERROR"
      case 9:
        return "CODE ERROR"
      default:
        return "INTERNAL ERROR"
    }

  };

  const fetchJuniorDevelopers = async () => {
    try {
      const response = await fetch('http://localhost:9191/mng/junior');
      const data = await response.json();
      setJuniorDevelopers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSeniorDevelopers = async () => {
    try {
      const response = await fetch('http://localhost:9191/mng/senior');
      const data = await response.json();
      setSeniorDevelopers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReviewers = async () => {
    try {
      const response = await fetch('http://localhost:9191/mng/engineer');
      const data = await response.json();
      setReviewers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectJuniorDeveloper = (juniorDeveloper) => {
    setSelectedJuniorDeveloper(juniorDeveloper.target.value);
  };

  const handleSelectSeniorDeveloper = (seniorDeveloper) => {
    setSelectedSeniorDeveloper(seniorDeveloper.target.value);
  };

  const handleSelectReviewer = (reviewer) => {
    setSelectedReviewer(reviewer.target.value);
  };

  const handleAssignFunction = async () => {
    try {
      const response = await fetch(
        `http://localhost:9191/mng/order/${selectedOrderDetails.internalOrder}/assign/function/${selectedJuniorDeveloper}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        console.log('Junior developer assigned successfully');
        setShowDevelopers(false);
      } else {
        console.error('Failed to assign junior developer');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAssignDeveloper = async () => {
    try {
      const response = await fetch(
        `http://localhost:9191/mng/order/${selectedOrderDetails.internalOrder}/assign/software/${selectedSeniorDeveloper}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        console.log('Senior developer assigned successfully');
        setShowDevelopers(false);
      } else {
        console.error('Failed to assign senior developer');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAssignReviewer = async () => {
    try {
      const response = await fetch(`
      http://localhost:9191/mng/order/${selectedOrderDetails.internalOrder}/assign/review/${selectedReviewer}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        console.log('Reviewer assigned successfully');
        setShowReviewers(false);
      } else {
        console.error('Failed to assign Reviewer');
      }
    } catch (error) {
      console.error(error);
    }
  }



  const handleViewAcceptedOrder = async (orderId) => {
    try {
      const remarks = await fetchOrderRemarks(orderId);
      const customerFullName = await fetchCustomerDetails(orderId);
      const order = await fetchOrderDetails(orderId);

      setOrderRemarks(remarks);

      const internalStatusResponse = await fetch(`http://localhost:9191/mng/order/internal/${orderId}`);
      const internalStatusData = await internalStatusResponse.json();
      const internalStatus = internalStatusData.internalStatus;
      const internalOrder = internalStatusData.internalOrder;

      await fetchJuniorDevelopers();
      await fetchSeniorDevelopers();
      await fetchReviewers();

      setSelectedOrderDetails({
        orderId: orderId,
        remarks: remarks,
        title: order.title,
        description: order.description,
        customerFullName: customerFullName,
        status: order.status,
        internalStatus: internalStatus,
        internalOrder: internalOrder
      });
      setShowSecondModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="welcome1">
        <Link to="/">
          <h1 className='welcome-h1'>ElectroGhiurai</h1>
        </Link>
        <Link to="/login">
          <button className="welcome-button">Sign Out</button>
        </Link>
      </div>
      <div className='app'>
        <h1 className='app-h1'>Manager Dashboard</h1>
        <button className='app-button' onClick={handleButtonClick1}>View Pending Orders</button>
        <button className='app-button' onClick={handleButtonClick2}>View Current Orders</button>
        <button className='app-button' onClick={handleReportButtonClick}>View Company Report</button>
        <button className='app-button' onClick={handleEmployeeReportButtonClick}>View Employee Report</button>
        <button className='app-button' onClick={handleButtonClick3}>Other Services</button>
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
            <h2>Current Orders</h2>
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Title</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {acceptedOrders.map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.title}</td>
                    <td>
                      <button className="view-button" onClick={() => handleViewAcceptedOrder(order.orderId)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showSecondModal && (
              <div>
                <h2>Order Details</h2>
                <h3>Order ID: {selectedOrderDetails.orderId}</h3>
                <h3>Title: {selectedOrderDetails.title}</h3>
                <h3>Description: {selectedOrderDetails.description}</h3>
                <h3>Status: {formatString(selectedOrderDetails.internalStatus)}</h3>

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
                <button>Assign Function</button>
                <button>Assign Developer</button>
                <button>Assign Reviewer</button>
                <button>Download Code</button>
                <button>Finish Order</button>
              </div>
            )}
          </Modal>
        )}
        {showModal3 && (
          <Modal onClose={handleModalClose3}>
            <h2>Other Services</h2>
            <Link to="/manager/employee/account">
              <button className='app-button'>Create Employee Account</button>
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
            <button onClick={handleAcceptOrder}>Accept</button>
          </Modal>
        )}
        {showSecondModal && (
          <Modal onClose={() => handleCloseAcceptedOrderModal(false)}>
            <h2>Order Details</h2>
            <h3>Order ID: {selectedOrderDetails.orderId}</h3>
            <h3>Title: {selectedOrderDetails.title}</h3>
            <h3>Description: {selectedOrderDetails.description}</h3>
            <h3>Internal Status: {formatString(selectedOrderDetails.internalStatus)}</h3>
            {selectedOrderDetails.internalStatus === 1 && showDevelopers && (
              <div>
                <h3>List of Developers</h3>
                {juniorDevelopers.length === 0 ? (
                  <p>No junior developers available</p>
                ) : (
                  <div>
                    <select value={selectedJuniorDeveloper} onChange={handleSelectJuniorDeveloper}>
                      {juniorDevelopers.map((juniorDeveloper, index) => (
                        <option key={index} value={juniorDeveloper.userId}>
                          {juniorDeveloper.firstName}, {juniorDeveloper.lastName}
                        </option>
                      ))}
                    </select>
                    <button onClick={handleAssignFunction}>Assign Function</button>
                  </div>
                )}
              </div>
            )}
            {selectedOrderDetails.internalStatus === 2 && (
              <div>
                <h3>Function: Function Dev</h3>
              </div>
            )}
            {selectedOrderDetails.internalStatus === 3 && showDevelopers && (
              <div>
                <h3>List of Senior Developers</h3>
                {seniorDevelopers.length === 0 ? (
                  <p>No senior developers available</p>
                ) : (
                  <div>
                    <select value={selectedSeniorDeveloper} onChange={handleSelectSeniorDeveloper}>
                      {seniorDevelopers.map((seniorDeveloper, index) => (
                        <option key={index} value={seniorDeveloper.userId}>
                          {seniorDeveloper.firstName}, {seniorDeveloper.lastName}
                        </option>
                      ))}
                    </select>
                    <button onClick={handleAssignDeveloper}>Assign Developer</button>
                    <button onClick={handleDownloadSpec}>Download Spec</button>
                  </div>
                )}
              </div>
            )}
            {selectedOrderDetails.internalStatus === 4 && (
              <div>
                <h3>Function: Function Dev</h3>
                <button onClick={handleDownloadSpec}>Download Spec</button>
                <h3>Developer: Developer</h3>
              </div>
            )}
            {selectedOrderDetails.internalStatus === 5 && showReviewers && (
              <div>
                <h3>Function: Function Dev</h3>
                <button onClick={handleDownloadSpec}>Download Spec</button>
                <h3>Developer: Developer</h3>
                <h3>List of Reviewers</h3>
                {reviewers.length === 0 ? (
                  <p>No reviewers available</p>
                ) : (
                  <div>
                    <select value={selectedReviewer} onChange={handleSelectReviewer}>
                      {reviewers.map((reviewer, index) => (
                        <option key={index} value={reviewer.userId}>
                          {reviewer.firstName}, {reviewer.lastName}
                        </option>
                      ))}
                    </select>
                    <button onClick={handleAssignReviewer}>Assign Reviewer</button>
                  </div>
                )}
              </div>
            )}
            {selectedOrderDetails.internalStatus === 6 && (
              <div>
                <h3>Function: Johnny Johnson</h3>
                <button>Download Spec</button>
                <h3>Developer: John Johnson</h3>
                <button>Download Code</button>
                <h3>Reviewer: Jonathan Johnson</h3>
              </div>
            )}
            {selectedOrderDetails.internalStatus === 7 && (
              <div>
                <h3>Function: Function Dev</h3>
                <button onClick={handleDownloadSpec}>Download Spec</button>
                <h3>Developer: Developer</h3>
                <h3>Reviewer: Jonathan Johnson</h3>
                <button>Download Code</button>
                <h3>Upload Code: </h3>
                <button>Finish Order</button>
              </div>
            )}
          </Modal>
        )}
      </div>
    </div >
  );
};

export default ManagerDashboard;