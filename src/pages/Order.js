import { useState } from "react";

const customerId = sessionStorage.getItem("customerId");
const orderId = sessionStorage.getItem("orderId");

function OrderForm() {
  const [values, setValues] = useState({
    customerId: `${customerId}`,
    title: "",
    description: "",
    progress: 0,
  });

  const [remarks, setRemarks] = useState([]);

  const handleAddRemark = (e) => {
    e.preventDefault();
    const remark = values.remark;
    if (!remark) {
      return;
    }
    fetch(`http://localhost:9191/customer/order/remark/${orderId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ remark }),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log("Remark added successfully");
          setRemarks([...remarks, remark]);
          setValues({ ...values, remark: "" });
        } else {
          console.error("Error: ", response.status);
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:9191/customer/order/${customerId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log("Order placed successfully");
          response.json().then(data => {
            const orderId = data.orderId;
            sessionStorage.setItem('orderId', orderId);
          })
        } else {
          console.error("Error: ", response.status);
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });

    setValues({ title: "", description: "" });
    console.log(values);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={values.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        <form onSubmit={handleAddRemark}>
          <div>
            <label htmlFor="remark">Add Remark:</label>
            <input
              type="text"
              id="remark"
              name="remark"
              value={values.remark}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Add Remark</button>
        </form>
        {remarks.length > 0 && (
          <div>
            <h4>Remarks:</h4>
            <ul>
              {remarks.map((remark, index) => (
                <li key={index}>{remark}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button type="submit">Account Page</button>
    </div>
  );
}

export default OrderForm;
