import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid ms-3">
          <a className="navbar-brand" href="/">
            ilyas.dev
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-3 gap-2">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  01. About
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  02. Projects
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-disabled="true" href="#">
                  03. Contact
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link resume" href="#">
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
