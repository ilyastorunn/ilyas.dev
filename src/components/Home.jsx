import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="homeText">
      <div className="text">
        <p className="firstParag">Hi, my name is</p>
        <h2 className="name">İlyas Torun</h2>
        <h3 className="title">I build things for Web.</h3>
        <p className="summary">
          I'm a Front-End Developer dedicated to crafting outstanding digital
          interfaces and user experiences,
          <br />
          combining my technical expertise with a keen eye for design.
        </p>
      </div>
        <a
          href="https://github.com/ilyastorunn"
          target="_blank"
          className="projectsLink"
        >
          Check out my projects!
        </a>
    </div>
  );
}

export default Home;