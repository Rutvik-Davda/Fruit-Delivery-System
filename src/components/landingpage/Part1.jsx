import React from "react";
import "../../css/part.css";

import brandImg from "../../assets/images/part3.jpg";

const Part1 = () => {
    return (
        <section className="brand-section">
            <div className="container">
                <div className="row brand-row">

                    <div className="col-lg-6 col-md-12 brand-image">
                        <img src={brandImg} alt="Fruit Brand"  className="brand-img"/>
                    </div>

                    <div className="col-lg-6 col-md-12 brand-content">
                        <h2 className="brand-p">BRAND INFO</h2>

                        <p className="brand-p">
                            Our fruit brand is built on freshness, quality, and trust. We work
                            directly with local farmers and trusted growers to bring you
                            handpicked fruits that are naturally ripened and carefully
                            selected. Every fruit goes through strict quality checks to ensure
                            it reaches you fresh, flavorful, and full of nutrition.
                        </p>

                        <p className="brand-p">
                            We believe that healthy living starts with what you eat. That's why
                            our fruits are sourced using responsible farming practices that
                            protect the environment and preserve natural taste. From juicy
                            citrus fruits to exotic seasonal selections, we are committed to
                            delivering produce that is both wholesome and delicious.
                        </p>

                        <p className="brand-p">
                            With a focus on customer satisfaction, fast delivery, and premium
                            quality, our brand aims to make fresh fruits accessible to every
                            household. Whether you are shopping for daily essentials or
                            special treats, we promise freshness, transparency, and excellence
                            in every order.
                        </p>

                        <div className="brand-btn-wrapper">
                            <button className="brand-btn">Learn More</button>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Part1;
