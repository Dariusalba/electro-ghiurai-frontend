import { useState } from "react";
import '../components/remarkstyles.css';

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
    <div className="app">
      <form onSubmit={handleSubmit}>
        <div className="title-input">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
          />
        </div>
        <div className="description-input">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={values.description}
            onChange={handleChange}
          />
        </div>
        <div className="remarks">
          {remarks.map((remark, index) => (
            <div className="remark" key={index}>
              {remark.description}
            </div>
          ))}
        </div>
        <div className="add-remark">
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
            <button type="button" onClick={handleAddRemark} className="add-remark-button">
            Add Remark
          </button>
          </div>
        </div>
        
        <button type="submit" className="submit-button">Submit</button>
        <button type="button" onClick={accountRedirect} className="account-button">Account Page</button>
      </form>
    </div>
  );
}

export default OrderForm;