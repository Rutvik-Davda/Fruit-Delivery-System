import React, { useEffect, useState } from "react";
import "../../css/PaymentFrom.css";
import { useNavigate } from "react-router-dom";

import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { getAuth } from "firebase/auth";

const PaymentFrom = () => {

  const navigate = useNavigate();
  const auth = getAuth();

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  /* ---------------- LOAD PRODUCTS ---------------- */

  useEffect(() => {

    const loadProducts = async () => {

      const snapshot = await getDocs(collection(db, "products"));

      const list = [];

      snapshot.forEach((doc) => {

        const data = doc.data();

        list.push({
          id: doc.id,
          name: data.name,
          price: data.price
          // ❌ image removed to reduce size
        });

      });

      setProducts(list);

    };

    loadProducts();

  }, []);


  /* ---------------- CALCULATE TOTAL ---------------- */

  useEffect(() => {

    if (products.length === 0) return;

    let sum = 0;

    products.forEach((p) => {

      const qty = Number(localStorage.getItem("cart_" + p.id));

      if (qty > 0) {
        sum += qty * p.price;
      }

    });

    setTotal(sum);

  }, [products]);


  /* ---------------- FORM DATA ---------------- */

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
    paymentMethod: "",
    cardNumber: "",
    cardHolder: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  /* ---------------- SAVE ORDER ---------------- */

  const handlePayment = async (e) => {

    e.preventDefault();

    if (total <= 0) {
      alert("Cart total invalid");
      return;
    }

    try {

      if (!auth.currentUser) {
        alert("Please login first");
        return;
      }

      const cartItems = [];

      products.forEach((p) => {

        const qty = parseInt(localStorage.getItem("cart_" + p.id));

        if (!qty || isNaN(qty) || qty <= 0) return;

        // ✅ Only minimal data (NO IMAGE)
        cartItems.push({
          productId: p.id,
          name: p.name,
          price: Number(p.price) || 0,
          qty: qty
        });

      });

      if (cartItems.length === 0) {
        alert("Cart is empty");
        return;
      }

      const orderData = {

        userId: auth.currentUser.uid,

        customerDetails: formData,

        items: cartItems, // ✅ now small size

        subTotal: total,

        status: "Pending",

        paymentStatus: "success",

        createdAt: serverTimestamp()

      };

      /* ---------- SAVE ORDER ---------- */

      const docRef = await addDoc(collection(db, "orders"), orderData);

      /* ---------- CLEAR CART ---------- */

      cartItems.forEach((item) => {
        localStorage.removeItem("cart_" + item.productId);
      });

      localStorage.setItem("cartvalue", 0);
      window.dispatchEvent(new Event("cartUpdated"));

      /* ---------- REDIRECT ---------- */

      navigate("/userdashboard/paymentsuccess", {
        state: { orderId: docRef.id }
      });

    } catch (error) {

      console.log("Payment error:", error);
      alert("Payment failed: " + error.message);

    }

  };


  /* ---------------- UI ---------------- */

  return (

    <div className="payment-page">

      <h2 className="payment-title">Fruit Delivery Information</h2>

      <form onSubmit={handlePayment}>

        <div className="payment-form">

          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />

          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />

          <input type="text" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />

          <input type="text" name="address" placeholder="House Address" className="house-address-input" value={formData.address} onChange={handleChange} required />

          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />

          <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />

          <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required />

          <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />

          <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />

          <input type="text" name="paymentMethod" placeholder="Payment Method" value={formData.paymentMethod} onChange={handleChange} required />

          <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} required />

          <input type="text" name="cardHolder" placeholder="Cardholder Name" value={formData.cardHolder} onChange={handleChange} required />

          <div className="payment-total">
            Total Amount: ₹ {total}
          </div>

          <button type="submit" className="confirm-payment-btn">
            Confirm Payment
          </button>

        </div>

      </form>

    </div>

  );

};

export default PaymentFrom;