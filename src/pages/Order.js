import { useState } from "react";

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
  
    const newOrder = {
      customerId: customerId,
      title: values.title,
      description: values.description,
      progress: 0,
    };
  
    fetch(`http://localhost:9191/customer/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log("Order placed successfully");
          response.json().then((data) => {
            const orderId = data.orderId;
            const remarksToSend = remarks.map((remark) => {
              return { orderId: 0, description: remark };
            });
            remarksToSend.forEach((remark) => {
              fetch(`http://localhost:9191/customer/order/remark/${orderId}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(remark),
              })
                .then((response) => {
                  if (response.status === 201) {
                    console.log("Remark added successfully");
                  } else {
                    console.error("Error: ", response.status);
                  }
                })
                .catch((error) => {
                  console.error("Error: ", error);
                });
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
    console.log(values);
    console.log(remarks);
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
        <div>
          {remarks.map((remark, index) => (
            <div key={index}>{remark.description}</div>
          ))}
        </div>
        <div>
          <label htmlFor="remark">Remark:</label>
          <input
            type="text"
            id="remark"
            name="remark"
            value={remarkValue}
            onChange={handleRemarkChange}
          />
          <button type="button" onClick={handleAddRemark}>
            Add Remark
          </button>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default OrderForm;