import { useState, useEffect } from "react";

function AccountInfo() {
  const customerId = sessionStorage.getItem("customerId");
  const orderId = sessionStorage.getItem("orderId");
  const [userInfo, setUserInfo] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9191/customer/register/')
      .then((response) => response.json())
      .then((data) => setUserInfo(data))
      .catch((error) => console.error("Error: ", error));

    fetch(`http://localhost:9191/customer/order/${customerId}`)
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error: ", error));
  }, [customerId]);

  return (
    <div>
      <h1>Account Information</h1>
      <h2>User Information:</h2>
      <p>Username: {userInfo.username}</p>
      <p>First Name: {userInfo.firstName}</p>
      <p>Last Name: {userInfo.lastName}</p>
      <h2>Current Orders:</h2>
      {orders.map((order) => (
        <div key={order.id}>
          <p>Order ID: {order.id}</p>
          <p>Title: {order.title}</p>
          <p>Description: {order.description}</p>
        </div>
      ))}
    </div>
  );
}

export default AccountInfo;