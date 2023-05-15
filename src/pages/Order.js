import { useState } from "react";
import '../components/Order.css';
import { Link } from 'react-router-dom';

const customerId = sessionStorage.getItem("customerId");

function OrderForm() {
  const [values, setValues] = useState({
    customerId: `${customerId}`,
    title: "",
    description: "",
    progress: 0,
    remarks: [],
  });

  const [remarks, setRemarks] = useState([]);
  const [remarkValue, setRemarkValue] = useState("");

  const handleRemarkChange = (e) => {
    setRemarkValue(e.target.value);
  };

  const handleAddRemark = () => {
    const newRemark = { orderId: 0, description: remarkValue };
    setRemarks([...remarks, newRemark]);
    setValues({ ...values, remarks: [...values.remarks, newRemark] });
    setRemarkValue("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newValues = { ...values, remarks };
    const remarksJson = JSON.stringify(remarks);

    fetch(`http://localhost:9191/customer/order/${customerId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newValues),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log("Order placed successfully");
          response.json().then((data) => {
            const orderId = data.orderId;
            fetch(`http://localhost:9191/customer/order/remark/${orderId}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: remarksJson,
            })
              .then((response) => {
                if (response.status === 201) {
                  console.log("Remarks added successfully");
                } else {
                  console.error("Error: ", response.status);
                }
              })
              .catch((error) => {
                console.error("Error: ", error);
              });
          });
        } else {
          console.error("Error: ", response.status);
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });

    setValues({ title: "", description: "", remarks: [] });
    setRemarks([]);
  };

  const accountRedirect = () => {
    window.location.href = "/account";
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div>
      <div className="welcome2">
        <Link to="/account">
          <h1 className='welcome-h1'>ElectroGhiurai</h1>
        </Link>
      </div>
      <div className="order-app">
        <h1 className="app-h1">Create an order</h1>
        <form onSubmit={handleSubmit} id="order-form">
          <div className="form-input">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={values.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <label htmlFor="description">Description:</label>
            <textarea
              form="order-form"
              id="description"
              name="description"
              className="description-input"
              value={values.description}
              onChange={handleChange}>
            </textarea>
          </div>
          <div className="form-input">
            <label htmlFor="remark">Remark:</label>
            <div className="add-remark-input">
              <input
                type="text"
                id="remark"
                name="remark"
                value={remarkValue}
                onChange={handleRemarkChange}
                className="remark-input"
              />
              <button type="button" onClick={handleAddRemark} className="app-button">
              Add Remark
              </button>
              <label className="form-input">Remarks:</label>
              <div className="remark-input">
                {remarks.map((remark, index) => (
                  <div className="remark" key={index}>
                    *{remark.description};
                  </div>
                ))}
              <br></br>
              </div>
            </div>
          </div>
        
          <button type="submit" className="app-button">Submit</button>
          <button type="button" onClick={accountRedirect} className="app-button">Go Back</button>
        </form>
      </div>
    </div>
  );
}

export default OrderForm;