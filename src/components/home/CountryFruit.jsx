import React from "react";
import "../../css/CountryFruit.css";

import ApricotImg from "../../assets/images/Apricots.jpg";
import AvocadoImg from "../../assets/images/Avocado.jpg";
import GreenAppleImg from "../../assets/images/greemapple.jpg";
import PeachImg from "../../assets/images/Peach.jpg";
import LoganLitchiImg from "../../assets/images/LoganLitchi.jpg";
import PersimmonImg from "../../assets/images/Persimmon.jpg";





import facebook from "../../assets/images/facebook1.png";
import twitter from "../../assets/images/twitter.png";
import phone from "../../assets/images/phone1.png";
import envelope from "../../assets/images/envelope.png";
import map from "../../assets/images/map2.png";



function CountryFruit() {
    const fruits = [
        { img: ApricotImg, name: "Apricots" },
        { img: AvocadoImg, name: "Avocado" },
        { img: GreenAppleImg, name: "Green Apples" },
        { img: PeachImg, name: "Peach" },
        { img: LoganLitchiImg, name: "Logan Litchi" },
        { img: PersimmonImg, name: "Persimmon" },
    ];

    return (


        <section className="cf-wrapper">
            <div className="cf-grid">
                {fruits.map((item, index) => (
                    <div className="cf-card" key={index}>
                        <img src={item.img} alt={item.name} className="cf-image" />

                        <div className="cf-name-box">
                            <span className="cf-name-text">{item.name}</span>
                        </div>
                    </div>
                ))}
            </div>
            <br></br>
            <div>
                <div>

                    <section className="ff-map-section">
                        <iframe
                            title="Fruit Store Location"
                            src="https://www.google.com/maps?q=fruit%20market%20gujarat&z=14&output=embed"
                            loading="lazy"
                        ></iframe>
                    </section>

                    <footer className="ff-footer">
                        <div className="ff-container">
                            <div className="ff-footer-row">


                                <div className="ff-footer-col">
                                    <h3 className="ff-footer-title ff-brand-title">🍎 FreshFruit</h3>
                                    <p className="ff-footer-text">
                                        Delivering fresh, organic fruits right to your doorstep.
                                        Quality you can trust, freshness you can taste.
                                    </p>

                                    <div className="ff-footer-social">
                                        <img src="/src/assets/images/facebook.png" alt="facebook" />
                                        <img src="/src/assets/images/instagram1.png" alt="instagram" />
                                        <img src={twitter} alt="twitter" />
                                    </div>
                                </div>

                                <div className="ff-footer-col">
                                    <h4 className="ff-footer-title">Quick Links</h4>
                                    <ul className="ff-footer-links">
                                        <li>Home</li>
                                        <li>Fruits</li>
                                        <li>Products</li>
                                        <li>About Us</li>
                                    </ul>
                                </div>

                                <div className="ff-footer-col">
                                    <h4 className="ff-footer-title">Contact Us</h4>

                                    <p className="ff-footer-contact">
                                        <span className="ff-contact-icon">
                                            <img src="/src/assets/images/call.png" alt="phone" />
                                        </span>
                                        +91 98765 43210
                                    </p>

                                    <p className="ff-footer-contact">
                                        <span className="ff-contact-icon">
                                            <img src={envelope} alt="email" />
                                        </span>
                                        info@freshfruit.com
                                    </p>

                                    <p className="ff-footer-contact">
                                        <span className="ff-contact-icon">
                                            <img src={map} alt="map" />
                                        </span>
                                        123 Fruit Street, Gujarat, India
                                    </p>
                                </div>

                                <div className="ff-footer-col">
                                    <h4 className="ff-footer-title">Opening Hours</h4>

                                    <ul className="ff-footer-hours">
                                        <li><span>Monday - Friday:</span><b>8AM - 8PM</b></li>
                                        <li><span>Saturday:</span><b>9AM - 6PM</b></li>
                                        <li><span>Sunday:</span><b>10AM - 4PM</b></li>
                                    </ul>
                                </div>

                            </div>

                            <div className="ff-footer-bottom">
                                © 2026 FreshFruit Delivery. All rights reserved.
                            </div>
                        </div>
                    </footer>

                </div>

            </div>
        </section>


    );
}
export default CountryFruit;
