import React from "react";
import "../../css/FruitJuice.css";

import J1 from "../../assets/images/Juice-1.jpg";
import J2 from "../../assets/images/Juice-2.jpg";
import J3 from "../../assets/images/Juice-3.jpg";
import J4 from "../../assets/images/Juice-4.jpg";
import J5 from "../../assets/images/Juice-5.jpg";
import J6 from "../../assets/images/Juice-6.jpg";





import facebook from "../../assets/images/facebook1.png";
import twitter from "../../assets/images/twitter.png";
import phone from "../../assets/images/phone1.png";
import envelope from "../../assets/images/envelope.png";
import map from "../../assets/images/map2.png";

function FruitJuice() {

  const juices = [
    { img: J1, name: "Apple Juice" },
    { img: J2, name: "Grape Juice" },
    { img: J3, name: "Orange Juice" },
    { img: J4, name: "Passion Fruit Juice" },
    { img: J5, name: "Peach Juice" },
    { img: J6, name: "Pear Juice" }
  ];

  return (
    <div className="fj-wrapper">


      <div className="fj-title-box">
        <h2 className="fj-title-text">Fresh Fruit Juice</h2>
      </div>

      <div className="container text-center">
        <div className="row">
          {juices.map((item, index) => (
            <div className="col-md-4" key={index}>
              <div className="fj-card">
                <img
                  src={item.img}
                  alt={item.name}
                  className="fj-card-image"
                />
                <div className="fj-name-box">
                  <span className="fj-juice-name">{item.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div>

        <div>


          <section className="fruit-map-section">
            <iframe
              title="Fruit Store Location"
              src="https://www.google.com/maps?q=fruit%20market%20gujarat&z=14&output=embed"
              loading="lazy"
            ></iframe>
          </section>

          <footer className="fruit-footer">
            <div className="fruit-footer-container">
              <div className="fruit-footer-row">

                <div className="fruit-footer-col">
                  <h3 className="fruit-footer-title fruit-brand-title">🍎 FreshFruit</h3>
                  <p className="fruit-footer-text">
                    Delivering fresh, organic fruits right to your doorstep.
                    Quality you can trust, freshness you can taste.
                  </p>

                  <div className="fruit-footer-social">
                    <img src="/src/assets/images/facebook.png" />
                    <img src="/src/assets/images/instagram1.png" />
                    <img src={twitter} alt="twitter" />
                  </div>
                </div>

                <div className="fruit-footer-col">
                  <h4 className="fruit-footer-title">Quick Links</h4>
                  <ul className="fruit-footer-links">
                    <li>Home</li>
                    <li>Fruits</li>
                    <li>Products</li>
                    <li>About Us</li>
                  </ul>
                </div>

                <div className="fruit-footer-col">
                  <h4 className="fruit-footer-title">Contact Us</h4>

                  <p className="fruit-footer-contact">
                    <span className="fruit-contact-icon">
                      <img src="/src/assets/images/call.png" />
                    </span>
                    +91 98765 43210
                  </p>

                  <p className="fruit-footer-contact">
                    <span className="fruit-contact-icon">
                      <img src={envelope} />
                    </span>
                    info@freshfruit.com
                  </p>

                  <p className="fruit-footer-contact">
                    <span className="fruit-contact-icon">
                      <img src={map} />
                    </span>
                    123 Fruit Street, Gujarat, India
                  </p>
                </div>

                <div className="fruit-footer-col">
                  <h4 className="fruit-footer-title">Opening Hours</h4>

                  <ul className="fruit-footer-hours">
                    <li><span>Monday - Friday:</span><b>8AM - 8PM</b></li>
                    <li><span>Saturday:</span><b>9AM - 6PM</b></li>
                    <li><span>Sunday:</span><b>10AM - 4PM</b></li>
                  </ul>
                </div>

              </div>

              <div className="fruit-footer-bottom">
                © 2026 FreshFruit Delivery. All rights reserved.
              </div>
            </div>
          </footer>
        </div>

      </div>
    </div>
  );
}

export default FruitJuice;
