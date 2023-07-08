import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Feedback from "./Feedback";
import "../components/Account.css";
import { ToastContainer } from 'react-toastify';

function AccountInfo() {
  const userId = sessionStorage.getItem("userId");
  const [userInfo, setUserInfo] = useState({});
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [accountInfoModalOpen, setAccountInfoModalOpen] = useState(false);
  const [orderInfoModalOpen, setOrderInfoModalOpen] = useState(false);

  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);

  useEffect(() => {
    const menuElement = menuRef.current;
    const menuItems = Array.from(menuItemsRef.current);

    menuItems.forEach((item, index) => {
      item.addEventListener('mouseover', () => {
        menuElement.dataset.activeIndex = index;
      });

      return () => {
        item.removeEventListener('mouseover', () => {
          menuElement.dataset.activeIndex = index;
        });
      };
    });

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

  const handleDownloadCode = async (specUrl) => {
    try {
      const response = await fetch(`http://localhost:9191/mng/download/code/${selectedOrder.orderId}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `app-${specUrl}`);
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

  const openAccountInfoModal = () => {
    setAccountInfoModalOpen(true);
  };

  const openOrderInfoModal = () => {
    setOrderInfoModalOpen(true);
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

  const handleProfilePictureChange = (profilePicture) => {

  };

  const uploadProfilePicture = async () => {
    const fileInput = document.getElementById('profilePictureInput');
    const file = fileInput.files[0];
  
  
    const formData = new FormData();
    formData.append('profilePic', file);
  
    try {
      const response = await fetch(`http://localhost:9191/user/profile-pic/${userId}`, {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        console.log('Profile picture uploaded successfully');
      } else {
        console.log('Profile picture upload failed');
      }
    } catch (error) {
      console.log('An error occurred while uploading the profile picture:', error);
    }
  };

  return (
    <div>
      <div className="w3-top z-index10">
        <div className="w3-bar w3-white w3-card" id="myNavbar">
          <a href="/" className="w3-bar-item w3-button w3-wide">ELECTROGHIURAI</a>
          <div className="w3-right w3-hide-small">
            <a href="/login" className="w3-bar-item w3-button"><i className="fa fa-sign-out"></i> SIGN OUT</a>
          </div>
        </div>
      </div>
      <div className="testpage-m" ref={menuRef}>
        <div className="testpage_mitems">
          <a href="#" className="testpage_mitem" ref={(el) => (menuItemsRef.current[0] = el)} onClick={openAccountInfoModal}>Account Overview</a>
          <a href="#" className="testpage_mitem" ref={(el) => (menuItemsRef.current[1] = el)} onClick={openOrderInfoModal}>Current Orders</a>
          <a href="/order" className="testpage_mitem" ref={(el) => (menuItemsRef.current[2] = el)}>Create an order</a>
        </div>
        <div className="testpage_mpattern"></div>
        <div className="testpage_mimage"></div>
      </div>
      {accountInfoModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="w3-button w3-black close" onClick={() => setAccountInfoModalOpen(false)}>&times;</span>
            <div>
              <div className="account-modal account-op">
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
                        <tr>
                          <td>Username</td>
                          <td>{userInfo.username}</td>
                        </tr>
                        <tr>
                          <td>First Name</td>
                          <td>{userInfo.firstName}</td>
                        </tr>
                        <tr>
                          <td>Last Name</td>
                          <td>{userInfo.lastName}</td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td>{userInfo.email}</td>
                        </tr>
                        <tr>
                          <td>Country of Origin</td>
                          <td>{userInfo.country}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="profile-picture-container">
                    <img src={userInfo.profilePicture} className="profile-picture" />
                      <input type="file" id="profilePictureInput" accept="image/*" />
                      <button onClick={uploadProfilePicture}>Upload Picture</button>
                    </div>
                  </>
                ) : (
                  <p>Failed to load user information.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {orderInfoModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="w3-button w3-black close" onClick={() => setOrderInfoModalOpen(false)}>&times;</span>
            <div>
              <div className="account-modal account-op">
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
                              className="w3-button w3-black app-button-simple4"
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
              </div>
            </div>
          </div>
        </div>
      )}
      {modalOpen && selectedOrder && (
        <div className="modal">
          <div className="modal-content">
            <span className="w3-button w3-black close" onClick={closeModal}>&times;</span>
            <h2>Selected Order Details</h2>
            <table className="order-table">
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
                <tr>
                  <td>Status</td>
                  <td>{getOrderStatusName(selectedOrder.orderStatus)}</td>
                </tr>
              </tbody>
            </table>
            <br />
            {selectedOrder.orderStatus === 3 && (
              <div>
                <button
                  className="w3-button w3-black app-button"
                  onClick={() => handleDownloadCode(selectedOrder.orderId)}
                >
                  Download Code
                </button>
                <br />
                <br />
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
      <ToastContainer />
    </div>
  );
}

export default AccountInfo;
