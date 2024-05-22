import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { FaUserCircle } from 'react-icons/fa';
import { FaApple } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const demoUser = async (e) => {
    e.preventDefault()
    const demoLogin = await dispatch(thunkLogin({
      email: 'alice.johnson@example.com',
      password: 'password1'
    })).then(closeModal)
    if (demoLogin) {
      setErrors(demoLogin)
    }
  }

  const featureComing = () => {
    alert("Feature coming soon")
  }

  return (
    <div className="login-form-modal-container">
      <div className="login-modal-texts">
        <FaUserCircle id="login-icon" />
        <h1>Sign in to Welp</h1>
        <p>Connect with great local businesses</p>
        <p id="smaller-text-login">By proceeding, you agree to Welp&apos;s Terms of Service and acknowledge Welp&apos;s Privacy Policy.</p>
      </div>

      <div className="google-apple-button">
        <button onClick={featureComing} id="google" className="social-buttons"><FaGoogle className="fa-google-apple" />Continue with Google</button>
        <button onClick={featureComing} id="apple" className="social-buttons"><FaApple className="fa-google-apple" />Continue with Apple</button>
      </div>

      <div id="or-login-container">
        <div id="or-login">or</div>
      </div>


      <form onSubmit={handleSubmit} className="form-login-container">
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-boxes-login-logout"
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-boxes-login-logout"
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit" className="login-signup-buttons">Log In</button>
        <button onClick={demoUser} className="login-signup-buttons">Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
