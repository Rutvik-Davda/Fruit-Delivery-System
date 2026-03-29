import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../../css/Fruit.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { db } from "../../utils/firebase";
import { collection, getDocs } from "firebase/firestore";

import facebook from "../../assets/images/facebook1.png";
import twitter from "../../assets/images/twitter.png";
import phone from "../../assets/images/phone1.png";
import envelope from "../../assets/images/envelope.png";
import map from "../../assets/images/map2.png";

function Fruit() {

  const [fruits, setFruits] = useState([]);
  const navigate = useNavigate();

  /* ---------------- LOAD PRODUCTS FROM FIRESTORE ---------------- */

  useEffect(() => {

    const loadProducts = async () => {

      try {

        const snapshot = await getDocs(collection(db, "products"));

        const list = [];

        snapshot.forEach((doc) => {

          const data = doc.data();

          list.push({
            id: doc.id,
            name: data.name,
            price: data.price,
            weight: "1 Kg",
            image: data.imageUrl,
            qty: Number(localStorage.getItem("cart_" + doc.id)) || 0
          });

        });

        setFruits(list);

      } catch (err) {
        console.log("Product load error:", err);
      }

    };

    loadProducts();

  }, []);


  /* ---------------- ADD TO CART ---------------- */

  const handleAdd = (id) => {

    const updated = fruits.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );

    setFruits(updated);

    const clicked = updated.find(i => i.id === id);

    localStorage.setItem("cart_" + id, clicked.qty);

    updateNavbarCount(updated);

  };


  /* ---------------- REMOVE FROM CART ---------------- */

  const handleMinus = (id) => {

    const updated = fruits.map(item =>
      item.id === id && item.qty > 0
        ? { ...item, qty: item.qty - 1 }
        : item
    );

    setFruits(updated);

    const clicked = updated.find(i => i.id === id);

    if (clicked.qty > 0) {
      localStorage.setItem("cart_" + id, clicked.qty);
    } else {
      localStorage.removeItem("cart_" + id);
    }

    updateNavbarCount(updated);

  };


  /* ---------------- UPDATE CART COUNT ---------------- */

  const updateNavbarCount = (data) => {

    const total = data.reduce((sum, item) => sum + item.qty, 0);

    localStorage.setItem("cartvalue", total);

    window.dispatchEvent(new Event("cartUpdated"));

  };


  /* ---------------- WISHLIST ---------------- */

  const [wishlist, setWishlist] = useState({});

  useEffect(() => {

    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || {};

    setWishlist(savedWishlist);

  }, []);


  const handleWishlistToggle = (fruit) => {

    const updatedWishlist = { ...wishlist };

    if (updatedWishlist[fruit.id]) {

      delete updatedWishlist[fruit.id];

      toast.info("Fruit Successfully Removed", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });

    } else {

      updatedWishlist[fruit.id] = fruit;

      toast.success("Fresh Fruits added to wishlist", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });

    }

    setWishlist(updatedWishlist);

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    localStorage.setItem("wishlistCount", Object.keys(updatedWishlist).length);

    window.dispatchEvent(new Event("wishlistUpdated"));

  };


  /* ---------------- UI ---------------- */

  return (

    <section className="fruit-section">

      <div className="container">

        <div className="btn-grid">
          <button
            className="cart-btn"
            onClick={() => navigate("/userdashboard/fruit-orders")}
          >
            Go to Cart
          </button>
        </div>

        <div className="row g-4">

          {fruits.map((fruit) => (

            <div key={fruit.id} className="col-12 col-sm-6 col-md-4">

              <div className="fruit-card">

                <div className="fruit-img-wrapper">

                  <img
                    src={fruit.image}
                    alt={fruit.name}
                    className="fruit-img"
                  />

                  {/* Wishlist Icon */}
                  <div
                    className="fruit-heart-circle"
                    onClick={() => handleWishlistToggle(fruit)}
                  >

                    <img
                      src="/src/assets/images/heart(3).png"
                      alt="wishlist"
                      className={`fruit-heart-icon ${
                        wishlist[fruit.id] ? "heart-active" : ""
                      }`}
                    />

                  </div>

                </div>

                <h5 className="fruit-name">{fruit.name}</h5>

                <p className="fruit-weight">{fruit.weight}</p>

                <p className="fruit-price">Rs.{fruit.price}</p>

                <div className="qty-box">

                  <button
                    className="qty-btn"
                    onClick={() => handleMinus(fruit.id)}
                  >
                    −
                  </button>

                  <span className="qty-number">{fruit.qty}</span>

                  <button
                    className="qty-btn"
                    onClick={() => handleAdd(fruit.id)}
                  >
                    +
                  </button>

                </div>

                <button
                  className="add-btn"
                  onClick={() => handleAdd(fruit.id)}
                >
                  Add to Cart
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* ---------------- TOAST ---------------- */}

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="light"
        transition={Bounce}
      />


      {/* ---------------- FOOTER ---------------- */}

      <div className="fruit-footer-wrapper">

        <section className="fruit-map-section">
          <iframe
            title="Fruit Store Location"
            src="https://www.google.com/maps?q=fruit%20market%20gujarat&z=14&output=embed"
            loading="lazy"
          ></iframe>
        </section>

        <footer className="fruit-footer">

          <div className="container">

            <div className="fruit-footer-row">

              <div className="fruit-footer-col">

                <h3 className="fruit-footer-brand">🍎 FreshFruit</h3>

                <p className="fruit-footer-text">
                  Delivering fresh, organic fruits right to your doorstep.
                  Quality you can trust, freshness you can taste.
                </p>

                <div className="fruit-footer-social">
                  <img src="/src/assets/images/facebook.png" />
                  <img src="/src/assets/images/instagram1.png" />
                  <img src={twitter} alt="twitter" />
                </div>

              </div>


              <div className="fruit-footer-col">

                <h4 className="fruit-footer-title">Quick Links</h4>

                <ul className="fruit-footer-links">
                  <li>Home</li>
                  <li>Fruits</li>
                  <li>Products</li>
                  <li>About Us</li>
                </ul>

              </div>


              <div className="fruit-footer-col">

                <h4 className="fruit-footer-title">Contact Us</h4>

                <p className="fruit-footer-contact">
                  <span className="fruit-contact-icon">
                    <img src="/src/assets/images/call.png" />
                  </span>
                  +91 98765 43210
                </p>

                <p className="fruit-footer-contact">
                  <span className="fruit-contact-icon">
                    <img src={envelope} />
                  </span>
                  info@freshfruit.com
                </p>

                <p className="fruit-footer-contact">
                  <span className="fruit-contact-icon">
                    <img src={map} />
                  </span>
                  123 Fruit Street, Gujarat, India
                </p>

              </div>


              <div className="fruit-footer-col">

                <h4 className="fruit-footer-title">Opening Hours</h4>

                <ul className="fruit-footer-hours">
                  <li><span>Monday - Friday:</span><b>8AM - 8PM</b></li>
                  <li><span>Saturday:</span><b>9AM - 6PM</b></li>
                  <li><span>Sunday:</span><b>10AM - 4PM</b></li>
                </ul>

              </div>

            </div>

            <div className="fruit-footer-bottom">
              © 2026 FreshFruit Delivery. All rights reserved.
            </div>

          </div>

        </footer>

      </div>

    </section>

  );
}

export default Fruit;