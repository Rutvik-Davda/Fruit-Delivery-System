import React from "react";
import "../../css/ord.css";
import shopIcon from "../../assets/images/shoping.png";

function Ord() {
    return (
        <section className="ord-section">
            <div className="container">
                <div className="row justify-content-center text-center">
                    <div className="col-12 col-md-10 col-lg-8">

                        <h1 className="ord-title">
                            Ready to Get Fresh Fruits?
                        </h1>

                        <p className="ord-subtitle">
                            Order now and get same-day delivery on all orders above ₹500
                        </p>

                        <div className="ord-btn-wrap">
                            <button className="ord-btn">
                                Start Shopping
                                <img
                                    src={shopIcon}
                                    alt="shopping icon"
                                    className="ord-btn-icon"
                                />

                            </button>
                        </div>


                    </div>
                </div>
            </div>
        </section>
    );
}

export default Ord;
