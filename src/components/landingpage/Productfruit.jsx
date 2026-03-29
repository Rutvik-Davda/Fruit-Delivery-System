import React from "react";
import "../../css/productfruit.css";

import product1 from "../../assets/images/product-1.jpg";
import product2 from "../../assets/images/product-2.jpg";
import product3 from "../../assets/images/product-3.jpg";

function Productfruit() {
  return (
    <section className="product-section">
      <div className="container">
            
        <h2 className="product-title">Fruit based healthy products</h2>
        <p className="product-subtitle">Fresh, organic, and delicious</p>

        <div className="row">
          
          <div className="col-md-4 ">
            <div className="product-card">
              <img src={product3} alt="Fresh Apples" />
              <h3>Fresh Apples</h3>

              <div className="price-btn">
                <span className="price">₹120/1kg</span>
                <button className="buy-btn">Buy Now</button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="product-card">
              <img src={product2} alt="Sweet Banana" />
              <h3>Sweet Banana</h3>

              <div className="price-btn">
                <span className="price">₹80/2kg</span>
                <button className="buy-btn">Buy Now</button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="product-card">
              <img src={product1} alt="Pomegranate" />
              <h3>Pomegranate</h3>

              <div className="price-btn">
                <span className="price">₹150/1kg</span>
                <button className="buy-btn">Buy Now</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Productfruit;
