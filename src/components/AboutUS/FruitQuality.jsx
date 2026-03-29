import React, { useState } from "react";
import "../../css/FruitQuality.css";

import Q1 from "../../assets/images/Quality-1.jpg";
import Q2 from "../../assets/images/Quality-2.jpg";
import Q3 from "../../assets/images/Quality-3.jpg";
import MostImg from "../../assets/images/most.jpg";



import facebook from "../../assets/images/facebook1.png";
import twitter from "../../assets/images/twitter.png";
import phone from "../../assets/images/phone1.png";
import envelope from "../../assets/images/envelope.png";
import map from "../../assets/images/map2.png";
function FruitQuality() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleClick = () => {
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="fq-wrapper">

      <section className="fq-section">
        <div className="fq-row">
          <div className="fq-col fq-img-col">
            <img src={Q1} alt="Quality Control" />
          </div>



          <div className="fq-col fq-box">
            <h3 className="fq-title">
              I. Full - chain Quality Control for Fresh Fruits
            </h3>

            <p className="fq-text">
              1. Precise Harvesting
              Harvesting adheres to scientific ripeness standards, safeguarding taste and nutrition.
              <br /><br />
              2. Premium Packaging
              Food-grade materials with cushioning and fresh-keeping features protect fruits during transit.
              <br /><br />
              3. Rigorous Temperature Control
              A comprehensive system monitors pre-cooling, cold-chain transport, and storage, with real-time container tracking.
            </p>
          </div>
        </div>
      </section>

      <section className="fq-section">
        <div className="fq-row reverse">
          <div className="fq-col fq-box">
            <h3 className="fq-title">
              II. Quality Assurance for Other Fruit Products
            </h3>

            <p className="fq-text">
              1. Raw Material Screening
              A grading mechanism uses refractometers and acidometers to ensure defect-free raw materials.
              <br /><br />
              2. Advanced Processing
              Low-temperature vacuum drying, ultra-low-temperature freezing (-35℃ to -40℃), and aseptic cold filling preserve integrity.
              <br /><br />
              3. Comprehensive Inspection
              HACCP-compliant checkpoints test microbial, physical, chemical, and sensory indicators.
              <br /><br />
              4. Specialized Storage & Transport
              Dried fruits at 20℃, frozen goods below -18℃, juices transported at 0–10℃ with real-time monitoring.
            </p>
          </div>

          <div className="fq-col fq-img-col">
            <img src={Q2} alt="Processing Quality" />
          </div>
        </div>
      </section>

      <section className="fq-section">
        <div className="fq-row">
          <div className="fq-col fq-img-col">
            <img src={Q3} alt="Customer Recognition" />
          </div>

          <div className="fq-col fq-box">
            <h3 className="fq-title">
              III. Customer Recognition
            </h3>

            <p className="fq-text">
              The company’s quality initiatives have received wide acclaim.
              Screenshots of positive feedback demonstrate commitment to excellence,
              with continuous system optimization for higher reliability.
            </p>
          </div>
        </div>

        <div>
          <section className="fq-contact-section">

            <div className="fq-contact-row">


              <div className="fq-contact-col fq-contact-img">
                <img src={MostImg} alt="Customer Meeting" />
              </div>


              <div className="fq-contact-col fq-contact-form-box">

                <h2 className="fq-contact-title">FORM</h2>

                <div className="fq-contact-form">

                  <div className="fq-form-group">
                    <label>Name *</label>
                    <input
                      type="text"
                      placeholder="Please Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="fq-form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      placeholder="Please Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="fq-form-group">
                    <label>Message *</label>
                    <textarea
                      plue={message}
                      onChlaceholder="Message will be displayed after confirmation"
                      vaange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </div>

                  <button
                    type="button"
                    className="fq-submit-btn"
                    onClick={handleClick}
                  >
                    Submit
                  </button>

                </div>

              </div>


            </div>

          </section>

        </div>

      </section>



      <div>
        <div>

          <section className="rf-map-section">
            <iframe
              title="Fruit Store Location"
              src="https://www.google.com/maps?q=fruit%20market%20gujarat&z=14&output=embed"
              loading="lazy"
            ></iframe>
          </section>

          <footer className="rf-footer">
            <div className="rf-container">
              <div className="rf-row">

                <div className="rf-col">
                  <h3 className="rf-title rf-brand">🍎 FreshFruit</h3>
                  <p className="rf-text">
                    Delivering fresh, organic fruits right to your doorstep.
                    Quality you can trust, freshness you can taste.
                  </p>

                  <div className="rf-social">
                    <img src="/src/assets/images/facebook.png" />
                    <img src="/src/assets/images/instagram1.png" />
                    <img src={twitter} alt="twitter" />
                  </div>
                </div>

                <div className="rf-col">
                  <h4 className="rf-title">Quick Links</h4>
                  <ul className="rf-links">
                    <li>Home</li>
                    <li>Fruits</li>
                    <li>Products</li>
                    <li>About Us</li>
                  </ul>
                </div>

                <div className="rf-col">
                  <h4 className="rf-title">Contact Us</h4>

                  <p className="rf-contact">
                    <span className="rf-icon">
                      <img src="/src/assets/images/call.png" />
                    </span>
                    +91 98765 43210
                  </p>

                  <p className="rf-contact">
                    <span className="rf-icon">
                      <img src={envelope} />
                    </span>
                    info@freshfruit.com
                  </p>

                  <p className="rf-contact">
                    <span className="rf-icon">
                      <img src={map} />
                    </span>
                    123 Fruit Street, Gujarat, India
                  </p>
                </div>

                <div className="rf-col">
                  <h4 className="rf-title">Opening Hours</h4>

                  <ul className="rf-hours">
                    <li><span>Monday - Friday:</span><b>8AM - 8PM</b></li>
                    <li><span>Saturday:</span><b>9AM - 6PM</b></li>
                    <li><span>Sunday:</span><b>10AM - 4PM</b></li>
                  </ul>
                </div>

              </div>

              <div className="rf-bottom">
                © 2026 FreshFruit Delivery. All rights reserved.
              </div>
            </div>
          </footer>
        </div>

      </div>


    </div>
  );
}

export default FruitQuality;
