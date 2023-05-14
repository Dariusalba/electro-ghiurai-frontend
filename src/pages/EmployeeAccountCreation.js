import { useState } from "react";
import "../App.css";
import FormInput from "../components/forminput.js";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import countries from "../countries.json"

const EmployeeAccountCreation = () => {
  const [values, setValues] = useState({
    email: "",
    countryOfOrigin: "",
    password: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
  });

  const countryNames = countries.map((country) => country.english_name);

  const inputs = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "Employee's First Name",
      errorMessage: "Please enter a valid First Name",
      label: "First Name",
      required: true,
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      placeholder: "Employee's Last Name",
      errorMessage: "Please enter a valid Last Name",
      label: "Last Name",
      required: true,
    },
    {
      id: 3,
      name: "dateOfBirth",
      type: "date",
      placeholder: "Date of Birth",
      label: "Date of Birth",
      required: true,
    },
    {
      id: 4,
      name: "countryOfOrigin",
      type: "country",
      placeholder: "Country",
      label: "Country",
      errorMessage: "Please enter a valid country",
      required: true,
    },
    {
      id: 5,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Please enter a valid email address.",
      label: "Email",
      required: true,
    },
    {
      id: 6,
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

  const notifyUserExists = () =>
    toast.error('❌ Username already exists!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const emailNotValid = () =>
    toast.error('❌ Please enter a valid email address!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const countryNotValid = () =>
    toast.error('❌ Please enter a valid country!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  
    const nameNotEntered = () =>
    toast.error('❌ Please enter your first and last name!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    const userRegistered = () => 
    toast.success('✅ Employee account created, redirecting to dashboard', {
      position: "top-right",
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

    if (!values.firstName || !values.lastName) {
      nameNotEntered();
      return;
    }

    if (!isValidEmail(values.email)) {
      emailNotValid();
      return;
    }
    
    if (!countryNames.includes(values.countryOfOrigin)) {
      countryNotValid();
      return;
    }

    fetch('http://localhost:9191/mng/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(response => {
        if (response.status === 409) {
          console.error('Username already exists');
          notifyUserExists();
        } else if (response.status === 201) {
          userRegistered();
          setTimeout(() => {
            window.location.href = '/manager/dashboard';
          }, 2000);
          console.log('Data sent to server successfully:', response.json().then((file) => console.log(file)));
        } else {
          console.error('Error:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };


  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Create Emp Acc</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button onClick={handleSubmit}>Create Employee Account</button>
        <p>
            <Link to="/manager/dashboard">Back to dashboard</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EmployeeAccountCreation;