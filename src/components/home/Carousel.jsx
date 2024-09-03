import React from "react";

const Carousel = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row justify-between items-center px-8 lg:px-24 py-16 lg:py-32 bg-gradient-to-r from-blue-400 to-blue-300 w-full">
      {/* Text Section */}
      <div className="flex-1 flex flex-col gap-8 items-center lg:items-start text-center lg:text-left">
        <h1 className="text-4xl lg:text-7xl font-bold text-white leading-tight">
          Embrace Sustainable Living Today
        </h1>
        <p className="text-lg lg:text-xl font-light text-white lg:w-3/4">
          Discover practical tips and eco-friendly products to enhance your
          sustainable lifestyle. Join us in making a positive impact on the
          planet while enjoying a healthier life. Explore our resources and
          become part of the solution!
        </p>
      </div>

      {/* Image Section */}
      <div className="flex-1 flex items-center justify-center">
        <img
          className="h-72 lg:h-[500px] w-full lg:w-[80%] object-cover rounded-lg shadow-lg"
          src="https://images.unsplash.com/photo-1683248891907-8471945781a5"
          alt="Sustainable Living"
        />
      </div>
    </div>
  );
};

export default Carousel;
