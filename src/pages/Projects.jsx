import React from "react";
import "./Projects.css";
import TwitterClone from "../pics/twitter-clone.png";
import eCommerceApp from "../pics/e-commerce-app.png";
import recipeApp from "../pics/recipe-app.png";
import GitHubIcon from "@mui/icons-material/GitHub";

function Projects() {
  return (
    <div className="projects">
      <div className="projects-heading">
        <h3>02.</h3>
        <h2>Some Things I've Built</h2>
      </div>
      <div className="projects-desc">
        <div className="projects-img">
          <a
            href="https://react-twitter-clone-kappa.vercel.app/"
            target="_blank"
          >
            <img src={TwitterClone} width={700} className="content-img" />
          </a>
        </div>
        <div className="projects-text">
          <a
            href="https://react-twitter-clone-kappa.vercel.app/"
            target="_blank"
          >
            <h4>Twitter Clone</h4>
          </a>
          <p>
            Twitter Clone made with React, Tailwind and
            <br />
            deployed with Vite
          </p>
          <a
            href="https://github.com/ilyastorunn/twitter-x-clone-react"
            target="_blank"
          >
            <GitHubIcon className="github-icon" />
          </a>
        </div>
      </div>
      <div className="projects-desc">
        <div className="projects-img">
          <a href="https://e-commerce-app-sandy.vercel.app/" target="_blank">
            <img src={eCommerceApp} width={700} className="content-img" />
          </a>
        </div>
        <div className="projects-text">
          <a href="https://e-commerce-app-sandy.vercel.app/" target="_blank">
            <h4>E-commerce App</h4>
          </a>
          <p>
            E-commerce App made with React, Bootstrap and
            <br />
            deployed with Vite
          </p>
          <a
            href="https://github.com/ilyastorunn/e-commerce-app"
            target="_blank"
          >
            <GitHubIcon className="github-icon" />
          </a>
        </div>
      </div>
      <div className="projects-desc">
        <div className="projects-img">
          <a href="https://recipe-app-ilyastorunn.vercel.app/" target="_blank">
            <img src={recipeApp} width={700} className="content-img" />
          </a>
        </div>
        <div className="projects-text">
          <a href="https://recipe-app-ilyastorunn.vercel.app/" target="_blank">
            <h4>Recipe App</h4>
          </a>
          <p>
            Recipe App made with React, Bootstrap and
            <br />
            deployed with Vite
          </p>
          <a href="https://github.com/ilyastorunn/recipe-app" target="_blank">
            <GitHubIcon className="github-icon" />
          </a>
        </div>
      </div>
      <div className="other-projects">
        <h2>Other Projects</h2>
        <div className="grid-container">
          <div className="grid-item">deneme proje</div>
          <div className="grid-item">deneme proje 2</div>
          <div className="grid-item">deneme proje 3</div>
          <div className="grid-item">deneme proje</div>
          <div className="grid-item">deneme proje 2</div>
          <div className="grid-item">deneme proje 3</div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
