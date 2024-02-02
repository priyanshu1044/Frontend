import React from 'react';

const AboutUs = () => {
  return (
    <div className="font-custom-font  h-[75vh]  about-container m-2 bg-custom-light-beige p-12 flex justify-between  rounded-md shadow-md text-custom-dark-blue font-bold">
      <div className="about-left flex-1">
        <h1 className="text-4xl about-title">
          Discover the Art of <br /> Culinary Excellence at <br /> <span className="highlight text-custom-darkest-blue">FoodFire</span>
        </h1>
        <h4 className="about-quote text-xl">
          "Indulge in the Essence of <span className="highlight text-custom-darkest-blue">Flavors</span> and Health"
        </h4>
        <p className="about-description text-lg">
          Welcome to FoodFire, where passion meets flavor! We are a dedicated team of culinary enthusiasts committed to delivering a delightful dining experience. Our mission is to curate mouthwatering dishes using the freshest ingredients sourced from local farmers. Each meal is crafted with precision, ensuring a burst of authentic flavors in every bite.
        </p>
        <button className="about-btn bg-custom-darkest-blue text-white py-2 px-4 rounded-md ">Learn More</button>
      </div>
    </div>
  );
};

export default AboutUs;
