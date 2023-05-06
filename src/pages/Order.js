import { useState } from "react";

const customerId = sessionStorage.getItem("customerId");

function OrderForm() {
  const [values, setValues] = useState({
    customerId: `${customerId}`,
    title: "",
    description: "",
    progress: 0,
  });

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
  );
}

export default OrderForm;