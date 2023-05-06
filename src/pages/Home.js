import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>ElectroGhiurai</h1>
      <p>Click the button below to register for an account:</p>
      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
}

export default Home;
