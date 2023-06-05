import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { Link } from "react-router-dom";
import "../App.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

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
  const [deadline, setDeadline] = useState('');
  const [functionName, setFunctionName] = useState('');
  const [developerName, setDeveloperName] = useState('');
  const [reviewerName, setReviewerName] = useState('');





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

  const handleDeadlineChange = (event) => {
    const selectedDate = event.target.value;

    setDeadline(selectedDate);
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
      const response = await fetch(`http://localhost:9191/mng/download/spec/${selectedOrderDetails.orderId}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `spec-${selectedOrderDetails.orderId}.pdf`;

      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownloadCode = async () => {
    try {
      const response = await fetch(`http://localhost:9191/mng/download/code/${selectedOrderDetails.orderId}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `spec-${selectedOrderDetails.orderId}.zip`;

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
      employeeAssigned();
          setTimeout(() => {
            window.location.href = '/manager/dashboard';
          }, 2000);
      const response = await fetch(
        `http://localhost:9191/mng/order/${selectedOrderDetails.internalOrder}/assign/function/${selectedJuniorDeveloper}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ deadline }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log('Junior developer assigned successfully');
        setShowDevelopers(false);
        setFunctionName(responseData.firstName + ' ' + responseData.lastName);
        
      } else {
        console.error('Failed to assign junior developer');
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleAssignDeveloper = async () => {
    try {
        employeeAssigned();
            setTimeout(() => {
              window.location.href = '/manager/dashboard';
            }, 2000);
      const response = await fetch(
        `http://localhost:9191/mng/order/${selectedOrderDetails.internalOrder}/assign/software/${selectedSeniorDeveloper}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ deadline }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log('Senior developer assigned successfully');
        setShowDevelopers(false);
        setDeveloperName(responseData.firstName + ' ' + responseData.lastName);
      } else {
        console.error('Failed to assign senior developer');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReAssignFunction = async () => {
    try {
      employeeAssigned();
            setTimeout(() => {
              window.location.href = '/manager/dashboard';
            }, 2000);
      const response = await fetch(
        `http://localhost:9191/mng/order/${selectedOrderDetails.internalOrder}/assign/function/${selectedJuniorDeveloper}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            deadline
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log('Junior developer assigned successfully');
        setShowDevelopers(false);
        setFunctionName(responseData.firstName + ' ' + responseData.lastName);
      } else {
        console.error('Failed to assign junior developer');
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleReAssignDeveloper = async () => {
    try {
      employeeAssigned();
            setTimeout(() => {
              window.location.href = '/manager/dashboard';
            }, 2000);

      const response = await fetch(
        `http://localhost:9191/mng/order/${selectedOrderDetails.internalOrder}/assign/software/${selectedSeniorDeveloper}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            deadline
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log('Senior developer assigned successfully');
        setShowDevelopers(false);
        setDeveloperName(responseData.firstName + ' ' + responseData.lastName);
      } else {
        console.error('Failed to assign senior developer');
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleAssignReviewer = async () => {
    try {
      employeeAssigned();
            setTimeout(() => {
              window.location.href = '/manager/dashboard';
            }, 2000);
      const response = await fetch(`
      http://localhost:9191/mng/order/${selectedOrderDetails.internalOrder}/assign/review/${selectedReviewer}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ deadline }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log('Reviewer assigned successfully');
        setShowReviewers(false);
        setReviewerName(responseData.firstName + ' ' + responseData.lastName);
      } else {
        console.error('Failed to assign Reviewer');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinishOrder = async () => {
    try {
      finishedOrder();
            setTimeout(() => {
              window.location.href = '/manager/dashboard';
            }, 2000);
      const response = await fetch(`http://localhost:9191/mng/finish/order/${selectedOrderDetails.orderId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedOrderDetails),
      });

      if (response.ok) {
        console.log('Order finished successfully');
      } else {
        console.error('Failed to finish the order');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addDevelopers = async(statusData) => {
    try{
      if(statusData.functionDev != null){
        const response = await fetch(`http://localhost:9191/mng/get/employee/${statusData.functionDev}`);
        const functionDev = await response.json();
        setFunctionName(`${functionDev.firstName}, ${functionDev.lastName}`);
      }
      if(statusData.softwareDev != null){
        const response2 = await fetch(`http://localhost:9191/mng/get/employee/${statusData.softwareDev}`);
        const softwareDev = await response2.json();
        setDeveloperName(`${softwareDev.firstName}, ${softwareDev.lastName}`);
      }
      if(statusData.reviewer != null){
        const response3 = await fetch(`http://localhost:9191/mng/get/employee/${statusData.reviewer}`);
        const reviewer = await response3.json();
        setReviewerName(`${reviewer.firstName}, ${reviewer.lastName}`);
      }
      
    }catch(error){
      console.error(error);
    }
  }
  const employeeAssigned = () => 
    toast.success('✅ Employee was Assigned Successfully', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
      const finishedOrder = () => 
    toast.success('✅ Order Finished Successfully', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
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

      await addDevelopers(internalStatusData);
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
      <div class="w3-top">
        <div class="w3-bar w3-white w3-card" id="myNavbar">
          <a href="/" class="w3-bar-item w3-button w3-wide">ELECTROGHIURAI</a>
          <div class="w3-right w3-hide-small">
            <a href="/login" class="w3-bar-item w3-button"><i class="fa fa-sign-out"></i> SIGN OUT</a>
          </div>
        </div>
      </div>
      <div className='app2'>
        <h1 className=''>Manager Dashboard</h1>
        <button className='w3-button w3-black app-button-first' onClick={handleButtonClick1}>Pending Orders</button>
        <button className='w3-button w3-black app-button' onClick={handleButtonClick2}>Current Orders</button>
        <button className='w3-button w3-black app-button' onClick={handleButtonClick3}>Other Services</button>
        <p className='app-p'>©2023 ElectroGhiurai. All rights reserved.</p>
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
                      <button className="w3-button w3-black view-button" onClick={() => handleViewOrder(order.orderId)}>
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
            <table className='order-table'>
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
                      <button className="w3-button w3-black view-button" onClick={() => handleViewAcceptedOrder(order.orderId)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* {showSecondModal && (
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
            )} */}
          </Modal>
        )}
        {showModal3 && (
          <Modal onClose={handleModalClose3}>
            <h2>Other Services</h2>
            <button className='w3-button w3-black app-button-first' onClick={handleReportButtonClick}>Company Report</button>
            <Link to="/manager/employee/account">
              <button className='w3-button w3-black app-button'>Create Employee Account</button>
            </Link>
          </Modal>
        )}
        {selectedOrder && (
          <Modal onClose={handleCloseOrderModal}>
            <h2>Order Details:</h2>
            <table className='order-table'>
              <tbody>
                <tr>
                  <td>Order ID</td>
                  <td>{selectedOrder.orderId}</td>
                </tr>
                <tr>
                  <td>Title</td>
                  <td>{selectedOrder.title}</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>{selectedOrder.description}</td>
                </tr>
              </tbody>
            </table>
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
            <button className="w3-button w3-black" onClick={handleAcceptOrder}>Accept</button>
          </Modal>
        )}
        {showSecondModal && (
          <Modal onClose={() => handleCloseAcceptedOrderModal(false)}>
            <h2>Order Details</h2>
            <table className='order-table'>
              <tbody>
                <tr>
                  <td>Order ID</td>
                  <td>{selectedOrderDetails.orderId}</td>
                </tr>
                <tr>
                  <td>Title</td>
                  <td>{selectedOrderDetails.title}</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>{selectedOrderDetails.description}</td>
                </tr>
                <tr>
                  <td>Internal Status</td>
                  <td>{formatString(selectedOrderDetails.internalStatus)}</td>
                </tr>
              </tbody>
            </table>
            {selectedOrderDetails.internalStatus === 1 && showDevelopers && (
              <div>
                <h3>Add Function</h3>
                {juniorDevelopers.length === 0 ? (
                  <p>No junior developers available</p>
                ) : (
                  <div className='dev-func'>
                    <select value={selectedJuniorDeveloper} onChange={handleSelectJuniorDeveloper}>
                      {juniorDevelopers.map((juniorDeveloper, index) => (
                        <option key={index} value={juniorDeveloper.userId}>
                          {juniorDeveloper.firstName}, {juniorDeveloper.lastName}
                        </option>
                      ))}
                    </select>
                    <input className="dev-date" type="date" value={deadline} onChange={handleDeadlineChange} />
                    <button className="w3-button w3-black" onClick={handleAssignFunction}>Assign Function</button>
                  </div>
                )}
              </div>
            )}
            {selectedOrderDetails.internalStatus === 2 && (
              <div>
                <h3>Function: {functionName}</h3>
              </div>
            )}
            {selectedOrderDetails.internalStatus === 3 && showDevelopers && (
              <div>
                {seniorDevelopers.length === 0 ? (
                  <p>No senior developers available</p>
                ) : (
                  <div className='dev-func'>
                    <button className="w3-button w3-black app-button-simple" onClick={handleDownloadSpec}>Download Spec</button>
                    <select value={selectedSeniorDeveloper} onChange={handleSelectSeniorDeveloper}>
                      {seniorDevelopers.map((seniorDeveloper, index) => (
                        <option key={index} value={seniorDeveloper.userId}>
                          {seniorDeveloper.firstName}, {seniorDeveloper.lastName}
                        </option>
                      ))}
                    </select>
                    <input className="dev-date" type="date" value={deadline} onChange={handleDeadlineChange} />
                    <button className="w3-button w3-black app-button-simple" onClick={handleAssignDeveloper}>Assign Developer</button>
                  </div>
                )}
              </div>
            )}
            {selectedOrderDetails.internalStatus === 4 && (
              <div>
                <h3>Function: {functionName}</h3>
                <button className="w3-button w3-black" onClick={handleDownloadSpec}>Download Spec</button>
                <h3>Developer: {developerName}</h3>
              </div>
            )}
            {selectedOrderDetails.internalStatus === 5 && showReviewers && (
              <div>
                <h3>Function: {functionName}</h3>
                <button className="w3-button w3-black" onClick={handleDownloadSpec}>Download Spec</button>
                <h3>Developer: {developerName}</h3>
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
                    <button className="w3-button w3-black" onclick={handleDownloadCode}>Download Code</button>
                    <input type="date" value={deadline} onChange={handleDeadlineChange} />
                    <button className="w3-button w3-black" onClick={handleAssignReviewer}>Assign Reviewer</button>
                  </div>
                )}
              </div>
            )}
            {selectedOrderDetails.internalStatus === 6 && (
              <div>
                <h3>Function: {functionName}</h3>
                <button className="w3-button w3-black" >Download Spec</button>
                <h3>Developer: {developerName}</h3>
                <button className="w3-button w3-black" >Download Code</button>
                <h3>Reviewer: {reviewerName}</h3>
              </div>
            )}
            {selectedOrderDetails.internalStatus === 7 && (
              <div>
                <h3>Function: {functionName}</h3>
                <button className="w3-button w3-black" onClick={handleDownloadSpec}>Download Spec</button>
                <h3>Developer: {developerName}</h3>
                <h3>Reviewer: {reviewerName}</h3>
                <button className="w3-button w3-black" onClick={handleDownloadCode}>Download Code</button>
                <button className="w3-button w3-black" onClick={handleFinishOrder}>Finish Order</button>
              </div>
            )}
            {selectedOrderDetails.internalStatus === 8 && showDevelopers && (
              <div>
                <h3>Function: {functionName}</h3>
                <button className="w3-button w3-black" onClick={handleDownloadSpec}>Download Spec</button>
                <h3>Developer: {developerName}</h3>
                <h3>Reviewer: {reviewerName}</h3>
                <button className="w3-button w3-black" onClick={handleDownloadCode}>Download Code</button>
                <h3>Reassign Function Developer</h3>
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
                    <input type="date" value={deadline} onChange={handleDeadlineChange} />
                    <button className="w3-button w3-black" onClick={handleReAssignFunction}>Reassign Function</button>
                  </div>
                )}
              </div>
            )}
            {selectedOrderDetails.internalStatus === 9 && showDevelopers && (
              <div>
                <h3>Function: {functionName}</h3>
                <button onClick={handleDownloadSpec}>Download Spec</button>
                <h3>Developer: {developerName}</h3>
                <h3>Reviewer: {reviewerName}</h3>
                <button className="w3-button w3-black" onClick={handleDownloadCode}>Download Code</button>
                <h3>Reassign Developer</h3>
                {seniorDevelopers.length === 0 ? (
                  <p>Reassign Developer</p>
                ) : (
                  <div>
                    <select value={selectedSeniorDeveloper} onChange={handleSelectSeniorDeveloper}>
                      {seniorDevelopers.map((seniorDeveloper, index) => (
                        <option key={index} value={seniorDeveloper.userId}>
                          {seniorDeveloper.firstName}, {seniorDeveloper.lastName}
                        </option>
                      ))}
                    </select>
                    <input type="date" value={deadline} onChange={handleDeadlineChange} />
                    <button className="w3-button w3-black" onClick={handleReAssignDeveloper}>Reassign Developer</button>
                    <button className="w3-button w3-black" onClick={handleDownloadSpec}>Download Spec</button>
                  </div>
                )}
              </div>
            )}
          </Modal>
        )}
      </div>
      <div className='manager-bg'>
        <div className='slogo'></div>
        <div class="scontainer2">
          <div className='wrapper'>
              <img class="w3-image w3-round-large" src="https://blog.velsoft.com/wp-content/uploads/2018/03/happiness.jpg" alt="img1" width="800"></img>
              <img class="w3-image w3-round-large" src="https://content.fortune.com/wp-content/uploads/2017/01/gettyimages-533979847.jpg" alt="img2" width="800"></img>
              <img class="w3-image w3-round-large" src="https://ggsc.s3.amazonaws.com/images/uploads/How_Happy_Are_People_at_Work.jpg" alt="img3" width="800"></img>
              <img class="w3-image w3-round-large" src="https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg" alt="img4" width="800"></img>
              </div>
            </div>
        </div>
        <ToastContainer />
    </div >
  );
};

export default ManagerDashboard;