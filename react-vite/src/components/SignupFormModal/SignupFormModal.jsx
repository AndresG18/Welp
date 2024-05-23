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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [profilePic, setProfilePic] = useState("")
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const validateForm = () => {
    const newErrors = {};
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (!firstName.trim()) newErrors.firstName = "First Name is required";
    if (!lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!username.trim()) newErrors.username = "Username is required";
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6 || password.length > 20) {
      newErrors.password = "Password must be in between 6-20 characters long";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Confirm Password field must match the Password field";
    }
    if (!city.trim()) newErrors.city = "City is required";
    if (!state.trim()) newErrors.state = "State is required";
    if (!profilePic.trim()) {
      newErrors.profilePic = "Profile Picture is required";
    } else if (!urlRegex.test(profilePic)) {
      newErrors.profilePic = "Profile Picture URL is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        first_name: firstName,
        last_name: lastName,
        email,
        username,
        password,
        city,
        state,
        profile_pic: profilePic
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

      {errors.server && <p className="error">{errors.server}</p>}
      <form onSubmit={handleSubmit} className="form-login-container">
        <div className="collapse-fields">
          <div className="input-wrapper">
            <label>
              First Name:
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="input-boxes-login-logout"
                id="smaller-input"
              />
            </label>
            {errors.firstName && <p className="error">{errors.firstName}</p>}
          </div>

          <div className="input-wrapper">
            <label>
              Last Name:
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="input-boxes-login-logout"
                id="smaller-input"
              />
            </label>
            {errors.lastName && <p className="error">{errors.lastName}</p>}
          </div>
        </div>

        <div className="collapse-fields">
          <div className="input-wrapper">
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="input-boxes-login-logout"
                id="smaller-input"
              />
            </label>
            {errors.username && <p className="error">{errors.username}</p>}
          </div>

          <div className="input-wrapper">
            <label>
              Email:
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-boxes-login-logout"
                id="smaller-input"
              />
            </label>
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
        </div>

        <div className="collapse-fields">
          <div className="input-wrapper">
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-boxes-login-logout"
                id="smaller-input"
              />
            </label>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="input-wrapper">
            <label>
              Confirm Password:
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="input-boxes-login-logout"
                id="smaller-input"
              />
            </label>
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </div>
        </div>

        <div className="collapse-fields">
          <div className="input-wrapper">
            <label>
              City:
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="input-boxes-login-logout"
                id="smaller-input"
              />
            </label>
            {errors.city && <p className="error">{errors.city}</p>}
          </div>

          <div className="input-wrapper">
            <label>
              State:
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                className="input-boxes-login-logout"
                id="smaller-input"
              />
            </label>
            {errors.state && <p className="error">{errors.state}</p>}
          </div>
        </div>

        <div className="input-wrapper">
          <label>
            Profile Picture:
            <input
              type="text"
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
              required
              className="input-boxes-login-logout"
            />
          </label>
          {errors.profilePic && <p className="error">{errors.profilePic}</p>}
        </div>

        <button type="submit" className="login-signup-buttons">Sign Up</button>
      </form>
    </div>
  );
}


export default SignupFormModal;
