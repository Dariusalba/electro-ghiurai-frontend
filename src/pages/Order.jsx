import { useState } from "react";
import '../components/Order.css';
import { ToastContainer, toast } from 'react-toastify';

const userId = sessionStorage.getItem("userId");

function OrderForm() {
  const [values, setValues] = useState({
    customerId: `${userId}`,
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

  const orderPlaced = () => 
    toast.success('✅ Order placed successfully', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newValues = { ...values, remarks };
    const remarksJson = JSON.stringify(remarks);

    fetch(`http://localhost:9191/customer/order/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newValues),
    })
      .then((response) => {
        if (response.status === 201) {
          orderPlaced();
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
      <div class="w3-top">
        <div class="w3-bar w3-white w3-card" id="myNavbar">
          <a href="/account" class="w3-bar-item w3-button w3-wide">ELECTROGHIURAI</a>
        </div>
      </div>
      <div className="order-bg">
      <div className="order-app">
        <h1 className="app-h1">Create an order</h1>
        <form onSubmit={handleSubmit} id="order-form">
          <div className="form-input">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              className="order-input"
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
              <br />
              <button type="button" onClick={handleAddRemark} className="w3-button w3-black app-button-remark">
              Add Remark
              </button>
              <label className="form-input">Remarks:</label>
              <div>
                {remarks.map((remark, index) => (
                  <div className="remark" key={index}>
                    -{remark.description}
                  </div>
                ))}
              <br></br>
              </div>
            </div>
          </div>
        
          <button type="submit" className="w3-button w3-black app-button">Submit</button>
          <br />
          <button type="button" onClick={accountRedirect} className="w3-button w3-black app-button">Go Back</button>
        </form>
        <ToastContainer />
      </div>
      </div>
    </div>
  );
}

export default OrderForm;