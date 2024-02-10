import React from "react";
import "./Header.css";
import pdfFile from "../pics/cv.pdf";

function Header() {
  const handleDownload = () => {
    window.open(pdfFile);
  };

  return (
    <div className="header">
      <div className="headerTitle">
        <a className="headerTitleLink" href="/">
          ilyas.dev
        </a>
      </div>
        <ul className="headerNavbarList">
          <li className="navbarItem">
            <a className="headerLink" href="#about">
              01. About
            </a>
          </li>
          <li className="navbarItem">
            <a
              className="headerLink"
              href="#projects"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              02. Projects
            </a>
          </li>
          <li className="navbarItem">
            <a className="headerLink" aria-disabled="true" href="#contact">
              03. Contact
            </a>
          </li>
          <li className="navbarItem">
            <a className="headerLink resume" href="#" onClick={handleDownload}>
              Resume
            </a>
          </li>
        </ul>
    </div>
  );
}

export default Header;
