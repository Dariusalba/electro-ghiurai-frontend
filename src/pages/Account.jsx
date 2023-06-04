import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Feedback from "./Feedback";

function AccountInfo() {
  const userId = sessionStorage.getItem("userId");
  const [userInfo, setUserInfo] = useState({});
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:9191/customer/${userId}`);
        const data = await response.json();
        const { username, firstName, lastName, email, country } = data;
        setUserInfo({ username, firstName, lastName, email, country });
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:9191/customer/${userId}/order`);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchUserInfo();
    fetchOrders();
  }, [userId]);

  const handleDownloadSpec = async (specUrl) => {
    try {
      const response = await fetch(`http://localhost:9191/mng/download/code/${selectedOrder.orderId}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `spec-${specUrl}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading spec: ", error);
    }
  };

  const handleOrderSelection = (orderId) => {
    const order = orders.find((order) => order.orderId === orderId);
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openFeedbackModal = () => {
    setFeedbackModalOpen(true);
  };

  const closeFeedbackModal = () => {
    setFeedbackModalOpen(false);
  };

  const getOrderStatusName = (orderStatus) => {
    switch (orderStatus) {
      case 1:
        return "PENDING";
      case 2:
        return "IN PROGRESS";
      case 3:
        return "COMPLETED";
      default:
        return "";
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
      <div className="app">
        <h2>User Information:</h2>
        {Object.keys(userInfo).length > 0 ? (
          <>
            <table className="order-table">
              <thead>
                <tr>
                  <th>Info</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                <td>Username</td>
                <td>{userInfo.username}</td>
                <td>First Name</td>
                <td>{userInfo.firstName}</td>
                <td>Last Name</td>
                <td>{userInfo.lastName}</td>
                <td>Email</td>
                <td>{userInfo.email}</td>
                <td>Country of Origin</td>
                <td>{userInfo.country}</td>
              </tbody>
            </table> 
          </>
        ) : (
          <p>Failed to load user information.</p>
        )}
        <h2>Current Orders:</h2>
        {orders.length > 0 ? (
          <table className="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.title}</td>
                  <td>{order.description}</td>
                  <td>
                    <button
                      className="w3-button w3-black app-button"
                      onClick={() => handleOrderSelection(order.orderId)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders found.</p>
        )}
        {modalOpen && selectedOrder && (
          <div className="modal">
            <div className="modal-content">
              <span className="w3-button w3-black close" onClick={closeModal}>&times;</span>
              <h2>Selected Order Details:</h2>
              <p>Order ID: {selectedOrder.orderId}</p>
              <p>Title: {selectedOrder.title}</p>
              <p>Description: {selectedOrder.description}</p>
              <p>Status: {getOrderStatusName(selectedOrder.orderStatus)}</p>
              {selectedOrder.orderStatus === 3 && (
                <div>
                  <button
                    className="w3-button w3-black app-button"
                    onClick={() => handleDownloadSpec(selectedOrder.specUrl)}
                  >
                    Download Spec
                  </button>
                  <button className="w3-button w3-black app-button" onClick={openFeedbackModal}>
                    Feedback
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        {feedbackModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="w3-button w3-black close" onClick={closeFeedbackModal}>&times;</span>
              <Feedback />
            </div>
          </div>
        )}
        <br />
        <Link to="/order">
          <button className="w3-button w3-black app-button">Create Order</button>
        </Link>
      </div>
    </div>
  );
}

export default AccountInfo;
