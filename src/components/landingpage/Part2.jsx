import React from "react";
import "../../css/part2.css";
import part4Img from "../../assets/images/part-4.jpg";

function Part2() {
  return (
    <section className="part2-section">
      <div className="container">
        <div className="row align-items-center">

          <div className="col-lg-6 col-md-12">
            <div className="part2-content">

              <h1 className="part2-title">
                ONLINE <br /> FRUIT STORE
              </h1>

              <p className="part2-text">
                Online Fruit Store is a modern digital platform designed to make buying fresh fruits simple and convenient. Customers can browse a wide range of high-quality fruits, view detailed product information, and place orders easily from their homes. The system is built to save time while ensuring freshness and quality in every purchase.
              </p>

              <p className="part2-text">
                The project focuses on customer satisfaction by offering a user-friendly interface, quick ordering, and reliable delivery services. Features like cart management, easy navigation, and secure payment options help create a smooth and trustworthy shopping experience for users of all age groups.
              </p>

              <p className="part2-text">
                With an emphasis on premium quality, fast delivery, and transparency, the Online Fruit Store aims to make fresh fruits accessible to every household. Whether customers are shopping for daily needs or special occasions, the platform promises freshness, reliability, and excellence in every order.
              </p>

              <button className="part2-btn">
                Download the App
              </button>

            </div>
          </div>

<div className="col-lg-6 col-md-6 col-12">
  <div className="image-wrapper">
    <img
      src={part4Img}
      alt="Fruit Store"
      className="part2-image"
    />
  </div>
</div>



        </div>
      </div>
    </section>
  );
}

export default Part2;
