import { useState } from "react";
import contact from "../assets/Images/Contact-Us.png";
import "./Contact.css";

const Contact = () => {
  const [message, setMessage] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage(true);
    }
  return (
    <div className="contact-container">
      <div className="contact-left">
      <img src={contact} alt="" />
      </div>
      <div className="contact-right">
      <h1>Contact us</h1>
                <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" required/>
                    <input type="email" placeholder="Email" required/>
                    <textarea placeholder="Type your Message here..." required></textarea>
                    <button type="submit">Submit</button>
                    {message && <span>Thanks for contacting FoodFire, We will reply ASAP.</span>}
                </form>
      </div>
    </div>
  );
};

export default Contact;
