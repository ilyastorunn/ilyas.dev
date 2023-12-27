import React from "react";
import "./Header.css";
import pdfFile from "../pics/cv.pdf";

function Header() {
  const handleDownload = () => {
    window.open(pdfFile);
  };

  return (
      <div className="header">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid ms-3">
            <a className="navbar-brand" href="/">
              ilyas.dev
            </a>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-3 gap-2">
                <li className="nav-item">
                  <a className="nav-link" href="#about">
                    01. About
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#projects"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    02. Projects
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-disabled="true" href="#contact">
                    03. Contact
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link resume"
                    href="#"
                    onClick={handleDownload}
                  >
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
