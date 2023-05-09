import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='welcome'>
      <h1 className='welcome-h1'>ElectroGhiurai SDE</h1>
      <div className='welcome-app'>
        <h1 className='about-h1'>Who are we?</h1>
        <p className='about-p'>
           We are ElectroGhiurai! <br></br> We are a team of skilled software developers committed to delivering the best-in-class solutions for our clients.<br></br> Our focus is on creating innovative, reliable, and user-friendly software that empowers businesses to achieve their goals!
        </p>
      </div>
      <div className='welcome-app2'>
        <h1 className='about-h1'>What do we do?</h1>
        <p className='about-p'>
          We have years of experience in the industry and have successfully delivered solutions for businesses of all sizes, from startups to large enterprises.<br></br> Our expertise lies in a wide range of areas including web development, mobile app development, cloud computing, and more.
        </p>
      </div>
      <div className='welcome-app3'>
        <h1 className='about-h1'>How are our people?</h1>
        <p className='about-p'>
          Our team consists of talented developers who are passionate about staying up-to-date with the latest technologies and industry trends.<br></br> We believe in working collaboratively with our clients to understand their unique needs and provide tailored solutions that meet their expectations.
        </p>
      </div>
      <div className='welcome-app4'>
        <h1 className='about-h1'>How do we work?</h1>
        <p className='about-p'>
          At ElectroGhiurai SDE, we are committed to providing exceptional customer service and ensuring that our clients are satisfied with our services.<br></br> We believe in building long-lasting relationships with our clients and helping them achieve their business objectives through our software development solutions.
        </p>
      </div>
      <div className='welcome-app5'>
        <h1 className='about-h1-1'>What are you waiting for?<br></br> Register right now!</h1>
        <Link to="/register">
          <button>Register</button>
        </Link>
        <p className='about-p1'>or</p>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
