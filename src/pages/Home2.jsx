
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/Home2.css'
import '../components/Animations.js'

function scroll_top() {
  window.scroll({top: 0, behavior: "smooth"});
}

const Home2 = () => {
  useEffect(() =>{
    fetchFeedback();
  },[]);
  const [customerFeedback, setCustomerFeedback] = useState([]);
  const fetchFeedback = async () =>{
    const response = await fetch('http://localhost:9191/user/feedback');
    const data = await response.json();
    for(let i = 0; i<data.length ;i++){
      const customerResponse = await fetch(`http://localhost:9191/customer/${data[i].userId}`);
      const customerData = await customerResponse.json();
      data[i].firstName = customerData.firstName;
      data[i].lastName = customerData.lastName;
    }
    setCustomerFeedback(data);
  }
  return (
    <div>
      <div className="w3-top">
        <div className="w3-bar w3-white w3-card" id="myNavbar">
          <a href="#home" className="w3-bar-item w3-button w3-wide">ELECTROGHIURAI</a>
          <div className="w3-right w3-hide-small">
            <a href="#about" className="w3-bar-item w3-button">ABOUT</a>
            <a href="#team" className="w3-bar-item w3-button"><i className="fa fa-user"></i> TEAM</a>
            <a href="#reviews" className="w3-bar-item w3-button"><i className="fa fa-star"></i> REVIEWS</a>
            <a href="#register" className="w3-bar-item w3-button"><i className="fa fa-sign-in"></i> REGISTER</a>
          </div>
        </div>
      </div>
      <header className="bgimg-1 w3-display-container w3-white w3-grayscale-min" id="home">
        <div className="w3-display-left w3-text-white w3-padding-48">
          <span className="w3-jumbo w3-hide-small">We are ElectroGhiurai!</span><br />
          <span className="w3-xxlarge w3-hide-large w3-hide-medium">Start something that matters</span><br />
          <span className="w3-large">Welcome to our software-engineering extravaganza, where you can get top-quaility services.</span>
          <p><a href="#about" className="w3-button w3-white w3-padding-large w3-large w3-margin-top w3-opacity w3-hover-opacity-off">Learn more and join today</a></p>
        </div>
      </header>
      <div className="w3-container w3-white w3-padding-128-16" id="about">
        <h3 className="w3-center">ABOUT THE COMPANY</h3>
        <p className="w3-center w3-large">Key features of our company</p>
        <div className="w3-row-padding w3-center w3-margintop-64">
          <div className="w3-quarter">
            <i className="fa fa-desktop w3-margin-bottom w3-jumbo w3-center"></i>
            <p className="w3-large">Who are we?</p>
            <p>We are a team of skilled software developers committed to delivering the best-in-className solutions for our clients.<br></br> Our focus is on creating innovative, reliable, and user-friendly software that empowers businesses to achieve their goals!</p>
          </div>
          <div className="w3-quarter">
            <i className="fa fa-heart w3-margin-bottom w3-jumbo"></i>
            <p className="w3-large">What do we do?</p>
            <p>We have years of experience in the industry and have successfully delivered solutions for businesses of all sizes, from startups to large enterprises.<br></br> Our expertise lies in a wide range of areas including web development, mobile app development, cloud computing, and more.</p>
          </div>
          <div className="w3-quarter">
            <i className="fa fa-diamond w3-margin-bottom w3-jumbo"></i>
            <p className="w3-large">How are our people?</p>
            <p>Our team consists of talented developers who are passionate about staying up-to-date with the latest technologies and industry trends.<br></br> We believe in working collaboratively with our clients to understand their unique needs and provide tailored solutions that meet their expectations.</p>
          </div>
          <div className="w3-quarter">
            <i className="fa fa-cog w3-margin-bottom w3-jumbo"></i>
            <p className="w3-large">How do we work?</p>
            <p>At ElectroGhiurai, we are committed to providing exceptional customer service and ensuring that our clients are satisfied with our services.<br></br> We believe in building long-lasting relationships with our clients and helping them achieve their business objectives through our software development solutions.</p>
          </div>
        </div>
      </div>
      <div className="w3-container w3-light-grey w3-padding-128-16" id="team">
        <div className="w3-row-padding">
          <div className="w3-col m6">
            <h3>We make our customers happy.</h3>
            <p>After our customers receive the product, they send us feedback about what  they thought about the product.</p>
            <p><a href="#team" className="w3-button w3-black"><i className="fa fa-th"> </i> See what other people think about us</a></p>
          </div>
          <div className="w3-col m6">
            <div className="scontainer">
              <div className="wrapper">
                <img className="w3-image w3-round-large" src="https://blog.velsoft.com/wp-content/uploads/2018/03/happiness.jpg" alt="img1" width="800"></img>
                <img className="w3-image w3-round-large" src="https://content.fortune.com/wp-content/uploads/2017/01/gettyimages-533979847.jpg" alt="img2" width="800"></img>
                <img className="w3-image w3-round-large" src="https://ggsc.s3.amazonaws.com/images/uploads/How_Happy_Are_People_at_Work.jpg" alt="img3" width="800"></img>
                <img className="w3-image w3-round-large" src="https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg" alt="img4" width="800"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w3-container w3-white w3-padding-128-16" id="reviews">
        <h3 className="w3-center">CUSTOMER REVIEWS</h3>
        <p className="w3-center w3-large">See what other people think about us.</p>
        <div className="w3-row-padding w3-grayscale w3-margintop-64">
          {customerFeedback.length && customerFeedback.map((feedback)=>(
            <div className="w3-col l3 m6 w3-margin-bottom">
            <div className="w3-card">
              <div className="w3-container">
                <h3>{feedback.firstName+", "+feedback.lastName}</h3>
                <p>{feedback.description}</p>
                <p>{feedback.rating}/5</p>
              </div>
            </div>
          </div>
          )) }
      </div>
    </div>
    <div className="w3-container w3-row w3-center w3-dark-grey w3-padding-64">
      <div className="w3-quarter">
        <span className="w3-xxlarge">3</span>
        <br />Partners
      </div>
      <div className="w3-quarter">
        <span className="w3-xxlarge">55+</span>
        <br />Projects Done
      </div>
      <div className="w3-quarter">
        <span className="w3-xxlarge">24+</span>
        <br />Happy Clients
      </div>
      <div className="w3-quarter">
        <span className="w3-xxlarge">150+</span>
        <br />Meetings
      </div>
    </div>
    <div className="w3-container w3-light-grey w3-padding-128-16" id="register">
      <h3 className="w3-center">WHAT ARE YOU WAITING FOR</h3>
      <p className="w3-center w3-large">Let's get in touch. Register right now or contact us if you have any issues!</p>
      <div className="w3-margintop-48">
        <p className="w3-center"><i className="fa fa-map-marker fa-fw w3-xxlarge w3-margin-right"></i> Timisoara, Romania</p>
        <p className="w3-center"><i className="fa fa-phone fa-fw w3-xxlarge w3-margin-right"></i> Phone: +40 712 345 678</p>
        <p className="w3-center"><i className="fa fa-envelope fa-fw w3-xxlarge w3-margin-right"> </i> Email: customer.support@electro-ghiurai.com</p>
        <br />
        <p className="w3-center">
        <Link to="/login">
          <button className="w3-button w3-black" onClick={scroll_top}>LOGIN</button>
        </Link>
        <br />
        <br />
        <Link to="/register">
          <button className="w3-button w3-black" onClick={scroll_top}>REGISTER</button>
        </Link>
        </p>
      </div>
    </div>
    <footer className="w3-center w3-black w3-padding-64">
      <a href="#home" className="w3-button w3-light-grey"><i classNameName="fa fa-arrow-up w3-margin-right"></i>To the top</a>
      <p>©2023 ElectroGhiurai. All rights reserved.</p>
    </footer>
  </div>
  );
}

export default Home2;
