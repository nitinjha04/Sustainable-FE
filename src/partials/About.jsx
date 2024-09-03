import React from "react";

const About = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-lg px-6 lg:px-16 pt-12 mx-auto">
      {/* Left: Description */}
      <div className="md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl font-bold text-green-900 mb-4">
          About Our Sustainable Website
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Welcome to our sustainable website! We are dedicated to providing you
          with the best eco-friendly products, insightful articles, and
          practical tips to help you live a greener life. Our mission is to
          inspire and empower you to make conscious choices that contribute to a
          healthier planet.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Explore our collection of sustainable living tips, discover innovative
          products, and read engaging articles that will guide you on your
          journey to sustainability.
        </p>
      </div>

      {/* Right: Image */}
      <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
        <img
          src="https://wallpaperaccess.com/full/1812972.jpg" 
          alt="Sustainable Living"
          className="h-full max-w-xs lg:max-w-xl object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default About;
