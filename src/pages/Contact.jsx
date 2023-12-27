import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <div id="contact" className="contact">
      <div className="contact-heading">
        <h3>03.</h3>
        <h2>Contact</h2>
      </div>
      <div className="contact-desc">
        <h4>
          I'm currently looking for new opportunities
          <br />
          and my inbox is always open.
          <br />
          Just to say hello or if there is a question,
          <br />I will do my best to get back to you.
        </h4>
        <div className="send-email">
          <a href="mailto: ilyastorunn@outlook.com">Say Hello</a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
