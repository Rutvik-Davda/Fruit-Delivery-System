import React, { useState, useEffect } from "react";
import "../../css/header.css";
import "../../js/header.js";

import fruitLogo from "../../assets/images/right-logo.png";
import userIcon from "../../assets/images/user.png";
import wishlistIcon from "../../assets/images/wishlist.png";
import cartIcon from "../../assets/images/cart.png";
import searchIcon from "../../assets/images/search.png";
import { useNavigate } from "react-router-dom";




const HeaderSection = () => {

  const navigate = useNavigate();

  const [store, setStore] = useState(() => {
    return parseInt(localStorage.getItem("cartvalue")) || 0;
  });


  useEffect(() => {
    const syncCart = () => {
      setStore(parseInt(localStorage.getItem("cartvalue")) || 0);
    };

    window.addEventListener("cartUpdated", syncCart);
    return () => window.removeEventListener("cartUpdated", syncCart);
  }, []);





  const [wishlistCount, setWishlistCount] = useState(0);
  useEffect(() => {
    const updateWishlistCount = () => {
      const count = Number(localStorage.getItem("wishlistCount")) || 0;
      setWishlistCount(count);
    };

    updateWishlistCount();
    window.addEventListener("wishlistUpdated", updateWishlistCount);

    return () =>
      window.removeEventListener("wishlistUpdated", updateWishlistCount);
  }, []);

  return (
    <section className="header-wrapper">

      {/* <div className="announcement-bar">
        <div className="announcement-slider">
          <p>Fresh Fruits Daily Rich in Vitamins for a Healthy Life</p>
          <p>100% Natural & Organic Fruits  Boost Your Immunity</p>
           <p>Fast & Fresh Fruit Delivery  Eat Healthy, Stay Fit</p>
        </div>
      </div> */}

      <header className="header">

        <div className="search-bar">
          <input type="text" placeholder="Search Fruits..." />
          <button className="search-btn">
            <img src={searchIcon} alt="Search" />
          </button>
        </div>

        <div className="logo">
          <p className="text-primary">FRUIT </p>
          <p className="text-secondary">STORE</p>
          <img
            src={fruitLogo}
            alt="Fruit Delivery Logo"
            className="leaf_logo"
          />

          {/* <button
            className="feedback-btn"
            onClick={() => navigate("/feedback")}
          >
            FEEDBACK
          </button> */}



        </div>

        <div className="nav-icons">
          <img src={userIcon} alt="User" />

          {/* hart */}
          <div className="wishlist-wrapper">
            <img src={wishlistIcon} alt="Wishlist" className="wishlist-icon" />
            <span className="wishlist-count">{wishlistCount}</span>
          </div>





          <div className="cart-wrapper">
            <img src={cartIcon} alt="Cart" className="cart-icon" />
            <span className="cart-count">{store}</span>
          </div>


        </div>

      </header>
    </section>
  );
};

export default HeaderSection;
