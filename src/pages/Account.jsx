import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AccountInfo() {
  const userId = sessionStorage.getItem("userId");
  const [userInfo, setUserInfo] = useState({});
  const [orders, setOrders] = useState([]);

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
    }
  
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:9191/customer/${userId}/order`);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  
    fetchUserInfo();
    fetchOrders();
  }, [userId]);

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
      <div className="app">
        <h1>Account Information</h1>
        <h2>User Information:</h2>
        {Object.keys(userInfo).length > 0 ? (
          <>
            <p className="account-p">Username: {userInfo.username}</p>
            <p className="account-p">First Name: {userInfo.firstName}</p>
            <p className="account-p">Last Name: {userInfo.lastName}</p>
            <p className="account-p">Email: {userInfo.email}</p>
            <p className="account-p">Country of Origin: {userInfo.country}</p>
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
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.title}</td>
                  <td>{order.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders found.</p>
        )}
        <Link to="/order">
          <button className="app-button">Create Order</button>
        </Link>
      </div>
    </div>
  );
}

export default AccountInfo;
