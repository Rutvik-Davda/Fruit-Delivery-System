import React from "react";

import "../../css/footer.css";


import facebook from "../../assets/images/facebook1.png";   
import twitter from "../../assets/images/twitter.png";     
import phone from "../../assets/images/phone1.png";         
import envelope from "../../assets/images/envelope.png";   
import map from "../../assets/images/map2.png";           








function Footer() {
    return (
        <>
      
            <section className="map-section">
                <iframe
                    title="Fruit Store Location"
                    src="https://www.google.com/maps?q=fruit%20market%20gujarat&z=14&output=embed"
                    loading="lazy"
                ></iframe>
            </section>

            <footer className="footer">
                <div className="container">
                    <div className="row footer-row">

                     
                        <div className="col-lg-4 col-md-6 col-sm-12 footer-col">
                            <h3 className="footer-title brand-title">🍎 FreshFruit</h3>
                            <p className="footer-text">
                                Delivering fresh, organic fruits right to your doorstep.
                                Quality you can trust, freshness you can taste.
                            </p>

                            <div className="footer-social">
                                <img src="/src/assets/images/facebook.png" />
                                <img src="/src/assets/images/instagram1.png" />

                                <img src={twitter} alt="twitter" />
                            </div>


                        </div>

                   
                        <div className="col-lg-2 col-md-6 col-sm-12 footer-col">
                            <h4 className="footer-title">Quick Links</h4>
                            <ul className="footer-links">
                                <li>Home</li>
                                <li>Fruits</li>
                                <li>Products</li>
                                <li>About Us</li>
                            </ul>
                        </div>

               
                        <div className="col-lg-3 col-md-6 col-sm-12 footer-col">
                            <h4 className="footer-title">Contact Us</h4>

                            <p className="footer-contact">
                                <span className="contact-icon">
                                    <img src="/src/assets/images/call.png" alt="phone" />
                                </span>
                                +91 98765 43210
                            </p>

                            <p className="footer-contact">
                                <span className="contact-icon">
                                    <img src={envelope} alt="email" />
                                </span>
                                info@freshfruit.com
                            </p>

                            <p className="footer-contact">
                                <span className="contact-icon">
                                    <img src={map} alt="map" />
                                </span>
                                123 Fruit Street, Gujarat, India
                            </p>


                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-12 footer-col">
                            <h4 className="footer-title">Opening Hours</h4>

                            <ul className="footer-hours">
                                <li>
                                    <span>Monday - Friday:</span>
                                    <b>8AM - 8PM</b>
                                </li>
                                <li>
                                    <span>Saturday:</span>
                                    <b>9AM - 6PM</b>
                                </li>
                                <li>
                                    <span>Sunday:</span>
                                    <b>10AM - 4PM</b>
                                </li>
                            </ul>
                        </div>

                    </div>

                    <div className="footer-bottom">
                        © 2026 FreshFruit Delivery. All rights reserved.
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;


