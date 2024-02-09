import React from "react";
import "./Projects.css";
import TwitterClone from "../pics/twitter-clone.png";
import eCommerceApp from "../pics/e-commerce.png";
import recipeApp from "../pics/recipe-app.png";
import GitHubIcon from "@mui/icons-material/GitHub";

function Projects() {
  return (
    <div className="projectsSection">
      <div className="projectsHeading">
        <div className="projectsLeftLine"></div>
        <h3 className="projectsNumber">02.</h3>
        <h3 className="projectsName">Some Things I've Built</h3>
        <div className="projectsRightLine"></div>
      </div>
      <div className="projects">
        <div className="project">
          <a
            href="https://react-twitter-clone-kappa.vercel.app/"
            target="_blank"
          >
            <img src={TwitterClone} className="projectImg" />
          </a>
          <div className="projectHeading">
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
              <GitHubIcon className="githubIcon" />
            </a>
          </div>
        </div>
        <div className="project">
          <a href="https://e-commerce-app-sandy.vercel.app/" target="_blank">
            <img src={eCommerceApp} className="projectImg" />
          </a>
          <div className="projectHeading">
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
              <GitHubIcon className="githubIcon" />
            </a>
          </div>
        </div>
        <div className="project">
          <a href="https://recipe-app-ilyastorunn.vercel.app/" target="_blank">
            <img src={recipeApp} className="projectImg" />
          </a>
          <div className="projectHeading">
            <a
              href="https://recipe-app-ilyastorunn.vercel.app/"
              target="_blank"
            >
              <h4>Recipe App</h4>
            </a>
            <p>
              Recipe App made with React, Bootstrap and
              <br />
              deployed with Vite
            </p>
            <a href="https://github.com/ilyastorunn/recipe-app" target="_blank">
              <GitHubIcon className="githubIcon" />
            </a>
          </div>
        </div>
        <div className="otherProjects">
          <a href="https://github.com/ilyastorunn" target="_blank">
            View Other Projects!
          </a>
        </div>
      </div>
    </div>
  );
}

export default Projects;
