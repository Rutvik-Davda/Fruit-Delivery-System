import React from "react";
import "../../css/FrozenFruits.css";

import F1 from "../../assets/images/Frozen-1.jpg";
import F2 from "../../assets/images/Frozen-2.jpg";
import F3 from "../../assets/images/Frozen-3.jpg";
import F4 from "../../assets/images/Frozen-4.jpg";
import F5 from "../../assets/images/Frozen-5.jpg";
import F6 from "../../assets/images/Frozen-6.jpg";
import F7 from "../../assets/images/Frozen-7.jpg";
import F8 from "../../assets/images/Frozen-8.jpg";
import F9 from "../../assets/images/Frozen-9.jpg";

function FrozenFruits() {
  const fruits = [
    { img: F1, name: "Frozen Apple" },
    { img: F2, name: "Frozen Apricot" },
    { img: F3, name: "Frozen Blackberry" },
    { img: F4, name: "Frozen Blueberry" },
    { img: F5, name: "Frozen Kiwi" },
    { img: F6, name: "Frozen Pear" },
    { img: F7, name: "Frozen Raspberry" },
    { img: F8, name: "Frozen Strawberry" },
    { img: F9, name: "Frozen Yellow Peach" }
  ];

  return (
    <div className="ffz-wrapper">

      <div className="ffz-title-box">
        <h2 className="ffz-title-text">Frozen Fruits</h2>
      </div>

      <div className="container text-center">
        <div className="row row-cols-3">
          {fruits.map((item, index) => (
            <div className="col" key={index}>
              <div className="ffz-card">
                <img
                  src={item.img}
                  alt={item.name}
                  className="ffz-card-image"
                />
                <div className="ffz-name-box">
                  <span className="ffz-fruit-name">
                    {item.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default FrozenFruits;
