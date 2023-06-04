import React, { useState } from 'react';
import "../App.css";
import { Link } from 'react-router-dom';
import FormInput from "../components/forminput.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      pattern: "^[A-Za-z0-9_@#]{3,16}$",
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
      pattern: `(.*?)`,
      required: true,
    },
  ];

  const notifyInvalidUsernamePassword = () =>
    toast.error('❌ Invalid username or password', {
      position: "bottom-right",
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
      position: "bottom-right",
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

    fetch('http://localhost:9191/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(response => {
        if (response.status === 200) {
          response.json().then(data => {
            const userId = data.userId;
            sessionStorage.setItem('userId', userId);
            if (data.position === 1) {
              window.location.href = '/account';
            } else if (data.position === 2 || data.position === 3) {
              window.location.href = '/employee/dashboard'
            } else if (data.position === 4) {
              window.location.href = '/manager/dashboard';
            } else {
              console.error('User position is invalid or fetched incorrectly.');
            }
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
    <div id="loginform">
      <div class="w3-top">
        <div class="w3-bar w3-white w3-card" id="myNavbar">
          <a href="../" class="w3-bar-item w3-button w3-wide">ELECTROGHIURAI</a>
        </div>
      </div>
      <div className="app">
        <form onSubmit={handleSubmit}>
          <h1 className='app-h1'>Login</h1>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button className='w3-button w3-black app-button'>Login</button>
          <p>Don't have an account? <Link to="/register">Register now</Link>!</p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginForm;
