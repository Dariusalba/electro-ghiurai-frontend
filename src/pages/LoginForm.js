import React, { useState } from 'react';
import "../App.css";
import FormInput from "../components/forminput.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-16 characters long and should contain a letter, number and a special character.",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];

  const notifyInvalidUsernamePassword = () =>
    toast.error('❌ Invalid username or password', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const notifyUserNotFound = () =>
    toast.error('❌ User not found', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(values));

    fetch('http://localhost:9191/customer/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(response => {
        if (response.status === 200) {
          console.log('Login successful');
          response.json().then(data => {
            const customerId = data.customerId;
            sessionStorage.setItem('customerId', customerId);
            window.location.href = '/account';
          });
        } else if (response.status === 401) {
          console.error('Invalid username or password');
          notifyInvalidUsernamePassword();
        } else if (response.status === 404) {
          console.error('User not found');
          notifyUserNotFound();
        } else {
          console.error('Error:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Login</button>
        <Link to="/employeelogin">
        <button>Login as Employee</button>
        </Link>
        <Link to="/manager">
        <button>Login as Manager</button>
      </Link>
      </form>
      <ToastContainer />
    </div>
  );
}

export default LoginForm;
