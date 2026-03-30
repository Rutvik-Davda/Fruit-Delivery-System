import React from "react";
import "../../css/ourmenu.css";

import apple from "../../assets/images/apple.jpg";
import orange from "../../assets/images/orange.jpg";
import pineapple from "../../assets/images/Pineapple.jpg";
import kiwi from "../../assets/images/Kiwi.jpg";
import litchi from "../../assets/images/Litchi.jpg";
import strawberry from "../../assets/images/Strawberry.jpg";
import cherry from "../../assets/images/Cherry.jpg";
import avocado from "../../assets/images/Avocado.jpg";

function Ourmenu() {
  return (
    <section className="menu-section">
      <div className="container">
        <h2 className="menu-title">OUR MENU</h2>

        <div className="row-first">
          <MenuCard img={apple} name="Fresh Red Apples" price="120" />
          <MenuCard img={orange} name="Fresh Oranges" price="150" />
          <MenuCard img={pineapple} name="Fresh Pineapple" price="180" />
          <MenuCard img={kiwi} name="Fresh Kiwi" price="200" />
        </div>

        <div className="row-first">
          <MenuCard img={litchi} name="Fresh Litchi" price="160" />
          <MenuCard img={strawberry} name="Fresh Strawberry" price="220" />
          <MenuCard img={cherry} name="Fresh Cherries" price="190" />
          <MenuCard img={avocado} name="Fresh Avocado" price="250" />
        </div>
      </div>
    </section>
  );
}

const MenuCard = ({ img, name, price }) => {
  return (
    <div className="col-lg-3 col-md-6 col-sm-12">
      <div className="menu-card">
        <div className="menu-img">
          <img src={img} alt={name} />
        </div>
        <div className="menu-text">
          <h4>{name}</h4>
          <span>₹ {price}</span>
        </div>
      </div>
    </div>
  );
};

export default Ourmenu;
