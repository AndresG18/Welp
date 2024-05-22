import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import { FaUserCircle } from 'react-icons/fa';
import { FaApple } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const featureComing = () => {
    alert("Feature coming soon")
  }

  return (
    <div className="login-form-modal-container">
      <div className="login-modal-texts">
        <FaUserCircle id="signup-icon" />
        <h1>Sign Up</h1>
        <p>Connect with great local businesses</p>
        <p id="smaller-text-signup">By proceeding, you agree to Welp&apos;s Terms of Service and acknowledge Welp&apos;s Privacy Policy.</p>
      </div>

      <div className="google-apple-button">
        <button onClick={featureComing} id="google" className="social-buttons"><FaGoogle className="fa-google-apple" />Continue with Google</button>
        <button onClick={featureComing} id="apple" className="social-buttons"><FaApple className="fa-google-apple" />Continue with Apple</button>
      </div>

      <div id="or-login-container">
        <div id="or-login">or</div>
      </div>


      {errors.server && <p>{errors.server}</p>}
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
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input-boxes-login-logout"
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
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
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input-boxes-login-logout"
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit" className="login-signup-buttons">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
