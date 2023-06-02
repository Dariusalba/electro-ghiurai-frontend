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
    
    fetch('http://localhost:9191/user/login', {
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

  // const handleSubmitEmployee = (e) => {
  //   e.preventDefault();
  //   console.log(JSON.stringify(values));
    
  //   fetch('http://localhost:9191/user/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(values),
  //   })
  //     .then(response => {
  //       if (response.status === 200) {
  //         console.log('Login successful');
  //         response.json().then(data => {
  //           const employeeId = data.employeeId;
  //           sessionStorage.setItem('employeeId', employeeId);
  //           window.location.href = '/employee/dashboard';
  //         });
  //       } else if (response.status === 401) {
  //         console.error('Invalid username or password');
  //         notifyInvalidUsernamePassword();
  //       } else if (response.status === 404) {
  //         console.error('User not found');
  //         notifyUserNotFound();
  //       } else {
  //         console.error('Error:', response.status);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // };
  // const handleSubmitManager = (e) => {
  //   e.preventDefault();
  //   console.log(JSON.stringify(values));

  //   fetch('http://localhost:9191/mng/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(values),
  //   })
  //     .then(response => {
  //       if (response.status === 200) {
  //           console.log('Login successful');
  //           window.location.href = '/manager/dashboard';
  //       } else if (response.status === 401) {
  //         console.error('Invalid username or password');
  //         notifyInvalidUsernamePassword();
  //       } else if (response.status === 404) {
  //         console.error('User not found');
  //         notifyUserNotFound();
  //       } else {
  //         console.error('Error:', response.status);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // const onUserTypeChange = (e) => {
  //   setValues({ ...values, userType: e.target.value });
  // };

  // let x;
  // if (values.userType === "manager") {
  //   x = handleSubmitManager
  // } else if (values.userType === "employee") {
  //   x = handleSubmitEmployee
  // } else {
  //   x = handleSubmit
  // }

  return (
    <div>
      <div className="welcome2">
        <Link to="/">
          <h1 className='welcome-h1'>ElectroGhiurai</h1>
        </Link>
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
          <button className='app-button'>Login</button>
          <p>Don't have an account? <Link to="/register">Register now</Link>!</p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginForm;
