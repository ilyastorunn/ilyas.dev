import React from "react";
import "./About.css";
import ProfilePicture from "../pics/500x500.png";

function About() {
  return (
    <div id="about" className="about">
      <div className="about-heading">
        <h3>01.</h3>
        <h2>About Me</h2>
      </div>
      <div className="about-desc">
        <div className="about-desc-content">
          <div className="about-text">
            <p>
              Hello! My name is İlyas and I enjoy creating things that live on
              the internet.
              <br />
              My interest in coding started back in 2018 when I was taking C++ class
              in university.
              <br />
            </p>
            <p>
              Fast-forward to today, I'm a Front-End Developer who works with
              several technologies.
            </p>
            <p className="techs-list">Here are a few tech that I've been working recently:</p>
            <ul>
              <li>JavaScript (ES6+)</li>
              <li>React</li>
              <li>Typescript</li>
              <li>Bootstrap</li>
              <li>Node.js</li>
              <li>Next.js</li>
            </ul>
          </div>
          <img
            src={ProfilePicture}
            alt="Picture of myself"
            className="about-img"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
