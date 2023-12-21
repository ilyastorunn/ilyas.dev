import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="footer-container">
      <p className="first-parag">Hi, my name is</p>
      <h2 className="name">İlyas Torun</h2>
      <h3 className="name-bottom">I build things for web.</h3>
      <p className="summary">
        I'm a Front-End Developer dedicated to crafting outstanding digital
        interfaces and user experiences,
        <br />
        combining my technical expertise with a keen eye for design.
      </p>
      <div className="project-link">
        <a href="https://github.com/ilyastorunn" target="_blank">
          Check out my projects!
        </a>
      </div>
    </div>
  );
}

export default Home;
