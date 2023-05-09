import { useState, useEffect } from "react";

function AccountInfo() {
  const customerId = sessionStorage.getItem("customerId");
  const [userInfo, setUserInfo] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9191/customer/${customerId}`)
      .then((response) => response.json())
      .then((data) => {
        const { username, firstName, lastName, email, countryOfOrigin } = data;
        setUserInfo({ username, firstName, lastName, email, countryOfOrigin });
      })
      .catch((error) => console.error("Error: ", error));

    fetch(`http://localhost:9191/customer/order/${customerId}`)
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error: ", error));
  }, [customerId]);

  return (
    <div className="app">
      <h1>Account Information</h1>
      <h2>User Information:</h2>
      <p className="account-p">Username: {userInfo.username}</p>
      <p className="account-p">First Name: {userInfo.firstName}</p>
      <p className="account-p">Last Name: {userInfo.lastName}</p>
      <p className="account-p">Email: {userInfo.email}</p>
      <p className="account-p">Country of Origin: {userInfo.countryOfOrigin}</p>
      <h2>Current Orders:</h2>
      {orders.map((order) => (
        <div key={order.id}>
          <p className="account-p">Order ID: {order.id}</p>
          <p className="account-p">Title: {order.title}</p>
          <p className="account-p">Description: {order.description}</p>
        </div>
      ))}
    </div>
  );
}

export default AccountInfo;
