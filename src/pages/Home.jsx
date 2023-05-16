import React from 'react';
import { Link } from 'react-router-dom';
import '../components/Home.css'
import '../components/Animations.js'

function scroll_top() {
  window.scroll({top: 0, behavior: "smooth"});
}

function scroll_bottom() {
  window.scroll({top: 3100, behavior: "smooth"});
}

const Home = () => {
  return (
    <div>
      <div className="welcome1">
        <h1 className='welcome-h1'>ElectroGhiurai</h1>
        <button onClick={scroll_bottom} className='welcome-button'>Join us</button>
      </div>
      <div>
        <div className='welcome-app'>
          <h1 className='about-h1'>Who are we?</h1>
          <h1 className='about-p'>
            We are ElectroGhiurai! <br></br> We are a team of skilled software developers committed to delivering the best-in-class solutions for our clients.<br></br> Our focus is on creating innovative, reliable, and user-friendly software that empowers businesses to achieve their goals!
          </h1>
        </div>
        <div className='welcome-app2 reveal1'>
          <h1 className='about-h1'>What do we do?</h1>
          <h1 className='about-p'>
            We have years of experience in the industry and have successfully delivered solutions for businesses of all sizes, from startups to large enterprises.<br></br> Our expertise lies in a wide range of areas including web development, mobile app development, cloud computing, and more.
          </h1>
        </div>
        <div className='welcome-app3 reveal2'>
          <h1 className='about-h1'>How are our people?</h1>
          <h1 className='about-p'>
            Our team consists of talented developers who are passionate about staying up-to-date with the latest technologies and industry trends.<br></br> We believe in working collaboratively with our clients to understand their unique needs and provide tailored solutions that meet their expectations.
         </h1>
        </div>
        <div className='welcome-app4 reveal3'>
          <h1 className='about-h1'>How do we work?</h1>
          <h1 className='about-p'>
            At ElectroGhiurai, we are committed to providing exceptional customer service and ensuring that our clients are satisfied with our services.<br></br> We believe in building long-lasting relationships with our clients and helping them achieve their business objectives through our software development solutions.
          </h1>
        </div>
        <div className='welcome-app5 reveal4'>
          <h1 className='about-h1-1'>What are you waiting for?<br></br> Join right now!</h1>
          <Link className='rl-ref' to="/register">
            <button className='rl-button' onClick={scroll_top}>Register</button>
          </Link>
          <p className='about-p1'>or</p>
          <Link className='rl-ref' to="/login">
            <button className='rl-button' onClick={scroll_top}>Login</button>
          </Link>
        </div>
        <div className='footer'>
          <p id="scroll-reach">©2023 ElectroGhiurai. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
