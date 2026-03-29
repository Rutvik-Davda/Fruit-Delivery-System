import React from "react";
import "../../css/FruitImage.css";

import Fruit1 from "../../assets/images/fruit-1.jpg";
import Fruit2 from "../../assets/images/fruit-2.jpg";
import Fruit3 from "../../assets/images/fruit-3.jpg";
import Fruit4 from "../../assets/images/fruit-4.jpg";

function FruitImage() {
  return (
    <div className="container fi-container">
      <div className="row fi-card">

        <div className="col-lg-3 col-md-6 col-sm-12">
          <img src={Fruit1} alt="Fruit 1" className="fi-img" />
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12">
          <img src={Fruit2} alt="Fruit 2" className="fi-img" />
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12">
          <img src={Fruit3} alt="Fruit 3" className="fi-img" />
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12">
          <img src={Fruit4} alt="Fruit 4" className="fi-img" />
        </div>

      </div>
    </div>
  );
}

export default FruitImage;
