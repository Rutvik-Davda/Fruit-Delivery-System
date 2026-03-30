import React from 'react'
import Login from './Login'
import "../css/navbar.css"; 
import fruitLogo from "../assets/images/right-logo.png";
import Ourmenu from '../components/landingpage/Ourmenu';
import { useNavigate } from 'react-router-dom'
import FruitImg from "../assets/images/fruit.jpg";
import Homepage2 from '../components/landingpage/Homepage2';
import Part1 from '../components/landingpage/Part1';
import Part2 from '../components/landingpage/Part2';
import Productfruit from '../components/landingpage/Productfruit';
import FAQS from '../components/landingpage/FAQS';
import Ord from '../components/landingpage/Ord';
import Footer from '../components/landingpage/Footer';
const Landingpage = () => {

    const navigate=useNavigate()

    const handleLogin = ()=>{
        navigate("/login")
    } 


    
const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

  return (
    <>

 
    
    <div className="menu">
       
      <div className='navbarlist'>
        <div className="logo">
      <p class=" text-primary-add">FRUIT </p>
      <p class=" text-secondary-add">STORE</p>  
          <img src={fruitLogo} alt="logo" width="70px"  />
        </div>

        <ul>
          <label htmlFor="check" className="btn cancel">
            <i className="fas fa-times"></i>
          </label>
          
<li><button onClick={() => scrollToSection("home")}>Home</button></li>
<li><button onClick={() => scrollToSection("fruit")}>Fruit</button></li>
<li><button onClick={() => scrollToSection("product")}>Product</button></li>
<li><button onClick={() => scrollToSection("order")}>Order</button></li>
<li><button onClick={() => scrollToSection("about")}>About</button></li>



        </ul>

        </div>

        {/* <label htmlFor="check" className="btn bars">
          <i className="fas fa-bars"></i>
        </label> */}
      </div> <br></br>


         <section className="landing-section">
      <div className="container">
        <div className="row">

          <div className="col left-content">
            <h1>
              Fresh Fruits <br />
              <span>Delivered Daily</span>
            </h1>

            <p>
              Farm-fresh fruits delivered to your doorstep.
              Healthy, organic, and always fresh!
            </p>

            <div className="btn-group">
              <button className="btn shop-btn">Shop Now</button>
              <button className="btn learn-btn">Learn More</button>
              <button className="btn login-btn"onClick={handleLogin} >Login</button>
            </div>
          </div>

          <div className="col right-image">
            <img src={FruitImg} alt="Fresh Fruits" />
          </div>

        </div>
      </div>
    </section>

        {/* <div>
  <button onClick={handleLogin}> login</button>
         </div> */}

   <div>
<div id="home">
  <Homepage2/>
</div>

<div id="fruit">
  <Ourmenu/>
</div>

<div id="product">
  <Productfruit/>
</div>
 
 <div>
  <FAQS/>
 </div>
<div id="order">
  <Ord/>
</div>

<div id="about">
  <Footer/>
</div>

   </div>
  
   

    
    </>
    )
}

export default Landingpage 

