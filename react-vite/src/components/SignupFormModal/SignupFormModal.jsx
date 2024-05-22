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


      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit} className="form-login-container">
        <div className="collapse-fields">
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
          {errors.firstName && <p>{errors.firstName}</p>}

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
          {errors.lastName && <p>{errors.lastName}</p>}
        </div>

        <div className="collapse-fields">
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
          {errors.username && <p>{errors.username}</p>}

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
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div className="collapse-fields">
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
          {errors.password && <p>{errors.password}</p>}

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
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>

        <div className="collapse-fields">
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
          {errors.city && <p>{errors.city}</p>}

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
          {errors.state && <p>{errors.state}</p>}
        </div>

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
        {errors.profilePic && <p>{errors.profilePic}</p>}

        <button type="submit" className="login-signup-buttons">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
