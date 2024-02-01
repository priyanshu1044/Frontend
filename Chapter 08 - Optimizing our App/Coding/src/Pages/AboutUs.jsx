import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-left">
        <h1 className="about-title">
          Discover the Art of <br /> Culinary Excellence at <br /> <span className="highlight">FoodFire</span>
        </h1>
        <h4 className="about-quote">
          "Indulge in the Essence of <span className="highlight">Flavors</span> and Health"
        </h4>
        <p className="about-description">
          Welcome to FoodFire, where passion meets flavor! We are a dedicated team of culinary enthusiasts committed to delivering a delightful dining experience. Our mission is to curate mouthwatering dishes using the freshest ingredients sourced from local farmers. Each meal is crafted with precision, ensuring a burst of authentic flavors in every bite.
        </p>
        <button className="about-btn">Learn More</button>
      </div>

    </div>
  );
};

export default AboutUs;
