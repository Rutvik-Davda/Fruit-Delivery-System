import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

import "../css/register.css";
import login3 from "../assets/images/login3.jpg";

import { setDoc, doc } from "firebase/firestore";

function Registration() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, contact, password } = formData;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // ✅ Update profile
      await updateProfile(user, {
        displayName: fullName,
      });

      // ✅ Save user in Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        email,
        contact,
        createdAt: new Date()
      });

      alert("Registration Successful ✅");

      // ✅ AUTO LOGIN REDIRECT
      navigate("/userdashboard");

    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${login3})` }}
    >
      <form className="login-form" onSubmit={handleSubmit}>

        <h2 className="login-title">Register</h2>

        <h4 className="login-subtitle">Welcome! Let’s Get Started</h4>

        <h6 className="login-tagline">
          Sign Up to Unlock New Opportunities
        </h6>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          required
          onChange={handleChange}
          value={formData.fullName}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          value={formData.email}
        />

        <input
          type="tel"
          name="contact"
          placeholder="Contact Number"
          required
          onChange={handleChange}
          value={formData.contact}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          value={formData.password}
        />

        <button type="submit">Register</button>

        <button type="button" onClick={handleLogin}>
          Login
        </button>

      </form>
    </div>
  );
}

export default Registration;