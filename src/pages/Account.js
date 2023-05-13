import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AccountInfo() {
  const customerId = sessionStorage.getItem("customerId");
  const [userInfo, setUserInfo] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:9191/customer/${customerId}`);
        const data = await response.json();
        const { username, firstName, lastName, email, countryOfOrigin } = data;
        setUserInfo({ username, firstName, lastName, email, countryOfOrigin });
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:9191/customer/${customerId}/order`);
        const data = await response.json();
        const { orderId, title, description } = data;
        setOrders({ orderId, title, description });
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  
    fetchUserInfo();
    fetchOrders();
  }, [customerId]);
  

  return (
    <div className="app">
      <h1>Account Information</h1>
      <h2>User Information:</h2>
      {Object.keys(userInfo).length > 0 ? (
        <>
          <p className="account-p">Username: {userInfo.username}</p>
          <p className="account-p">First Name: {userInfo.firstName}</p>
          <p className="account-p">Last Name: {userInfo.lastName}</p>
          <p className="account-p">Email: {userInfo.email}</p>
          <p className="account-p">Country of Origin: {userInfo.countryOfOrigin}</p>
        </>
      ) : (
        <p>Loading user information...</p>
      )}
      <h2>Current Orders:</h2>
      {Object.keys(orders).length > 0 ? (
          <>
            <p className="account-p">Order ID: {orders.orderId}</p>
            <p className="account-p">Title: {orders.title}</p>
            <p className="account-p">Description: {orders.description}</p>
          </>
        ) : (
        <p>No orders found.</p>
      )}
      <Link to="/order">
        <button>Create Order</button>
      </Link>
    </div>
  );
}

export default AccountInfo;
