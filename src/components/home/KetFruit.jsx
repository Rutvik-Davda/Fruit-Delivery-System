import React from 'react'
import "../../css/KetFruit.css";
import AppleImg from "../../assets/images/a-1.jpg";
import StrawberryImg from "../../assets/images/s-1.jpg";
import CherryImg from "../../assets/images/Cherry.jpg";
function KetFruit() {
  return (

 <section className="ob-wrapper">
      <div className="ob-grid">

        <div className="ob-card ob-border-orange">
          <img src={AppleImg} alt="Apple" className="ob-image" />

          <div className="ob-overlay ob-green">
            <h4 className="ob-text-white">Fresh Apples</h4>
            <p className="ob-text-dark">20% OFF</p>
          </div>
        </div>

        <div className="ob-card ob-border-dark">
          <img src={StrawberryImg} alt="Strawberry" className="ob-image" />

          <div className="ob-overlay ob-white">
            <h4 className="ob-text-green">Tasty Fruits</h4>
            <p className="ob-text-gray">Free Delivery</p>
          </div>
        </div>

        <div className="ob-card ob-border-green">
          <img src={CherryImg} alt="Cherry" className="ob-image" />

          <div className="ob-overlay ob-orange">
            <h4 className="ob-text-white">Fruits Exotic</h4>
            <p className="ob-text-white">Discount ₹50</p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default KetFruit