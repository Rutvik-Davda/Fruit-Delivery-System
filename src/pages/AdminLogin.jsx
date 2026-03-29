import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import login3 from "../assets/images/login3.jpg";
import redIcon from "../assets/images/red.png";
import visibilityIcon from "../assets/images/visibility.png";

function Login() {
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
        navigate("/userdashboard");
      }, 2000);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const handleRegistration = () => {
    navigate("/registration");
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${login3})` }}
    >
      {showAlert && (
        <div className="login-custom-alert">
          Login Successful ... ✅
        </div>
      )}

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-header">
          <div className="login-icon-circle">
            <img src={redIcon} alt="icon" />
          </div>

          <h2 className="login-title">Login</h2>
          <h4 className="login-subtitle">Hello User, Welcome Back!</h4>
          <h6 className="login-tagline">
            Your Fresh Fruit Delivery Starts Here
          </h6>
        </div>

        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            <img src={visibilityIcon} alt="Show Password" />
          </span>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <button type="button" onClick={handleRegistration}>
          Registration
        </button>
      </form>
    </div>
  );
}

export default Login;
