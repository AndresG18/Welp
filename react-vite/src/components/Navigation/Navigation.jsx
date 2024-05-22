import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import navLogo from './navlogo.png'

function Navigation() {
  return (
    <ul>
      <div className="nav-bar">
        <li>
          <NavLink to="/"><img id="nav-logo" src={navLogo} /></NavLink>
        </li>

        <li id="profile-button">
          <ProfileButton />
        </li>
      </div>
    </ul>
  );
}

export default Navigation;
