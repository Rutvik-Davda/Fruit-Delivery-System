import React from "react";
import "../../css/Homepage2.css";

import truckIcon from "../../assets/images/truck2.png";
import shieldIcon from "../../assets/images/shield.png";
import clockIcon from "../../assets/images/clock.png";
import starIcon from "../../assets/images/star.png";


function Homepage2() {
  return (
    <div>

<section className="why-section">
  <div className="container">
    <h2 className="section-title">Why Choose Us?</h2>

    <div className="row">

      <div className="col-lg-3 col-md-6 col-sm-12">
        <div className="why-card">
         <div className="icon-circle">
  <img src={truckIcon} alt="Fast Delivery" />

</div>
          <h4>Fast Delivery</h4>
          <p>Same day delivery for orders before 12 PM</p>
        </div>
      </div>

      <div className="col-lg-3 col-md-6 col-sm-12">
        <div className="why-card">
      <div className="icon-circle">
  <img src={shieldIcon} alt="100% Fresh" />
</div>

          <h4>100% Fresh</h4>
          <p>All fruits are handpicked and quality checked</p>
        </div>
      </div>

      <div className="col-lg-3 col-md-6 col-sm-12">
        <div className="why-card">
<div className="icon-circle">
  <img src={clockIcon} alt="24/7 Support" />
</div>

          <h4>24/7 Support</h4>
          <p>We're here to help you anytime, anywhere</p>
        </div>
      </div>

      <div className="col-lg-3 col-md-6 col-sm-12">
        <div className="why-card">
<div className="icon-circle">
  <img src={starIcon} alt="Top Rated" />
</div>

          <h4>Top Rated</h4>
          <p>5-star ratings from thousands of customers</p>
        </div>
      </div>

    </div>
  </div>
</section>

      
      </div>
  )
}

export default Homepage2;