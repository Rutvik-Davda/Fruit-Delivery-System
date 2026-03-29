import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Landingpage from "../pages/Landingpage";
import Login from "../pages/Login";
import Registration from "../pages/Registration";

import "../css/header.css";
import "../js/header.js";

import HeaderSection from "../components/userdashboard/HeaderSection.jsx";

import Home from "../components/userdashboard/Home";
import Product from "../components/userdashboard/Product";
import Fruit from "../components/userdashboard/Fruit";
import Order from "../components/userdashboard/Order";
import About from "../components/userdashboard/About";
import Dashboard from "../components/userdashboard/Dashboard";

import AdminLogin from "../admin/AdminLogin";
import AdminRegistration from "../admin/AdminRegistration";
import AdminNewLogin from "../components/userdashboard/AdminNewLogin";

import Fruittable from "../components/userdashboard/Fruittable";
import PaymentFrom from "../components/userdashboard/PaymentFrom";
import Sucessdata from "../components/userdashboard/Sucessdata";

import Salon1 from "../components/home/Salon1";
import Feedbackform from "../components/home/Feedbackform";
import MyOrder from "../components/home/myorders.jsx";

import { getAuth, signOut } from "firebase/auth";

const Routing = () => {

  const navigate = useNavigate();
  const auth = getAuth();

  /* ---------------- LOGOUT ---------------- */

  const handleLogout = async () => {

    try {

      await signOut(auth);

      // clear cart & wishlist
      localStorage.clear();

      window.dispatchEvent(new Event("cartUpdated"));
      window.dispatchEvent(new Event("wishlistUpdated"));

      navigate("/");

    } catch (error) {

      console.log("Logout error:", error);

    }

  };

  return (
    <>

      <Routes>

        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/salon1" element={<Salon1 />} />
        <Route path="/myorders" element={<MyOrder />} />
        <Route path="/feedback" element={<Feedbackform />} />
        <Route path="/adminlogin" element={<AdminLogin />} />

        {/* ---------------- USER DASHBOARD ---------------- */}

        <Route
          path="/userdashboard/*"
          element={
            <>

              <header>
                <nav className="menu-bar">
                  <ul>

                    <li>
                      <Link to="/userdashboard/home">Home</Link>
                    </li>

                    <li>
                      <Link to="/userdashboard/product">Product</Link>
                    </li>

                    <li>
                      <Link to="/userdashboard/fruit">Fruit</Link>
                    </li>

                    <li>
                      <Link to="/userdashboard/about">About Us</Link>
                    </li>

                    <li>
                      <button className="logout-btn" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>

                  </ul>
                </nav>
              </header>

              <HeaderSection />

              <Routes>

                <Route path="" element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="product" element={<Product />} />
                <Route path="fruit" element={<Fruit />} />
                <Route path="order" element={<Order />} />
                <Route path="about" element={<About />} />
                <Route path="Dashboard" element={<Dashboard />} />

                <Route path="admin-login" element={<AdminNewLogin />} />
                <Route path="fruit-orders" element={<Fruittable />} />

                <Route path="payment" element={<PaymentFrom />} />
                <Route path="paymentsuccess" element={<Sucessdata />} />

              </Routes>

            </>
          }
        />

      </Routes>

    </>
  );

};

export default Routing;