import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../css/AdminNewLogin.css";

const AdminNewLogin = () => {
  const navigate = useNavigate();

const handleLogin = (e) => {
  e.preventDefault();         
  console.log("Admin Login Data:", formData);  

  navigate("/userdashboard/fruit-orders");    
};





   
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: ""
  });

 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  return (
    <div className="admin-new-page">

      <div className="admin-wrapper">

      
        <img
          src="/src/assets/images/admin1.jpg"
          alt="Admin Left"
          className="admin-side-img left-img"
        />

    
        <div className="admin-new-box">

          <h2 className="admin-new-title">Admin Login</h2>

          <div className="admin-new-form">

            <input
              type="text"
              name="name"
              placeholder="Name"
              className="admin-new-input"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="admin-new-input"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              className="admin-new-input"
              value={formData.mobile}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="admin-new-input"
              value={formData.password} 
              onChange={handleChange}
            />

            <button className="admin-new-btn" onClick={handleLogin}>
              Login
            </button>

          </div>
            
          

        </div>

      
        <img
          src="/src/assets/images/admin2.jpg"
          alt="Admin Right"
          className="admin-side-img right-img"
        />

      </div>
    </div>
  );
};

export default AdminNewLogin;



