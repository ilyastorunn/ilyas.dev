import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <div className="contactSection">
      <div className="contactHeading">
        <h3 className="contactNumber">03.</h3>
        <h3 className="contactName">Contact</h3>
      </div>
      <div className="contact">
        <div className="contactText">
          <h4>
            I'm currently looking for new opportunities
            <br />
            and my inbox is always open.
            <br />
            Just to say hello or if there is a question,
            <br />I will do my best to get back to you.
          </h4>
        </div>
      </div>
      <div className="sendEmail">
        <a href="mailto: ilyastorunn@outlook.com">Say Hello</a>
      </div>
    </div>
  );
}

export default Contact;
