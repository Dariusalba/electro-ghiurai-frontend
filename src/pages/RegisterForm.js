import { useState } from "react";
import "../App.css";
import FormInput from "../components/forminput.js";
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    countryOfOrigin:"",
    password: "",
    firstName:"",
    lastName:"",
    dateOfBirth:"",
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
      name: "firstName",
      type: "text",
      placeholder: "Enter your First Name",
      errorMessage: "Please enter a valid First Name",
      label: "First Name",
      required: true,
    },
    {
      id: 3,
      name: "lastName",
      type: "text",
      placeholder: "Enter your Last Name",
      errorMessage: "Please enter a valid Last Name",
      label: "Last Name",
      required: true,
    },
    {
      id: 4,
      name: "dateOfBirth",
      type: "date",
      placeholder: "Date of Birth",
      label: "Date of Birth",
      required: true,
    },
    {
      id: 5,
      name: "countryOfOrigin",
      type: "country",
      placeholder: "Country",
      label: "Country",
      errorMessage: "Please enter a valid country",
      required: true,
    },
    {
      id: 6,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Please enter a valid email address.",
      label: "Email",
      required: true,
    },
    {
      id: 7,
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

  const handleSubmit = (e) => {
    e.preventDefault();
  
    fetch('http://localhost:9191/customer/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })
  .then(response => {
    if (response.status === 409) {
      console.error('Username already exists');
    } else if (response.status === 201) {
      console.log('Data sent to server successfully:', response.json());
    } else {
      console.error('Error:', response.status);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  console.log(values);
}
  
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button onClick = {handleSubmit}>Register</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default RegisterForm;