import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { client } from "../index.js";

function NavBar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            Quotes
          </Link>
          <ul id="nav-mobile" className="right">
            {token ? (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/create">Create</Link>
                </li>
                <li>
                  <button
                    className="red btn"
                    onClick={async() => {
                      localStorage.removeItem("token");
                      // await client.resetStore();
                      navigate("/login");
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
