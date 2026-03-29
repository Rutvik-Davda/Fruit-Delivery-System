import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/FruitSalon.css";

import Blueberry from "../../assets/images/Blueberry.jpg";
import HomeImg from "../../assets/images/home.jpg";

function FruitSalon() {
  const navigate = useNavigate();

  return (
    <section className="fruit-salon-grid">

      <div className="fruit-salon-content">
        <h1>
          Enjoy Nature’s Best <br />
          <span>Farm-Fresh Fruits</span>
        </h1>

        <p>
          Handpicked Fruits  For your Health <br />
          and Happiness.
        </p>

      <div className="fruit-salon-btn-group">

  <button
    className="fruit-salon-btn"
    onClick={() => navigate("/salon1")}
  >
    Fruit Salon
  </button>

  <button
    className="fruit-orders-btn"
    onClick={() => navigate("/myorders")}
  >
    My Orders
  </button>

</div>
      </div>

      <div className="fruit-salon-images">
        <img src={Blueberry} alt="Blueberry" />
        <img src={HomeImg} alt="Fresh Fruits" />
      </div>

    </section>
  );
}

export default FruitSalon;
