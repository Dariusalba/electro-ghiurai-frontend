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
    setRemarks([...remarks, remarkValue]);
    setValues({ ...values, remarks: [...values.remarks, remarkValue] });
    setRemarkValue("");
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const newValues = { ...values, remarks };
  
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
          remarks.forEach((remark) => {
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
            <div key={index}>{remark}</div>
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
