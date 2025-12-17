import { Link, useLocation } from "react-router-dom";
import LoginButton from "./_partials/LoginButton";
import { useUserStore } from "../store/userStore";
import CheckOtherPlayer from "./CheckOtherPlayer";

const Navbar = () => {
  const location = useLocation();
  const { hash, pathname, search } = location;
  const userStore = useUserStore();
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{
        backgroundColor: `rgba(64, 64, 64, 1)`,
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      <Link to="/" className="navbar-brand nav-link">
        Completionist
      </Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li
            className={`nav-item ${
              pathname === "/collections" ? "active" : ""
            }`}
          >
            <Link to="/collections" className="nav-link">
              Completionist Collections
            </Link>
          </li>
          <li
            className={`nav-item ${
              pathname === "/collections/generator" ? "active" : ""
            }`}
          >
            <Link to="/collections/generator" className="nav-link">
              Collections Generator
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/statistics" className="nav-link">
              Statistics
            </Link>
          </li> */}
          <li
            className={`nav-item ${pathname === "/howtouse" ? "active" : ""}`}
          >
            <Link to="/howtouse" className="nav-link">
              How to use
            </Link>
          </li>
          <li className={`nav-item ${pathname === "/contact" ? "active" : ""}`}>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
          <li className={`nav-item ${pathname === "/donate" ? "active" : ""}`}>
            <Link to="/donate" className="nav-link">
              Donate
            </Link>
          </li>
          <li
            className={`nav-item ${pathname === "/changelog" ? "active" : ""}`}
          >
            <Link to="/changelog" className="nav-link">
              Changelog
            </Link>
          </li>
        </ul>
        <div className="navbar-nav" style={{ margin: "auto", marginRight: 20 }}>
          <CheckOtherPlayer />
          {userStore.username && (
            <span style={{ margin: "auto" }}>
              Logged in as {userStore.username}
            </span>
          )}
          <LoginButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
