import React, { useState } from "react";
import "../../css/Aboutfirst.css";

import Img1 from "../../assets/images/mix-1.jpg";
import Img2 from "../../assets/images/mix-2.jpg";
import Img3 from "../../assets/images/mix-3.jpg";

function Aboutfirst() {
  const images = [Img1, Img2, Img3];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex(
      currentIndex === 0 ? images.length - 1 : currentIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex(
      currentIndex === images.length - 1 ? 0 : currentIndex + 1
    );
  };

  return (
    <div className="abf-wrapper">

      <button className="abf-arrow abf-left" onClick={prevImage}>
        &#60;
      </button>

      <div className="abf-image-box">
        <img
          src={images[currentIndex]}
          alt="About slider"
          className="abf-image"
        />
      </div>

      <button className="abf-arrow abf-right" onClick={nextImage}>
        &#62;
      </button>

    </div>
  );
}

export default Aboutfirst;
