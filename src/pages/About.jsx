import React from "react";
import "./About.css";
import ProfilePicture from "../pics/500x500.png";
import Memoji from "../pics/MemojiSticker.png";
import Memoji1 from "../pics/MemojiSticker1.png";

function About() {
  return (
    <div className="aboutSection" id="about">
      <div className="aboutHeading">
        <div className="aboutLeftLine"></div>
        <h3 className="aboutNumber">01.</h3>
        <h3 className="aboutName">About Me</h3>
        <div className="aboutRightLine"></div>
      </div>
      <div className="aboutMe">
        <div className="aboutMeTexts">
          <div className="aboutMeSummary">
            <p>
              Hello! My name is İlyas and I enjoy creating things
              <br />
              that live on the internet.
            </p>
            <p>
              My interest in coding started back in 2018 when
              <br />I was taking C++ class in university.
            </p>
            <p>
              Fast-forward to today, I'm a Front-End Developer
              <br />
              who works with several technologies.
            </p>
          </div>
          <div className="aboutMeTechs">
            <p className="techsList">
              Here are a few tech that I've been working recently:
            </p>
            <ul>
              <li>JavaScript (ES6+)</li>
              <li>React</li>
              <li>Typescript</li>
              <li>Bootstrap</li>
              <li>Node.js</li>
              <li>Next.js</li>
            </ul>
          </div>
        </div>
        {/* <img
          src={ProfilePicture}
          alt="Picture of myself"
          className="aboutMeImg"
        /> */}
        <div class="container">
          <img src={Memoji1} alt="Avatar" class="image" />
          <div class="overlay">
            <img src={Memoji} alt="Avatar1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
