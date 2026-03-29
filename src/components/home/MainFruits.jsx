import React from "react";
import "../../css/MainFruits.css";

import Img1 from "../../assets/images/main-1.jpg";
import Img2 from "../../assets/images/main-2.jpg";
import Img3 from "../../assets/images/main-3.jpg";
import Img4 from "../../assets/images/main-4.jpg";

function MainFruits() {
  return (
    <div className="mf-wrapper">
      <div className="mf-box">
        <div className="mf-grid">
          <img src={Img1} alt="fruit 1" className="mf-img" />
          <img src={Img2} alt="fruit 2" className="mf-img" />
          <img src={Img3} alt="fruit 3" className="mf-img" />
          <img src={Img4} alt="fruit 4" className="mf-img" />
        </div>
      </div>
    </div>
  );
}

export default MainFruits;
